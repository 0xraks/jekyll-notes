const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const https = require('https');
const url = require('url');

// or
// import {NotionToMarkdown} from "notion-to-md";
console.log("Running..");
const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

function downloadImage(imageUrl, destinationPath, filename) {
	const options = url.parse(imageUrl);
	// const filename = imageUrl.substring(97, imageUrl.indexOf('?') !== -1 ? imageUrl.indexOf('?') : undefined);
	const filePath = path.join(destinationPath, filename);

	// Check if the destination directory exists, create it if it doesn't
	if (!fs.existsSync(destinationPath)) {
		fs.mkdirSync(destinationPath, { recursive: true });
	}

	// Check if the file already exists
	if (fs.existsSync(filePath)) {
		console.log('Image already exists:', filename);
		return;
	}

	const file = fs.createWriteStream(filePath);

	https.get(options, response => {
		response.pipe(file);

		file.on('finish', () => {
			file.close();
			console.log('Image downloaded successfully:', filename);
		});
	}).on('error', error => {
		fs.unlink(filePath, () => {
			console.error('Error:', error);
		});
	});
}


// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });

(async () => {
	// ensure directory exists
	const root = path.join('_posts', 'notion')
	fs.mkdirSync(root, { recursive: true })

	const databaseId = process.env.DATABASE_ID;
	// TODO has_more
	const response = await notion.databases.query({
		database_id: databaseId,
		filter: {
			property: "Publish",
			checkbox: {
				equals: true
			}
		}
	})
	for (const r of response.results) {
		// console.log(r)
		const id = r.id
		// date
		let date = moment(r.created_time).format("YYYY-MM-DD")
		let pdate = r.properties?.['Date']?.['date']?.['start']
		if (pdate) {
			date = moment(pdate).format('YYYY-MM-DD')
		}
		// title
		let title = id
		let ptitle = r.properties?.['Post']?.['title']
		if (ptitle?.length > 0) {
			title = ptitle[0]?.['plain_text']
		}
		// tags
		let tags = []
		let ptags = r.properties?.['Tags']?.['multi_select']
		for (const t of ptags) {
			const n = t?.['name']
			if (n) {
				tags.push(n)
			}
		}
		// categories
		let cats = []
		let pcats = r.properties?.['Categories']?.['multi_select']
		for (const t of pcats) {
			const n = t?.['name']
			if (n) {
				tags.push(n)
			}
		}
		// comments
		const comments = r.properties?.['No Comments']?.['checkbox'] == false
		// frontmatter
		let fmtags = ''
		let fmcats = ''
		if (tags.length > 0) {
			fmtags += '\ntags:\n'
			for (const t of tags) {
				fmtags += '  - ' + t + '\n'
			}
		}
		if (cats.length > 0) {
			fmcats += '\ncategories:\n'
			for (const t of cats) {
				fmcats += '  - ' + t + '\n'
			}
		}
		const fm = `---
layout: post
comments: ${comments}
date: ${date}
title: ${title}${fmtags}${fmcats}
---
`
		const mdblocks = await n2m.pageToMarkdown(id);
		const md = n2m.toMarkdownString(mdblocks);
		//writing to file
		const ftitle = `${date}-${title.replaceAll(' ', '-').toLowerCase()}.md`
		console.log(fm);

		let destinationFolder = path.join('static', 'images', ftitle);
		console.log(destinationFolder);
		const regex = /!\[.*?\]\((.*?)\)/g;

		// Find all matches in the markdown content
		let match;
		let temp = md.parent;
		while ((match = regex.exec(md.parent)) !== null) {
			const imageUrl = match[1];
			console.log("Image found: " + imageUrl);
			const filename = imageUrl.substring(97, imageUrl.indexOf('?') !== -1 ? imageUrl.indexOf('?') : undefined);
			downloadImage(imageUrl, destinationFolder, filename)
			destinationFolder = destinationFolder.replace("\\","/");
			temp=temp.replace(imageUrl, "../../"+ destinationFolder + "/" + filename);
		}
		// console.log(temp);

		fs.writeFile(path.join(root, ftitle), fm + temp, (err) => {
			console.log(fm);
			if (err) {
				console.log(err);
			}
		}
		);
		// fs.writeFile(path.join(root, ftitle), , (err) => {
		// 	// console.log(temp);
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// }
		// );


	}
})();
