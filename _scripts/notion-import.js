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
		//Pin complete this 
		let pinned = false; // Default value if "Pins" property is not present
		if (r.properties?.['pinned']?.checkbox) {
			pinned = r.properties['pinned'].checkbox;
		}

		// tags
		let tags = []
		let ptags = r.properties?.['Tags']?.['multi_select']
		for (const t of ptags) {
			let tags_find = t?.['name']
			if (tags_find) {
				// console.log(n)
				tags.push(tags_find)
			}
		}
		// categories
		let cats = []
		let pcats = r.properties?.['Categories']?.['multi_select']
		for (const t of pcats) {
			let n = t?.['name']
			if (n) {
				console.log(n);
				cats.push(n)
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
		let fm = `---
layout: post
comments: ${comments}
date: ${date}
title: "${title}" ${fmtags} ${fmcats}
pin: ${pinned}
`
		const mdblocks = await n2m.pageToMarkdown(id);
		const md = n2m.toMarkdownString(mdblocks);
		//writing to file
		const ftitle = `${date}-${title.replaceAll(' ', '-').toLowerCase()}.md`
		// console.log(fm);

		let destinationFolder = path.join('static', 'images', ftitle);
		// console.log(destinationFolder);
		// const regex = /!\[.*?\]\((.*?)\)/g;
		const regex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;


		// Find all matches in the markdown content
		let match;
		let temp = md.parent;
		let a=1
		while ((match = regex.exec(md.parent)) !== null) {
			console.log(a);
			a++;
			let filename = match[1];
			const imageUrl = match[2];
			console.log("Image found: " + imageUrl);

			if (!filename) {
			console.log("Description not found" + imageUrl);
			filename = imageUrl.substring(97, imageUrl.indexOf('?') !== -1 ? imageUrl.indexOf('?') : undefined);
			}
			if (filename =='thumbnail' || filename =='Thumbnail' || filename =='THUMBNAIL'){
				let  thumbnail_path="../../"+ destinationFolder+ "/" + filename;
				thumbnail_path = thumbnail_path.replace("\\","/");
				fm =  fm + `image: 
  path: "${thumbnail_path}"
  alt: "${title}"
  caption: 
  relative: true
`
  // Remove the Markdown syntax from temp
  temp = temp.replace(new RegExp('.*\\[thumbnail\\].*\n', 'g'), '');
  temp = temp.replace(new RegExp('.*\\[Thumbnail\\].*\n', 'g'), '');
  temp = temp.replace(new RegExp('.*\\[THUMBNAIL\\].*\n', 'g'), '');
			}
			downloadImage(imageUrl, destinationFolder, filename)
			destinationFolder = destinationFolder.replace("\\","/");
			temp=temp.replace(imageUrl, "../../"+ destinationFolder + "/" + filename);
		}
		// console.log(temp);
fm = fm + `---
`		
		// temp=temp.replace("undefined", "");
		fs.writeFile(path.join(root, ftitle), fm + temp, (err) => {
			console.log(fm);
			// console.log(temp);
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
