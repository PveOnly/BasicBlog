const HISTORY_KEY = "rank-night-history-v1";
const TIER_ORDER = ["S", "A", "B", "C", "D"];
const TIER_COLORS = {
  S: "#ef7168",
  A: "#f2a65f",
  B: "#f2d06b",
  C: "#68b895",
  D: "#6ea8d9",
};

const TOPIC_PACKS = [
  {
    id: "fruits",
    category: "Food fight",
    topic: "Best fruits",
    items: [
      { name: "Apple", emoji: "\ud83c\udf4e", color: "#e66b61" },
      { name: "Banana", emoji: "\ud83c\udf4c", color: "#f0cd65" },
      { name: "Mango", emoji: "\ud83e\udd6d", color: "#efa95d" },
      { name: "Strawberry", emoji: "\ud83c\udf53", color: "#df635e" },
      { name: "Orange", emoji: "\ud83c\udf4a", color: "#eda85c" },
      { name: "Kiwi", emoji: "\ud83e\udd5d", color: "#8dbb72" },
      { name: "Pineapple", emoji: "\ud83c\udf4d", color: "#e6c85f" },
      { name: "Watermelon", emoji: "\ud83c\udf49", color: "#70b887" },
    ],
  },
  {
    id: "pizza",
    category: "Dinner debate",
    topic: "Best pizza toppings",
    items: [
      { name: "Pepperoni", emoji: "\ud83c\udf55", color: "#d76858" },
      { name: "Mushrooms", emoji: "\ud83c\udf44", color: "#b89f88" },
      { name: "Olives", emoji: "\ud83e\uded2", color: "#747f69" },
      { name: "Pineapple", emoji: "\ud83c\udf4d", color: "#e4c35e" },
      { name: "Basil", emoji: "\ud83c\udf3f", color: "#68a980" },
      { name: "Peppers", emoji: "\ud83c\udf36\ufe0f", color: "#d85f55" },
      { name: "Onions", emoji: "\ud83e\uddc5", color: "#a98fc1" },
      { name: "Extra cheese", emoji: "\ud83e\uddc0", color: "#efc85f" },
    ],
  },
  {
    id: "vacations",
    category: "Pack your bags",
    topic: "Best vacation",
    items: [
      { name: "Beach", emoji: "\ud83c\udfd6\ufe0f", color: "#62b7c3" },
      { name: "Mountains", emoji: "\ud83c\udfd4\ufe0f", color: "#7e9ea7" },
      { name: "Big city", emoji: "\ud83c\udfd9\ufe0f", color: "#6f8caf" },
      { name: "Road trip", emoji: "\ud83d\ude97", color: "#d56c61" },
      { name: "Camping", emoji: "\u26fa", color: "#6eaa7d" },
      { name: "Cruise", emoji: "\ud83d\udef3\ufe0f", color: "#6fa9cc" },
      { name: "Theme park", emoji: "\ud83c\udfa2", color: "#c478a1" },
      { name: "Cabin", emoji: "\ud83c\udfe1", color: "#ad835f" },
    ],
  },
  {
    id: "superpowers",
    category: "Choose wisely",
    topic: "Best superpower",
    items: [
      { name: "Flight", emoji: "\ud83e\uddb8", color: "#6f9fd4" },
      { name: "Invisibility", emoji: "\ud83d\udc7b", color: "#a3adb3" },
      { name: "Teleportation", emoji: "\ud83c\udf00", color: "#9b82c8" },
      { name: "Super strength", emoji: "\ud83d\udcaa", color: "#dc7b61" },
      { name: "Time control", emoji: "\u23f3", color: "#c19a61" },
      { name: "Shapeshifting", emoji: "\ud83d\udc3a", color: "#8e9f82" },
      { name: "Mind reading", emoji: "\ud83e\udde0", color: "#d47b9b" },
      { name: "Healing", emoji: "\u2728", color: "#6fbd9b" },
    ],
  },
  {
    id: "breakfast",
    category: "Morning table",
    topic: "Best breakfast food",
    items: [
      { name: "Pancakes", emoji: "\ud83e\udd5e", color: "#d7a864" },
      { name: "Waffles", emoji: "\ud83e\uddc7", color: "#d3a15c" },
      { name: "Eggs", emoji: "\ud83c\udf73", color: "#edc967" },
      { name: "Cereal", emoji: "\ud83e\udd63", color: "#8cb5c1" },
      { name: "Toast", emoji: "\ud83c\udf5e", color: "#c58e59" },
      { name: "Croissant", emoji: "\ud83e\udd50", color: "#dba85f" },
      { name: "Oatmeal", emoji: "\ud83e\udd63", color: "#aa967b" },
      { name: "Fruit bowl", emoji: "\ud83c\udf47", color: "#9a76b5" },
    ],
  },
  {
    id: "snacks",
    category: "Game-night fuel",
    topic: "Best party snack",
    items: [
      { name: "Popcorn", emoji: "\ud83c\udf7f", color: "#e5c765" },
      { name: "Chips", emoji: "\ud83e\udd54", color: "#c89459" },
      { name: "Pizza", emoji: "\ud83c\udf55", color: "#d96e5d" },
      { name: "Cookies", emoji: "\ud83c\udf6a", color: "#b67f55" },
      { name: "Candy", emoji: "\ud83c\udf6c", color: "#cb78a0" },
      { name: "Nachos", emoji: "\ud83e\uded4", color: "#e3ad55" },
      { name: "Pretzels", emoji: "\ud83e\udd68", color: "#b77e4f" },
      { name: "Ice cream", emoji: "\ud83c\udf68", color: "#87b9c7" },
    ],
  },
];

const startScreen = document.querySelector("#start-screen");
const generateButton = document.querySelector("#generate-button");
const startHistoryButton = document.querySelector("#start-history-button");
const newTopicButton = document.querySelector("#new-topic-button");
const topicTitle = document.querySelector("#topic-title");
const topicCategory = document.querySelector("#topic-category");
const cardTray = document.querySelector("#card-tray");
const rankedCount = document.querySelector("#ranked-count");
const unrankedCount = document.querySelector("#unranked-count");
const selectionStatus = document.querySelector("#selection-status");
const finishButton = document.querySelector("#finish-button");
const resultsDialog = document.querySelector("#results-dialog");
const resultTitle = document.querySelector("#result-title");
const resultList = document.querySelector("#result-list");
const savedBadge = document.querySelector("#saved-badge");
const continueButton = document.querySelector("#continue-button");
const nextTopicButton = document.querySelector("#next-topic-button");
const historyButton = document.querySelector("#history-button");
const historyDialog = document.querySelector("#history-dialog");
const historyList = document.querySelector("#history-list");
const historyEmpty = document.querySelector("#history-empty");
const toast = document.querySelector("#toast");

const zones = [...document.querySelectorAll(".drop-zone")];
let currentPack = null;
let selectedCard = null;
let focusedCard = null;
let sortableInstances = [];
let toastTimer;

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function createCardArt(item) {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 240;
  const context = canvas.getContext("2d");
  context.fillStyle = item.color;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.globalAlpha = 0.14;
  context.fillStyle = "#ffffff";
  context.beginPath();
  context.arc(58, 46, 50, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#111716";
  context.fillRect(238, 0, 82, 240);
  context.globalAlpha = 1;

  context.font = '118px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(item.emoji, 150, 126);
  return canvas.toDataURL("image/png");
}

function createRankCard(item, index) {
  const card = document.createElement("article");
  card.className = "rank-card";
  card.dataset.itemId = currentPack.id + "-" + index;
  card.dataset.itemName = item.name;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", item.name);

  const image = document.createElement("img");
  image.src = createCardArt(item);
  image.alt = item.name;
  image.draggable = false;

  const label = document.createElement("span");
  label.textContent = item.name;
  card.append(image, label);
  return card;
}

function clearBoard() {
  for (const zone of zones) zone.replaceChildren();
  setSelectedCard(null);
  setFocusedCard(null);
}

function generateTopic(force = false) {
  if (!force && currentPack && getRankedTotal() > 0) {
    if (!window.confirm("Generate a new topic and leave this ranking?")) return;
  }

  clearBoard();
  const candidates = TOPIC_PACKS.filter((pack) => !currentPack || pack.id !== currentPack.id);
  currentPack = candidates[Math.floor(Math.random() * candidates.length)];
  topicTitle.textContent = currentPack.topic;
  topicCategory.textContent = currentPack.category;

  const cards = shuffle(currentPack.items).map(createRankCard);
  cardTray.append(...cards);
  startScreen.classList.remove("is-visible");
  updateProgress();
  window.setTimeout(() => setFocusedCard(cards[0]), 0);
}

function getAllCards() {
  return zones.flatMap((zone) => [...zone.querySelectorAll(".rank-card")]);
}

function getRankedTotal() {
  return TIER_ORDER.reduce(
    (total, tier) => total + document.querySelector('[data-zone="' + tier + '"]').children.length,
    0,
  );
}

function setFocusedCard(card) {
  if (focusedCard) focusedCard.classList.remove("remote-focus");
  focusedCard = card || null;
  if (focusedCard) {
    focusedCard.classList.add("remote-focus");
    focusedCard.focus({ preventScroll: true });
    focusedCard.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}

function setSelectedCard(card) {
  if (selectedCard) {
    selectedCard.classList.remove("is-selected");
    selectedCard.setAttribute("aria-pressed", "false");
  }
  selectedCard = card || null;
  if (selectedCard) {
    selectedCard.classList.add("is-selected");
    selectedCard.setAttribute("aria-pressed", "true");
    selectionStatus.textContent = "Selected " + selectedCard.dataset.itemName;
  } else {
    selectionStatus.textContent = currentPack ? "Choose a card" : "Generate a topic";
  }
}

function updateProgress() {
  const total = getAllCards().length;
  const unranked = cardTray.querySelectorAll(".rank-card").length;
  const ranked = total - unranked;
  rankedCount.textContent = ranked + " / " + total + " ranked";
  unrankedCount.textContent = unranked + " " + (unranked === 1 ? "card" : "cards");
  finishButton.disabled = total === 0 || unranked > 0;

  if (selectedCard) {
    const zone = selectedCard.parentElement.dataset.zone;
    selectionStatus.textContent =
      "Selected " + selectedCard.dataset.itemName + (zone === "unranked" ? "" : " - Tier " + zone);
  } else {
    selectionStatus.textContent = currentPack ? "Choose a card" : "Generate a topic";
  }
}

function moveSelectedVertical(direction) {
  if (!selectedCard) return;
  const currentIndex = zones.indexOf(selectedCard.parentElement);
  const targetIndex = Math.max(0, Math.min(zones.length - 1, currentIndex + direction));
  if (targetIndex === currentIndex) return;
  zones[targetIndex].append(selectedCard);
  setFocusedCard(selectedCard);
  updateProgress();
}

function moveSelectedHorizontal(direction) {
  if (!selectedCard) return;
  const sibling = direction < 0 ? selectedCard.previousElementSibling : selectedCard.nextElementSibling;
  if (!sibling) return;
  if (direction < 0) {
    selectedCard.parentElement.insertBefore(selectedCard, sibling);
  } else {
    selectedCard.parentElement.insertBefore(sibling, selectedCard);
  }
  setFocusedCard(selectedCard);
}

function cycleFocus(direction) {
  const cards = getAllCards();
  if (cards.length === 0) return;
  const currentIndex = Math.max(0, cards.indexOf(focusedCard));
  const targetIndex = (currentIndex + direction + cards.length) % cards.length;
  setFocusedCard(cards[targetIndex]);
}

function initializeSortables() {
  if (typeof Sortable === "undefined") {
    showToast("Drag and drop is unavailable. Remote and click controls still work.");
    return;
  }

  for (const zone of zones) {
    const sortable = new Sortable(zone, {
      group: "rank-night-cards",
      draggable: ".rank-card",
      animation: 150,
      forceFallback: true,
      fallbackOnBody: true,
      fallbackTolerance: 3,
      swapThreshold: 0.65,
      delayOnTouchOnly: true,
      delay: 100,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      onEnd: (event) => {
        const card = event.item;
        setFocusedCard(card);
        setSelectedCard(null);
        updateProgress();
      },
    });
    sortableInstances.push(sortable);
  }
}

function captureRanking() {
  return {
    id: "ranking-" + Date.now() + "-" + Math.random().toString(16).slice(2),
    topic: currentPack.topic,
    category: currentPack.category,
    completedAt: Date.now(),
    tiers: TIER_ORDER.map((tier) => ({
      label: tier,
      items: [...document.querySelector('[data-zone="' + tier + '"]').querySelectorAll(".rank-card")].map(
        (card) => card.dataset.itemName,
      ),
    })),
  };
}

function loadHistory() {
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY));
    return Array.isArray(history) ? history.slice(0, 20) : [];
  } catch {
    return [];
  }
}

function saveRanking(result) {
  const history = loadHistory();
  history.unshift(result);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

function createResultRow(tier) {
  const row = document.createElement("div");
  row.className = "result-row";
  row.style.setProperty("--result-color", TIER_COLORS[tier.label]);
  const label = document.createElement("strong");
  label.textContent = tier.label;
  const items = document.createElement("span");
  items.textContent = tier.items.length ? tier.items.join(", ") : "Empty";
  row.append(label, items);
  return row;
}

function showResults(result, editable) {
  resultTitle.textContent = result.topic;
  resultList.replaceChildren(...result.tiers.map(createResultRow));
  savedBadge.textContent = editable ? "Saved" : "Past ranking";
  continueButton.hidden = !editable;
  resultsDialog.showModal();
}

function finishRanking() {
  if (finishButton.disabled) return;
  const result = captureRanking();
  saveRanking(result);
  showResults(result, true);
}

function createHistoryItem(result) {
  const item = document.createElement("article");
  item.className = "history-item";
  item.dataset.historyId = result.id;

  const copy = document.createElement("div");
  copy.className = "history-copy";
  const title = document.createElement("h3");
  title.textContent = result.topic;
  const details = document.createElement("p");
  details.textContent =
    result.category +
    " - " +
    new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(result.completedAt);
  copy.append(title, details);

  const actions = document.createElement("div");
  actions.className = "history-actions";
  const viewButton = document.createElement("button");
  viewButton.className = "button button--secondary";
  viewButton.type = "button";
  viewButton.dataset.historyAction = "view";
  viewButton.textContent = "View";

  const deleteButton = document.createElement("button");
  deleteButton.className = "icon-button";
  deleteButton.type = "button";
  deleteButton.dataset.historyAction = "delete";
  deleteButton.title = "Delete ranking";
  deleteButton.setAttribute("aria-label", "Delete " + result.topic);
  deleteButton.innerHTML = '<span aria-hidden="true">&times;</span>';

  actions.append(viewButton, deleteButton);
  item.append(copy, actions);
  return item;
}

function renderHistory() {
  const history = loadHistory();
  historyList.replaceChildren(...history.map(createHistoryItem));
  historyEmpty.hidden = history.length > 0;
}

function showHistory() {
  renderHistory();
  historyDialog.showModal();
}

function findHistoryResult(id) {
  return loadHistory().find((result) => result.id === id);
}

function deleteHistoryResult(id) {
  const result = findHistoryResult(id);
  if (!result || !window.confirm("Delete the saved " + result.topic + " ranking?")) return;
  const history = loadHistory().filter((entry) => entry.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
  showToast("Ranking deleted.");
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

document.addEventListener("click", (event) => {
  const card = event.target.closest(".rank-card");
  if (card) {
    setFocusedCard(card);
    setSelectedCard(selectedCard === card ? null : card);
    updateProgress();
    return;
  }

  const zone = event.target.closest(".drop-zone");
  if (zone && selectedCard) {
    zone.append(selectedCard);
    setFocusedCard(selectedCard);
    setSelectedCard(null);
    updateProgress();
  }
});

document.addEventListener("keydown", (event) => {
  if (resultsDialog.open || historyDialog.open) return;

  if (startScreen.classList.contains("is-visible")) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      (document.activeElement === generateButton ? startHistoryButton : generateButton).focus();
      return;
    }
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      if (document.activeElement === startHistoryButton) {
        showHistory();
      } else {
        generateTopic(true);
      }
    }
    return;
  }

  if (!currentPack) return;
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter", " ", "Escape"].includes(event.key)) return;
  event.preventDefault();

  if (event.key === "Escape") {
    setSelectedCard(null);
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    if (!focusedCard) setFocusedCard(getAllCards()[0]);
    setSelectedCard(selectedCard ? null : focusedCard);
    updateProgress();
    return;
  }

  if (!selectedCard) {
    cycleFocus(event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1);
    return;
  }

  if (event.key === "ArrowUp") moveSelectedVertical(-1);
  if (event.key === "ArrowDown") moveSelectedVertical(1);
  if (event.key === "ArrowLeft") moveSelectedHorizontal(-1);
  if (event.key === "ArrowRight") moveSelectedHorizontal(1);
});

generateButton.addEventListener("click", () => generateTopic(true));
newTopicButton.addEventListener("click", () => generateTopic(false));
finishButton.addEventListener("click", finishRanking);
continueButton.addEventListener("click", () => resultsDialog.close());
nextTopicButton.addEventListener("click", () => {
  resultsDialog.close();
  generateTopic(true);
});
historyButton.addEventListener("click", showHistory);
startHistoryButton.addEventListener("click", showHistory);
document.querySelector("#close-history-button").addEventListener("click", () => historyDialog.close());

historyList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-history-action]");
  if (!button) return;
  const id = button.closest(".history-item").dataset.historyId;
  if (button.dataset.historyAction === "view") {
    const result = findHistoryResult(id);
    if (!result) return;
    historyDialog.close();
    showResults(result, false);
  }
  if (button.dataset.historyAction === "delete") deleteHistoryResult(id);
});

initializeSortables();
renderHistory();
updateProgress();
generateButton.focus();
