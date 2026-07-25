# Signal Run

This folder is a standalone Three.js game. It does not use the blog layouts,
stylesheet, configuration, or post system.

## Files

- `index.html` contains the game page and interface.
- `game.css` contains all game styling.
- `game.js` contains the Three.js scene and game logic.
- `favicon.svg` is the game tab icon.

Three.js is loaded as an ES module from jsDelivr and pinned to version `0.185.1`.
No build step is required.

## Remove The Game

1. Delete the entire `games/` folder.
2. Remove the `Games` link from `_layouts/default.html`.
