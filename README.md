# Basic Dev Blog

A minimal GitHub Pages blog where each post is Markdown-based and keeps its images in the same folder as the post.

## Structure

```text
.
├── _layouts/
│   ├── default.html
│   ├── home.html
│   └── post.html
├── assets/
│   └── css/
│       └── style.css
├── posts/
│   └── welcome/
│       ├── index.md
│       └── cover.png
├── _config.yml
├── about.md
└── index.md
```

## Add A New Post

Create a new folder under `posts/`:

```text
posts/my-new-post/
├── index.md
├── cover.jpg
└── diagram.png
```

Use this front matter in `index.md`:

```markdown
---
title: "My New Post"
date: 2026-07-25
description: "Short summary shown on the homepage."
tags:
  - markdown
  - github-pages
cover: "cover.jpg"
cover_alt: "Describe the cover image"
---
```

Reference images with relative paths:

```markdown
![Architecture diagram](diagram.png)
```

## Run Locally

If Ruby and Bundler are installed:

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://127.0.0.1:4000`.

## Publish On GitHub Pages

Push this folder to a GitHub repository, then enable GitHub Pages in the repository settings. Use the branch and folder that contain this project, usually `main` and `/root`.
