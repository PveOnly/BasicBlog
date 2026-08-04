# Tier List Maker

This folder contains the complete tool. It does not use the blog layouts,
stylesheet, configuration, or post system.

SortableJS 1.15.7 handles mouse and touch reordering. html2canvas 1.4.1 handles
PNG export. Both are pinned CDN dependencies, so there is no build step.

The user's title, tiers, positions, and resized uploads are stored in local
browser storage. Nothing is uploaded to a server.

The samples folder keeps SVG sources alongside PNG versions used by the maker
and PNG exporter.

The Save button stores the current list in IndexedDB. My lists shows every list
saved in that browser and allows each one to be reopened, duplicated, or deleted.
The current draft is also kept in local storage between page reloads.
