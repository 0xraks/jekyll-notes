# Get the title from the first parameter
$title = $args[0]

# Format the current date and time
$currentDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"

# Format the filename using the date and title
$filename = "_posts/$(Get-Date -Format 'yyyy-MM-dd')-$title.md"

# Create the new Markdown file
New-Item -ItemType File -Path $filename -Force | Out-Null

# Populate the file with the metadata
@"
---
title: $title
author: Rakshith
date: $currentDate
categories: []
tags: []
---
"@ | Out-File -FilePath $filename -Append

Write-Host "New Markdown file '$filename' created with metadata."