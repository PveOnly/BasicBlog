const HISTORY_KEY = "rank-night-history-v1";
const TIER_ORDER = ["S", "A", "B", "C", "D"];
const TIER_COLORS = {
  S: "#ef7168",
  A: "#f2a65f",
  B: "#f2d06b",
  C: "#68b895",
  D: "#6ea8d9",
};

const CARD_COLORS = [
  "#e66b61",
  "#f0c760",
  "#67ad86",
  "#6ea8d9",
  "#b882c4",
  "#df875d",
  "#5fb5b2",
  "#d57696",
  "#91a865",
  "#9d8b78",
];

function makeItems(entries) {
  return entries.map(([name, emoji], index) => ({
    name,
    emoji,
    color: CARD_COLORS[index % CARD_COLORS.length],
  }));
}

const TOPIC_PACKS = [
  {
    id: "fruits",
    category: "Food fight",
    topic: "Best fruits",
    items: makeItems([
      ["Apple", "\u{1F34E}"],
      ["Banana", "\u{1F34C}"],
      ["Mango", "\u{1F96D}"],
      ["Strawberry", "\u{1F353}"],
      ["Orange", "\u{1F34A}"],
      ["Kiwi", "\u{1F95D}"],
      ["Pineapple", "\u{1F34D}"],
      ["Watermelon", "\u{1F349}"],
      ["Grapes", "\u{1F347}"],
      ["Pear", "\u{1F350}"],
      ["Peach", "\u{1F351}"],
      ["Cherries", "\u{1F352}"],
      ["Lemon", "\u{1F34B}"],
      ["Coconut", "\u{1F965}"],
      ["Blueberries", "\u{1FAD0}"],
      ["Melon", "\u{1F348}"],
      ["Avocado", "\u{1F951}"],
      ["Raspberry", "\u{1F353}"],
      ["Papaya", "\u{1F7E0}"],
      ["Passion fruit", "\u{1F7E3}"],
    ]),
  },
  {
    id: "pizza",
    category: "Dinner debate",
    topic: "Best pizza toppings",
    items: makeItems([
      ["Pepperoni", "\u{1F355}"],
      ["Mushrooms", "\u{1F344}"],
      ["Olives", "\u{1FAD2}"],
      ["Pineapple", "\u{1F34D}"],
      ["Basil", "\u{1F33F}"],
      ["Peppers", "\u{1F336}\u{FE0F}"],
      ["Onions", "\u{1F9C5}"],
      ["Extra cheese", "\u{1F9C0}"],
      ["Ham", "\u{1F356}"],
      ["Chicken", "\u{1F357}"],
      ["Bacon", "\u{1F953}"],
      ["Sausage", "\u{1F32D}"],
      ["Tomato", "\u{1F345}"],
      ["Garlic", "\u{1F9C4}"],
      ["Spinach", "\u{1F96C}"],
      ["Artichoke", "\u{1F331}"],
      ["Anchovies", "\u{1F41F}"],
      ["Jalapeno", "\u{1F336}\u{FE0F}"],
      ["Corn", "\u{1F33D}"],
      ["Egg", "\u{1F373}"],
    ]),
  },
  {
    id: "vacations",
    category: "Pack your bags",
    topic: "Best vacation",
    items: makeItems([
      ["Beach", "\u{1F3D6}\u{FE0F}"],
      ["Mountains", "\u{1F3D4}\u{FE0F}"],
      ["Big city", "\u{1F3D9}\u{FE0F}"],
      ["Road trip", "\u{1F697}"],
      ["Camping", "\u{26FA}"],
      ["Cruise", "\u{1F6F3}\u{FE0F}"],
      ["Theme park", "\u{1F3A2}"],
      ["Cabin", "\u{1F3E1}"],
      ["Safari", "\u{1F981}"],
      ["Ski resort", "\u{26F7}\u{FE0F}"],
      ["Island", "\u{1F3DD}\u{FE0F}"],
      ["Desert", "\u{1F3DC}\u{FE0F}"],
      ["Countryside", "\u{1F33E}"],
      ["Lake", "\u{1F6A3}"],
      ["Backpacking", "\u{1F392}"],
      ["Train journey", "\u{1F686}"],
      ["Wellness spa", "\u{1F9D6}"],
      ["Music festival", "\u{1F3B6}"],
      ["Historic tour", "\u{1F3DB}\u{FE0F}"],
      ["Staycation", "\u{1F6CB}\u{FE0F}"],
    ]),
  },
  {
    id: "superpowers",
    category: "Choose wisely",
    topic: "Best superpower",
    items: makeItems([
      ["Flight", "\u{1F9B8}"],
      ["Invisibility", "\u{1F47B}"],
      ["Teleportation", "\u{1F300}"],
      ["Super strength", "\u{1F4AA}"],
      ["Time control", "\u{23F3}"],
      ["Shapeshifting", "\u{1F43A}"],
      ["Mind reading", "\u{1F9E0}"],
      ["Healing", "\u{2728}"],
      ["Super speed", "\u{26A1}"],
      ["Underwater breathing", "\u{1F420}"],
      ["Telekinesis", "\u{1FAF4}"],
      ["Force fields", "\u{1F6E1}\u{FE0F}"],
      ["Weather control", "\u{1F329}\u{FE0F}"],
      ["Elasticity", "\u{1FAA2}"],
      ["X-ray vision", "\u{1F441}\u{FE0F}"],
      ["Talk to animals", "\u{1F43E}"],
      ["Size changing", "\u{1F41C}"],
      ["Cloning", "\u{1F465}"],
      ["Perfect luck", "\u{1F340}"],
      ["Immortality", "\u{267E}\u{FE0F}"],
    ]),
  },
  {
    id: "breakfast",
    category: "Morning table",
    topic: "Best breakfast food",
    items: makeItems([
      ["Pancakes", "\u{1F95E}"],
      ["Waffles", "\u{1F9C7}"],
      ["Eggs", "\u{1F373}"],
      ["Cereal", "\u{1F963}"],
      ["Toast", "\u{1F35E}"],
      ["Croissant", "\u{1F950}"],
      ["Oatmeal", "\u{1F963}"],
      ["Fruit bowl", "\u{1F347}"],
      ["Bacon", "\u{1F953}"],
      ["Yogurt", "\u{1F95B}"],
      ["Bagel", "\u{1F96F}"],
      ["Muffins", "\u{1F9C1}"],
      ["Avocado toast", "\u{1F951}"],
      ["French toast", "\u{1F35E}"],
      ["Hash browns", "\u{1F954}"],
      ["Breakfast burrito", "\u{1F32F}"],
      ["Smoothie", "\u{1F964}"],
      ["Coffee", "\u{2615}"],
      ["Tea", "\u{1F375}"],
      ["Donuts", "\u{1F369}"],
    ]),
  },
  {
    id: "snacks",
    category: "Game-night fuel",
    topic: "Best party snack",
    items: makeItems([
      ["Popcorn", "\u{1F37F}"],
      ["Chips", "\u{1F954}"],
      ["Pizza", "\u{1F355}"],
      ["Cookies", "\u{1F36A}"],
      ["Candy", "\u{1F36C}"],
      ["Nachos", "\u{1FAD4}"],
      ["Pretzels", "\u{1F968}"],
      ["Ice cream", "\u{1F368}"],
      ["Chicken wings", "\u{1F357}"],
      ["Mini burgers", "\u{1F354}"],
      ["Cheese board", "\u{1F9C0}"],
      ["Salsa", "\u{1FAD9}"],
      ["Nuts", "\u{1F95C}"],
      ["Cupcakes", "\u{1F9C1}"],
      ["Fruit skewers", "\u{1F34D}"],
      ["Spring rolls", "\u{1F963}"],
      ["Hot dogs", "\u{1F32D}"],
      ["Brownies", "\u{1F36B}"],
      ["Onion rings", "\u{1F9C5}"],
      ["Mozzarella sticks", "\u{1F9C0}"],
    ]),
  },
  {
    id: "desserts",
    category: "Sweet showdown",
    topic: "Best dessert",
    items: makeItems([
      ["Chocolate cake", "\u{1F370}"],
      ["Ice cream", "\u{1F368}"],
      ["Cheesecake", "\u{1F9C0}"],
      ["Apple pie", "\u{1F967}"],
      ["Brownies", "\u{1F36B}"],
      ["Tiramisu", "\u{2615}"],
      ["Donuts", "\u{1F369}"],
      ["Cookies", "\u{1F36A}"],
      ["Creme brulee", "\u{1F36E}"],
      ["Macarons", "\u{1F36C}"],
      ["Churros", "\u{1F9C7}"],
      ["Cupcakes", "\u{1F9C1}"],
      ["Pancakes", "\u{1F95E}"],
      ["Fruit tart", "\u{1F353}"],
      ["Pudding", "\u{1F36E}"],
      ["Milkshake", "\u{1F964}"],
      ["Mochi", "\u{1F361}"],
      ["Baklava", "\u{1F36F}"],
      ["Lemon tart", "\u{1F34B}"],
      ["Cinnamon roll", "\u{1F300}"],
    ]),
  },
  {
    id: "pets",
    category: "Animal house",
    topic: "Best pet",
    items: makeItems([
      ["Dog", "\u{1F415}"],
      ["Cat", "\u{1F408}"],
      ["Rabbit", "\u{1F407}"],
      ["Hamster", "\u{1F439}"],
      ["Parrot", "\u{1F99C}"],
      ["Goldfish", "\u{1F420}"],
      ["Turtle", "\u{1F422}"],
      ["Guinea pig", "\u{1F401}"],
      ["Snake", "\u{1F40D}"],
      ["Lizard", "\u{1F98E}"],
      ["Horse", "\u{1F40E}"],
      ["Ferret", "\u{1F9A6}"],
      ["Hedgehog", "\u{1F994}"],
      ["Chinchilla", "\u{1F42D}"],
      ["Frog", "\u{1F438}"],
      ["Chicken", "\u{1F414}"],
      ["Duck", "\u{1F986}"],
      ["Spider", "\u{1F577}\u{FE0F}"],
      ["Hermit crab", "\u{1F980}"],
      ["Mini pig", "\u{1F416}"],
    ]),
  },
  {
    id: "movie-genres",
    category: "Movie night",
    topic: "Best movie genre",
    items: makeItems([
      ["Comedy", "\u{1F602}"],
      ["Action", "\u{1F4A5}"],
      ["Horror", "\u{1F47B}"],
      ["Science fiction", "\u{1F6F8}"],
      ["Fantasy", "\u{1F9D9}"],
      ["Romance", "\u{2764}\u{FE0F}"],
      ["Thriller", "\u{1F52A}"],
      ["Animation", "\u{1F3A8}"],
      ["Documentary", "\u{1F3A5}"],
      ["Mystery", "\u{1F50D}"],
      ["Adventure", "\u{1F5FA}\u{FE0F}"],
      ["Musical", "\u{1F3B6}"],
      ["Crime", "\u{1F575}\u{FE0F}"],
      ["Western", "\u{1F920}"],
      ["War", "\u{1FA96}"],
      ["Sports", "\u{1F3C6}"],
      ["Historical", "\u{1F3DB}\u{FE0F}"],
      ["Family", "\u{1F46A}"],
      ["Superhero", "\u{1F9B8}"],
      ["Disaster", "\u{1F30B}"],
    ]),
  },
  {
    id: "game-night",
    category: "Tabletop clash",
    topic: "Best game-night game",
    items: makeItems([
      ["Chess", "\u{265F}\u{FE0F}"],
      ["Poker", "\u{1F0CF}"],
      ["Charades", "\u{1F3AD}"],
      ["Trivia", "\u{2753}"],
      ["Pictionary", "\u{1F3A8}"],
      ["Monopoly", "\u{1F4B5}"],
      ["Scrabble", "\u{1F524}"],
      ["Uno", "\u{1F3B4}"],
      ["Jenga", "\u{1F9F1}"],
      ["Clue", "\u{1F50D}"],
      ["Codenames", "\u{1F575}\u{FE0F}"],
      ["Risk", "\u{1F5FA}\u{FE0F}"],
      ["Darts", "\u{1F3AF}"],
      ["Bingo", "\u{1F3B1}"],
      ["Dominoes", "\u{1F3B2}"],
      ["Werewolf", "\u{1F43A}"],
      ["Cards Against Humanity", "\u{1F5A4}"],
      ["Mario Kart", "\u{1F3CE}\u{FE0F}"],
      ["Karaoke", "\u{1F3A4}"],
      ["Escape room", "\u{1F5DD}\u{FE0F}"],
    ]),
  },
  {
    id: "sports",
    category: "Stadium debate",
    topic: "Best sport to watch",
    items: makeItems([
      ["Football", "\u{26BD}"],
      ["Basketball", "\u{1F3C0}"],
      ["Tennis", "\u{1F3BE}"],
      ["Formula 1", "\u{1F3CE}\u{FE0F}"],
      ["Rugby", "\u{1F3C9}"],
      ["Baseball", "\u{26BE}"],
      ["Ice hockey", "\u{1F3D2}"],
      ["Boxing", "\u{1F94A}"],
      ["Volleyball", "\u{1F3D0}"],
      ["Golf", "\u{26F3}"],
      ["Cycling", "\u{1F6B4}"],
      ["Athletics", "\u{1F3C3}"],
      ["Swimming", "\u{1F3CA}"],
      ["Skiing", "\u{26F7}\u{FE0F}"],
      ["Surfing", "\u{1F3C4}"],
      ["MMA", "\u{1F94B}"],
      ["Cricket", "\u{1F3CF}"],
      ["Table tennis", "\u{1F3D3}"],
      ["Gymnastics", "\u{1F938}"],
      ["Skateboarding", "\u{1F6F9}"],
    ]),
  },
  {
    id: "inventions",
    category: "Modern life",
    topic: "Best everyday invention",
    items: makeItems([
      ["Smartphone", "\u{1F4F1}"],
      ["Internet", "\u{1F310}"],
      ["Refrigerator", "\u{1F9CA}"],
      ["Washing machine", "\u{1F9FA}"],
      ["Microwave", "\u{1F35C}"],
      ["Air conditioning", "\u{2744}\u{FE0F}"],
      ["Electric light", "\u{1F4A1}"],
      ["Bicycle", "\u{1F6B2}"],
      ["Car", "\u{1F697}"],
      ["Camera", "\u{1F4F7}"],
      ["Headphones", "\u{1F3A7}"],
      ["Television", "\u{1F4FA}"],
      ["Coffee maker", "\u{2615}"],
      ["Dishwasher", "\u{1F37D}\u{FE0F}"],
      ["Vacuum cleaner", "\u{1F9F9}"],
      ["Elevator", "\u{2195}\u{FE0F}"],
      ["GPS", "\u{1F9ED}"],
      ["Remote control", "\u{1F39B}\u{FE0F}"],
      ["Electric kettle", "\u{1FAD6}"],
      ["Toothbrush", "\u{1FAA5}"],
    ]),
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
