# Tools

The tools index is a standalone catalog. Each tool lives in its own folder with
all of its code and assets.

    tools/
    |-- index.html
    |-- tools.css
    |-- favicon.svg
    +-- tier-list-maker/
        |-- index.html
        |-- style.css
        |-- app.js
        |-- cover.png
        |-- favicon.svg
        +-- samples/

## Add Another Tool

1. Create a folder such as tools/my-tool/.
2. Keep the tool's HTML, CSS, JavaScript, images, and other assets there.
3. Add one card to the tool grid in tools/index.html.

There is no build step. GitHub Pages copies the catalog and tools directly.

## Remove A Tool

Delete that tool's folder and remove its card from tools/index.html. Nothing in
the blog layouts or styles needs to change.
