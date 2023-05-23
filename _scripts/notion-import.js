const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

(async () => {
	// Ensure directory exists
	const root = path.join('_posts', 'notion');
	fs.mkdirSync(root, { recursive: true });

	const databaseId = process.env.DATABASE_ID;
	const response = await notion.databases.query({
		database_id: databaseId,
		filter: {
			property: "Publish",
			checkbox: {
				equals: true
			}
		}
	});

	for (const r of response.results) {
		const id = r.id;

		// Extract front matter values
		let date = moment(r.created_time).format("YYYY-MM-DD");
		let pdate = r.properties?.['Date']?.['date']?.['start'];
		if (pdate) {
			date = moment(pdate).format('YYYY-MM-DD');
		}

		let title = id;
		let ptitle = r.properties?.['Post']?.['title'];
		if (ptitle?.length > 0) {
			title = ptitle[0]?.['plain_text'];
		}

		let tags = [];
		let ptags = r.properties?.['Tags']?.['multi_select'];
		for (const t of ptags) {
			const n = t?.['name'];
			if (n) {
				tags.push(n);
			}
			}

		let cats = [];
		let pcats = r.properties?.['Categories']?.['multi_select'];
		for (const t of pcats) {
			const n = t?.['name'];
			if (n) {
				cats.push(n);
			}
		}

		const comments = r.properties?.['No Comments']?.['checkbox'] == false;

		// Generate front matter
		let fmtags = '';
		let fmcats = '';
		if (tags.length > 0) {
			fmtags += '\ntags:\n';
			for (const t of tags) {
				fmtags += '  - ' + t + '\n';
			}
		}

		if (cats.length > 0) {
			fmcats += '\ncategories:\n';
			for (const t of cats) {
				fmcats += '  - ' + t + '\n';
			}
		}

		const frontMatter = `---
layout: post
comments: ${comments}
date: ${date}
title: ${title}${fmtags}${fmcats}
---
`;

		// Generate Markdown content
		const markdownBlocks = await n2m.pageToMarkdown(id);
		const markdownContent = markdownBlocks.map(block => n2m.toMarkdownString(block)).join("\n\n");

		// Writing to file
		const fileName = `${date}-${title.replaceAll(' ', '-').toLowerCase()}.md`;
		fs.writeFile(path.join(root, fileName), frontMatter + markdownContent, (err) => {
			if (err) {
				console.log(err);
			}
		});
	}
})();
