---
title: "Welcome to the Blog"
date: 2026-07-25
description: "A sample folder-based post showing how Markdown and colocated images work together."
tags:
  - github-pages
  - markdown
  - structure
cover: "cover.png"
cover_alt: "A workspace with a Markdown document and image files"
---

This sample post lives in `posts/welcome/`. The Markdown file, cover image, and any other images for this article stay together in the same folder.

![A workspace image stored beside this Markdown file](cover.png)

## Why This Structure

Keeping everything for a post in one folder makes the blog easier to maintain:

- Move or delete a post without hunting through a shared image directory.
- Keep image references short and readable.
- Draft posts locally with the same relative paths that GitHub Pages will use.

## Adding More Images

Add image files next to `index.md`:

```text
posts/welcome/
├── index.md
├── cover.png
└── architecture-diagram.png
```

Then reference them in Markdown:

```markdown
![Architecture diagram](architecture-diagram.png)
```

## Create Your Next Post

Copy this folder, rename it, update the front matter, and replace the Markdown content with your article.
