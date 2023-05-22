#!/bin/bash

# Get the title from the first parameter
title="$1"

# Format the current date and time
current_date=$(date "+%Y-%m-%d %H:%M:%S %z")

# Format the filename using the date and title
filename="_posts/$(date "+%Y-%m-%d")-$title.md"

# Create the new Markdown file
touch "$filename"

# Populate the file with the metadata
echo "---" >> "$filename"
echo "title: $title" >> "$filename"
echo "author: Rakshith" >> "$filename"
echo "date: $current_date" >> "$filename"
echo "categories: []" >> "$filename"
echo "tags: []" >> "$filename"
echo "---" >> "$filename"

echo "New Markdown file '$filename' created with metadata."