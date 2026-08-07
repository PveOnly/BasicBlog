# Games

`games/index.html` is a standalone catalog. Each game lives in its own folder and
owns all of its code and assets.

```text
games/
|-- index.html
|-- games.css
|-- favicon.svg
|-- signal-run/
    |-- index.html
    |-- game.css
    |-- game.js
    |-- cover.png
    `-- favicon.svg
`-- rank-night/
    |-- index.html
    |-- game.css
    |-- game.js
    |-- cover.png
    `-- favicon.svg
```

## Add Another Game

1. Create a folder such as `games/my-game/`.
2. Keep the game's HTML, CSS, JavaScript, images, and other assets in that folder.
3. Add one card to the `game-grid` in `games/index.html`.

Use relative links in the card:

```html
<a href="my-game/">
  <img src="my-game/cover.png" alt="Describe the game">
</a>
```

There is no build step. The catalog and games are copied directly by GitHub Pages.

## Remove A Game

Delete that game's folder and remove its card from `games/index.html`. Nothing in
the blog layouts or styles needs to change.
