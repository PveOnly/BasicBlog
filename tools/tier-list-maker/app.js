const STORAGE_KEY = "tier-list-maker-state-v1";
const CURRENT_LIST_KEY = "tier-list-maker-current-list-v1";
const DATABASE_NAME = "tier-list-maker";
const DATABASE_VERSION = 1;
const LIST_STORE = "lists";
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const DEFAULT_STATE = {
  title: "My Tier List",
  tiers: [
    { id: "tier-s", name: "S", color: "#ef7168", itemIds: [] },
    { id: "tier-a", name: "A", color: "#f2a65f", itemIds: [] },
    { id: "tier-b", name: "B", color: "#f2d06b", itemIds: [] },
    { id: "tier-c", name: "C", color: "#68b895", itemIds: [] },
    { id: "tier-d", name: "D", color: "#6ea8d9", itemIds: [] },
  ],
  items: [
    { id: "sample-orbit", src: "samples/orbit.png", alt: "Orbit sample" },
    { id: "sample-pulse", src: "samples/pulse.png", alt: "Pulse sample" },
    { id: "sample-forge", src: "samples/forge.png", alt: "Forge sample" },
    { id: "sample-prism", src: "samples/prism.png", alt: "Prism sample" },
    { id: "sample-wave", src: "samples/wave.png", alt: "Wave sample" },
    { id: "sample-echo", src: "samples/echo.png", alt: "Echo sample" },
    { id: "sample-grid", src: "samples/grid.png", alt: "Grid sample" },
  ],
  bankIds: [
    "sample-orbit",
    "sample-pulse",
    "sample-forge",
    "sample-prism",
    "sample-wave",
    "sample-echo",
    "sample-grid",
  ],
};

const titleInput = document.querySelector("#title-input");
const boardTitle = document.querySelector("#board-title");
const tierRows = document.querySelector("#tier-rows");
const itemBank = document.querySelector("#item-bank");
const itemCount = document.querySelector("#item-count");
const imageInput = document.querySelector("#image-input");
const addTierButton = document.querySelector("#add-tier-button");
const savedListsButton = document.querySelector("#saved-lists-button");
const saveListButton = document.querySelector("#save-list-button");
const resetButton = document.querySelector("#reset-button");
const exportButton = document.querySelector("#export-button");
const exportBoard = document.querySelector("#export-board");
const saveStatus = document.querySelector("#save-status");
const tierDialog = document.querySelector("#tier-dialog");
const tierForm = document.querySelector("#tier-form");
const newTierName = document.querySelector("#new-tier-name");
const savedListsDialog = document.querySelector("#saved-lists-dialog");
const savedListsContainer = document.querySelector("#saved-lists");
const savedListsEmpty = document.querySelector("#saved-lists-empty");
const savedListCount = document.querySelector("#saved-list-count");
const toast = document.querySelector("#toast");

let sortableInstances = [];
let saveTimer;
let toastTimer;
let currentListId = localStorage.getItem(CURRENT_LIST_KEY);

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function normalizeState(candidate) {
  if (
    !candidate ||
    typeof candidate.title !== "string" ||
    !Array.isArray(candidate.tiers) ||
    candidate.tiers.length === 0 ||
    !Array.isArray(candidate.items) ||
    !Array.isArray(candidate.bankIds)
  ) {
    return null;
  }

  const idPattern = /^[a-z0-9_-]{1,120}$/i;
  const samplePattern = /^samples\/[a-z0-9_-]+\.(png|jpe?g|webp)$/i;
  const dataImagePattern = /^data:image\/(png|jpeg|webp|gif);base64,/i;
  const itemIds = new Set();
  const items = [];

  for (const item of candidate.items.slice(0, 200)) {
    if (
      !item ||
      typeof item.id !== "string" ||
      !idPattern.test(item.id) ||
      itemIds.has(item.id) ||
      typeof item.src !== "string" ||
      item.src.length > 8 * 1024 * 1024 ||
      (!samplePattern.test(item.src) && !dataImagePattern.test(item.src))
    ) {
      continue;
    }

    itemIds.add(item.id);
    items.push({
      id: item.id,
      src: item.src,
      alt: typeof item.alt === "string" ? item.alt.slice(0, 160) : "Tier list item",
    });
  }

  const tierIds = new Set();
  const placedIds = new Set();
  const tiers = candidate.tiers.slice(0, 20).map((tier) => {
    let id = tier && typeof tier.id === "string" && idPattern.test(tier.id) ? tier.id : generateId("tier");
    if (tierIds.has(id)) id = generateId("tier");
    tierIds.add(id);

    const validItemIds = [];
    for (const itemId of Array.isArray(tier && tier.itemIds) ? tier.itemIds : []) {
      if (!itemIds.has(itemId) || placedIds.has(itemId)) continue;
      validItemIds.push(itemId);
      placedIds.add(itemId);
    }

    return {
      id,
      name: tier && typeof tier.name === "string" ? tier.name.slice(0, 8) || "Tier" : "Tier",
      color: sanitizeColor(tier && tier.color),
      itemIds: validItemIds,
    };
  });

  const bankIds = [];
  for (const itemId of candidate.bankIds) {
    if (!itemIds.has(itemId) || placedIds.has(itemId)) continue;
    bankIds.push(itemId);
    placedIds.add(itemId);
  }
  for (const item of items) {
    if (!placedIds.has(item.id)) bankIds.push(item.id);
  }

  return {
    title: candidate.title.slice(0, 80) || "Untitled Tier List",
    tiers,
    items,
    bankIds,
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const normalized = normalizeState(saved);
    if (normalized) return normalized;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return cloneDefaultState();
}

function render(state) {
  destroySortables();
  titleInput.value = state.title || "My Tier List";
  boardTitle.textContent = titleInput.value;
  tierRows.replaceChildren();
  itemBank.replaceChildren();

  const itemMap = new Map(state.items.map((item) => [item.id, item]));
  const placedIds = new Set();

  for (const tier of state.tiers) {
    const row = createTierRow(tier);
    const zone = row.querySelector(".item-zone");
    for (const itemId of tier.itemIds || []) {
      const item = itemMap.get(itemId);
      if (!item || placedIds.has(itemId)) continue;
      zone.append(createTierItem(item));
      placedIds.add(itemId);
    }
    tierRows.append(row);
  }

  for (const itemId of state.bankIds) {
    const item = itemMap.get(itemId);
    if (!item || placedIds.has(itemId)) continue;
    itemBank.append(createTierItem(item));
    placedIds.add(itemId);
  }

  for (const item of state.items) {
    if (!placedIds.has(item.id)) itemBank.append(createTierItem(item));
  }

  initializeSortables();
  updateInterface();
}

function createTierRow(tier) {
  const row = document.createElement("section");
  row.className = "tier-row";
  row.dataset.tierId = tier.id;
  row.dataset.tierColor = sanitizeColor(tier.color);

  const label = document.createElement("label");
  label.className = "tier-label";
  label.style.backgroundColor = row.dataset.tierColor;

  const input = document.createElement("input");
  input.value = String(tier.name || "Tier").slice(0, 8);
  input.maxLength = 8;
  input.setAttribute("aria-label", "Tier name");
  label.append(input);

  const zone = document.createElement("div");
  zone.className = "item-zone";
  zone.dataset.emptyLabel = "Drop images here";
  zone.setAttribute("aria-label", input.value + " tier items");

  const actions = document.createElement("div");
  actions.className = "tier-actions";
  actions.setAttribute("data-html2canvas-ignore", "true");
  actions.append(
    createActionButton("up", "\u2191", "Move tier up"),
    createActionButton("down", "\u2193", "Move tier down"),
    createActionButton("delete", "\u00d7", "Delete tier"),
  );

  row.append(label, zone, actions);
  return row;
}

function createActionButton(action, symbol, label) {
  const button = document.createElement("button");
  button.className = "tier-action";
  button.type = "button";
  button.dataset.action = action;
  button.title = label;
  button.setAttribute("aria-label", label);
  button.innerHTML = '<span aria-hidden="true">' + symbol + "</span>";
  return button;
}

function createTierItem(item) {
  const element = document.createElement("article");
  element.className = "tier-item";
  element.dataset.itemId = item.id;

  const image = document.createElement("img");
  image.src = item.src;
  image.alt = item.alt || "Tier list item";
  image.draggable = false;

  const removeButton = document.createElement("button");
  removeButton.className = "remove-item";
  removeButton.type = "button";
  removeButton.dataset.removeItem = "";
  removeButton.title = "Remove " + image.alt;
  removeButton.setAttribute("aria-label", "Remove " + image.alt);
  removeButton.setAttribute("data-html2canvas-ignore", "true");
  removeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

  element.append(image, removeButton);
  return element;
}

function initializeSortables() {
  if (typeof Sortable === "undefined") {
    showToast("Drag and drop could not load. Refresh while online.");
    return;
  }

  for (const zone of document.querySelectorAll(".item-zone")) {
    const sortable = new Sortable(zone, {
      group: "tier-items",
      animation: 160,
      fallbackOnBody: true,
      swapThreshold: 0.65,
      delayOnTouchOnly: true,
      delay: 100,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      onEnd: () => {
        updateInterface();
        queueSave();
      },
    });
    sortableInstances.push(sortable);
  }
}

function destroySortables() {
  for (const instance of sortableInstances) instance.destroy();
  sortableInstances = [];
}

function sanitizeColor(color) {
  return /^#[0-9a-f]{6}$/i.test(color || "") ? color : "#d5dbd8";
}

function updateInterface() {
  for (const zone of document.querySelectorAll(".item-zone")) {
    zone.classList.toggle("is-empty", zone.children.length === 0);
  }

  const bankTotal = itemBank.querySelectorAll(".tier-item").length;
  itemCount.textContent = bankTotal + " " + (bankTotal === 1 ? "item" : "items");

  const rows = [...tierRows.children];
  rows.forEach((row, index) => {
    row.querySelector('[data-action="up"]').disabled = index === 0;
    row.querySelector('[data-action="down"]').disabled = index === rows.length - 1;
    const name = row.querySelector(".tier-label input").value || "Unnamed";
    row.querySelector(".item-zone").setAttribute("aria-label", name + " tier items");
  });
}

function collectState() {
  const items = [...document.querySelectorAll(".tier-item")].map((element) => {
    const image = element.querySelector("img");
    return {
      id: element.dataset.itemId,
      src: image.getAttribute("src"),
      alt: image.alt,
    };
  });

  const tiers = [...tierRows.children].map((row) => ({
    id: row.dataset.tierId,
    name: row.querySelector(".tier-label input").value.trim() || "Tier",
    color: row.dataset.tierColor,
    itemIds: [...row.querySelectorAll(".tier-item")].map((item) => item.dataset.itemId),
  }));

  return {
    title: titleInput.value.trim() || "Untitled Tier List",
    tiers,
    items,
    bankIds: [...itemBank.querySelectorAll(".tier-item")].map((item) => item.dataset.itemId),
  };
}

function queueSave() {
  saveStatus.textContent = "Saving draft...";
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(saveState, 220);
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectState()));
    saveStatus.textContent = "Draft saved";
  } catch {
    saveStatus.textContent = "Session only";
    showToast("Browser storage is full. Export before leaving this page.");
  }
}

function generateId(prefix) {
  if (crypto.randomUUID) return prefix + "-" + crypto.randomUUID();
  return prefix + "-" + Date.now() + "-" + Math.random().toString(16).slice(2);
}

async function resizeImage(file) {
  if (file.size > MAX_IMAGE_BYTES) throw new Error(file.name + " is larger than 10 MB.");

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = objectUrl;
    await image.decode();

    const maxSide = 640;
    const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", 0.86);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function addImages(files) {
  const imageFiles = [...files].filter((file) => file.type.startsWith("image/")).slice(0, 30);
  if (imageFiles.length === 0) return;

  const trigger = document.querySelector('label[for="image-input"]');
  trigger.setAttribute("aria-disabled", "true");

  let added = 0;
  for (const file of imageFiles) {
    try {
      const src = await resizeImage(file);
      const alt = file.name.replace(/\.[^.]+$/, "") || "Uploaded image";
      itemBank.append(createTierItem({ id: generateId("item"), src, alt }));
      added += 1;
    } catch (error) {
      showToast(error.message || "Could not add " + file.name + ".");
    }
  }

  trigger.removeAttribute("aria-disabled");
  imageInput.value = "";
  updateInterface();
  saveState();
  if (added > 0) showToast(added + " " + (added === 1 ? "image" : "images") + " added.");
}

function moveTier(row, direction) {
  const sibling = direction === "up" ? row.previousElementSibling : row.nextElementSibling;
  if (!sibling) return;

  if (direction === "up") {
    tierRows.insertBefore(row, sibling);
  } else {
    tierRows.insertBefore(sibling, row);
  }
  updateInterface();
  queueSave();
}

function deleteTier(row) {
  if (tierRows.children.length === 1) {
    showToast("Keep at least one tier.");
    return;
  }

  const name = row.querySelector(".tier-label input").value || "this tier";
  if (!window.confirm("Delete " + name + "? Its images will move to Unranked.")) return;
  itemBank.append(...row.querySelectorAll(".tier-item"));
  row.remove();
  updateInterface();
  queueSave();
}

function showTierDialog() {
  newTierName.value = "New";
  tierDialog.showModal();
  window.setTimeout(() => newTierName.select(), 0);
}

function addTier() {
  const color = new FormData(tierForm).get("tier-color");
  const state = collectState();
  state.tiers.push({
    id: generateId("tier"),
    name: newTierName.value.trim() || "New",
    color: sanitizeColor(color),
    itemIds: [],
  });
  render(state);
  saveState();
  tierDialog.close();
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(LIST_STORE)) {
        request.result.createObjectStore(LIST_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function requestListStore(mode, createRequest) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(LIST_STORE, mode);
    const request = createRequest(transaction.objectStore(LIST_STORE));
    let result;

    request.onsuccess = () => {
      result = request.result;
    };
    transaction.oncomplete = () => {
      database.close();
      resolve(result);
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error);
    };
  });
}

function getSavedLists() {
  return requestListStore("readonly", (store) => store.getAll());
}

function getSavedList(id) {
  return requestListStore("readonly", (store) => store.get(id));
}

function putSavedList(record) {
  return requestListStore("readwrite", (store) => store.put(record));
}

function removeSavedList(id) {
  return requestListStore("readwrite", (store) => store.delete(id));
}

async function saveCurrentList() {
  saveListButton.disabled = true;
  saveStatus.textContent = "Saving list...";

  try {
    const now = Date.now();
    const existing = currentListId ? await getSavedList(currentListId) : null;
    const state = collectState();
    currentListId = existing ? existing.id : generateId("list");
    await putSavedList({
      id: currentListId,
      title: state.title,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
      state,
    });
    localStorage.setItem(CURRENT_LIST_KEY, currentListId);
    saveState();
    saveStatus.textContent = "List saved";
    showToast(existing ? "Saved list updated." : "New list saved in this browser.");
    if (savedListsDialog.open) await renderSavedLists();
  } catch {
    saveStatus.textContent = "Draft saved";
    showToast("This browser could not save the list.");
  } finally {
    saveListButton.disabled = false;
  }
}

function createSavedListRow(record) {
  const row = document.createElement("article");
  row.className = "saved-list-row";
  row.dataset.listId = record.id;

  const copy = document.createElement("div");
  copy.className = "saved-list-copy";
  const title = document.createElement("h3");
  title.textContent = record.title || "Untitled Tier List";
  const details = document.createElement("p");
  const itemTotal = record.state && Array.isArray(record.state.items) ? record.state.items.length : 0;
  details.textContent =
    itemTotal +
    " " +
    (itemTotal === 1 ? "item" : "items") +
    " \u00b7 Updated " +
    new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(record.updatedAt);
  copy.append(title, details);

  const actions = document.createElement("div");
  actions.className = "saved-list-actions";
  const openButton = document.createElement("button");
  openButton.className = "button button--secondary";
  openButton.type = "button";
  openButton.dataset.listAction = "open";
  openButton.textContent = "Open";

  const duplicateButton = document.createElement("button");
  duplicateButton.className = "icon-button";
  duplicateButton.type = "button";
  duplicateButton.dataset.listAction = "duplicate";
  duplicateButton.title = "Duplicate list";
  duplicateButton.setAttribute("aria-label", "Duplicate " + title.textContent);
  duplicateButton.innerHTML = '<span aria-hidden="true">&#10697;</span>';

  const deleteButton = document.createElement("button");
  deleteButton.className = "icon-button";
  deleteButton.type = "button";
  deleteButton.dataset.listAction = "delete";
  deleteButton.title = "Delete list";
  deleteButton.setAttribute("aria-label", "Delete " + title.textContent);
  deleteButton.innerHTML = '<span aria-hidden="true">&times;</span>';

  actions.append(openButton, duplicateButton, deleteButton);
  row.append(copy, actions);
  return row;
}

async function renderSavedLists() {
  try {
    const lists = (await getSavedLists()).sort((left, right) => right.updatedAt - left.updatedAt);
    savedListsContainer.replaceChildren(...lists.map(createSavedListRow));
    savedListsEmpty.hidden = lists.length > 0;
    savedListCount.textContent = lists.length + " saved " + (lists.length === 1 ? "list" : "lists");
  } catch {
    savedListsContainer.replaceChildren();
    savedListsEmpty.hidden = false;
    savedListsEmpty.textContent = "Saved lists are unavailable in this browser.";
    savedListCount.textContent = "Storage unavailable";
  }
}

async function showSavedLists() {
  savedListsDialog.showModal();
  await renderSavedLists();
}

async function openSavedList(id) {
  try {
    const record = await getSavedList(id);
    const state = normalizeState(record && record.state);
    if (!record || !state) throw new Error();
    render(state);
    currentListId = record.id;
    localStorage.setItem(CURRENT_LIST_KEY, currentListId);
    saveState();
    saveStatus.textContent = "List opened";
    savedListsDialog.close();
    showToast("Saved list opened.");
  } catch {
    showToast("This saved list could not be opened.");
  }
}

async function duplicateSavedList(id) {
  try {
    const source = await getSavedList(id);
    const state = normalizeState(source && source.state);
    if (!source || !state) throw new Error();
    state.title = (state.title + " copy").slice(0, 80);
    const now = Date.now();
    await putSavedList({
      id: generateId("list"),
      title: state.title,
      createdAt: now,
      updatedAt: now,
      state,
    });
    await renderSavedLists();
    showToast("List duplicated.");
  } catch {
    showToast("This list could not be duplicated.");
  }
}

async function deleteSavedList(id) {
  try {
    const record = await getSavedList(id);
    if (!record || !window.confirm("Delete " + record.title + " from this browser?")) return;
    await removeSavedList(id);
    if (currentListId === id) {
      currentListId = null;
      localStorage.removeItem(CURRENT_LIST_KEY);
    }
    await renderSavedLists();
    showToast("Saved list deleted.");
  } catch {
    showToast("This list could not be deleted.");
  }
}

function createNewList() {
  if (!window.confirm("Start a new list? Unsaved changes in the current draft will be replaced.")) return;
  currentListId = null;
  localStorage.removeItem(CURRENT_LIST_KEY);
  render(cloneDefaultState());
  saveState();
  saveStatus.textContent = "New draft";
  savedListsDialog.close();
  showToast("New tier list started.");
}

async function waitForImages(container) {
  const images = [...container.querySelectorAll("img")];
  await Promise.all(
    images.map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    }),
  );
}

async function exportPng() {
  if (typeof html2canvas === "undefined") {
    showToast("PNG export could not load. Refresh while online.");
    return;
  }

  exportButton.disabled = true;
  exportButton.lastChild.textContent = " Exporting...";
  exportBoard.classList.add("is-exporting");

  try {
    await document.fonts.ready;
    await waitForImages(exportBoard);
    const canvas = await html2canvas(exportBoard, {
      backgroundColor: "#111716",
      logging: false,
      scale: Math.min(2, window.devicePixelRatio || 1),
      useCORS: true,
    });
    const link = document.createElement("a");
    const filename = (titleInput.value || "tier-list")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    link.download = (filename || "tier-list") + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("Tier list exported.");
  } catch {
    showToast("The export failed. Try using smaller images.");
  } finally {
    exportBoard.classList.remove("is-exporting");
    exportButton.disabled = false;
    exportButton.lastChild.textContent = " Export PNG";
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

titleInput.addEventListener("input", () => {
  boardTitle.textContent = titleInput.value || "Untitled Tier List";
  queueSave();
});

tierRows.addEventListener("input", (event) => {
  if (!event.target.matches(".tier-label input")) return;
  updateInterface();
  queueSave();
});

tierRows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const row = button.closest(".tier-row");
  if (button.dataset.action === "up") moveTier(row, "up");
  if (button.dataset.action === "down") moveTier(row, "down");
  if (button.dataset.action === "delete") deleteTier(row);
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-item]");
  if (!button) return;
  button.closest(".tier-item").remove();
  updateInterface();
  queueSave();
});

imageInput.addEventListener("change", () => addImages(imageInput.files));
addTierButton.addEventListener("click", showTierDialog);
savedListsButton.addEventListener("click", showSavedLists);
saveListButton.addEventListener("click", saveCurrentList);
document.querySelector("#close-dialog-button").addEventListener("click", () => tierDialog.close());
document.querySelector("#cancel-dialog-button").addEventListener("click", () => tierDialog.close());
document.querySelector("#close-saved-lists-button").addEventListener("click", () => savedListsDialog.close());
document.querySelector("#new-list-button").addEventListener("click", createNewList);
tierForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTier();
});

savedListsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-list-action]");
  if (!button) return;
  const id = button.closest(".saved-list-row").dataset.listId;
  if (button.dataset.listAction === "open") openSavedList(id);
  if (button.dataset.listAction === "duplicate") duplicateSavedList(id);
  if (button.dataset.listAction === "delete") deleteSavedList(id);
});

resetButton.addEventListener("click", () => {
  if (!window.confirm("Reset the title, tiers, and images to the sample list?")) return;
  localStorage.removeItem(STORAGE_KEY);
  render(cloneDefaultState());
  saveState();
  showToast("Tier list reset.");
});

exportButton.addEventListener("click", exportPng);
window.addEventListener("beforeunload", saveState);

render(loadState());
