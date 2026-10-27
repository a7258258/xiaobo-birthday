const cards = [
  {
    id: "denia",
    theme: "theme-denia",
    from: "鳴潮 · 熱熔共鳴者",
    name: "達妮婭",
    quote: "噓……小波的生日，先別聲張。泡影我替你撐著，今天就好好被溫柔包圍吧。",
    photo: "達妮婭.jpg",
  },
  {
    id: "si",
    theme: "theme-si",
    from: "終末地 · 巨獸代理人",
    name: "祀",
    quote: "哼，生日才想起來找我？行吧——墨意給你畫一場好天氣，記得之後來緣緣莊清帳。",
    photo: "祀.jpg",
  },
  {
    id: "typh",
    theme: "theme-typh",
    from: "終末地 · 荒野獵手",
    name: "提弗洛斯",
    quote: "好故事和好獵手一樣，先瞄準的都是心臟。這支箭，獻給小波的今天。",
    photo: "提弗洛斯.webp",
  },
];

const cover = document.getElementById("cover");
const summon = document.getElementById("summon");
const finale = document.getElementById("finale");
const startBtn = document.getElementById("startBtn");
const drawBtn = document.getElementById("drawBtn");
const nextBtn = document.getElementById("nextBtn");
const replayBtn = document.getElementById("replayBtn");
const cardEl = document.getElementById("card");
const cardInner = document.getElementById("cardInner");
const cardFront = document.getElementById("cardFront");
const portrait = document.getElementById("portrait");
const cardFrom = document.getElementById("cardFrom");
const cardName = document.getElementById("cardName");
const cardQuote = document.getElementById("cardQuote");
const progressText = document.getElementById("progressText");
const burst = document.getElementById("burst");

let index = 0;
let busy = false;
let revealed = false;

function show(screen) {
  [cover, summon, finale].forEach((el) => el.classList.remove("active"));
  screen.classList.add("active");
}

function updateProgress() {
  progressText.textContent = `${Math.min(index, cards.length)} / ${cards.length}`;
}

function showPhoto(data) {
  portrait.replaceChildren();
  if (!data.photo) return;
  const img = document.createElement("img");
  img.className = "portrait-photo";
  img.src = data.photo;
  img.alt = data.name;
  portrait.appendChild(img);
}

function loadCard(data) {
  cardFront.className = `card-face front ${data.theme}`;
  cardFrom.textContent = data.from;
  cardName.textContent = data.name;
  cardQuote.textContent = data.quote;
  showPhoto(data);
}

function resetCardFace() {
  cardEl.classList.remove("flipped", "shake");
  revealed = false;
  drawBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  drawBtn.textContent = index === 0 ? "開始抽卡" : "再抽一張";
  if (index >= cards.length) {
    drawBtn.classList.add("hidden");
  }
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function draw() {
  if (busy || revealed || index >= cards.length) return;
  busy = true;
  drawBtn.disabled = true;

  const data = cards[index];
  loadCard(data);

  cardEl.classList.add("shake");
  await wait(520);
  cardEl.classList.remove("shake");

  burst.classList.remove("flash");
  void burst.offsetWidth;
  burst.classList.add("flash");

  cardEl.classList.add("flipped");
  await wait(850);

  index += 1;
  updateProgress();
  revealed = true;
  drawBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  nextBtn.textContent = "收下祝福，繼續";

  busy = false;
  drawBtn.disabled = false;
}

function continueFlow() {
  if (busy) return;
  if (index >= cards.length) {
    show(finale);
    return;
  }
  resetCardFace();
}

function startPool() {
  index = 0;
  updateProgress();
  resetCardFace();
  show(summon);
}

function replay() {
  index = 0;
  updateProgress();
  resetCardFace();
  show(cover);
}

startBtn.addEventListener("click", startPool);
drawBtn.addEventListener("click", draw);
nextBtn.addEventListener("click", continueFlow);
replayBtn.addEventListener("click", replay);

updateProgress();
