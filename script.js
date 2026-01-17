/* ===============================
   BASIC SITE LOGIC (UNCHANGED)
================================ */

function checkPassword() {
  const input = document.getElementById("heartPassword").value.trim();
  const message = document.getElementById("passwordMessage");

  if (input.toLowerCase() === "tisha") {
    message.textContent = "💗 That’s right. My heart is yours.";
    message.style.color = "#e88aa9";
  } else {
    message.textContent =
      "Try typing the name of the prettiest girl in the world 🌻";
  }
}

function toggleStory(element) {
  const message = element.querySelector(".story-message");

  if (element.classList.contains("active")) {
    message.style.height = "0px";
    element.classList.remove("active");
  } else {
    message.style.height = message.scrollHeight + "px";
    element.classList.add("active");
  }
}

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function closeMenu() {
  document.getElementById("mobileMenu").style.display = "none";
}

function openLetter(id) {
  const modal = document.getElementById("letterModal");
  const title = document.getElementById("letterTitle");
  const subtitle = document.getElementById("letterSubtitle");
  const content = document.getElementById("letterContent");

  if (id === 1) {
    title.textContent = "Me First";
    subtitle.textContent = "Why You're Special";
    content.innerHTML =
      "My dearest Tishuuu,<br><br>" +
      "You are like a sunflower, a literal sunflower. You bring happiness and love everywhere you go. You might not believe it, but your presence really does light up a room.<br><br>" +
      "You are so focused on your goals and have such a clear view of what’s ultimately important, which is a very big thing. I believe it is only people like this that truly succeed in life.<br><br>" +
      "You have a special gift, Tisha. You might not notice it, but I do. You love what you do and you do what it takes to accomplish it. Just trust yourself a little more.<br><br>" +
      "I believe from the bottom of my heart that you can accomplish anything you want to do.<br><br>" +
      "<strong>— HET</strong>";
  }

  if (id === 2) {
    title.textContent = "Then Me";
    subtitle.textContent = "What You Mean to Me";
    content.innerHTML =
      "My sweetheart Tisha,<br><br>" +
      "I may look strong to the world, but sometimes I become a crybaby and come sobbing to you. I wasn’t like this before. I didn’t have someone in front of whom I could truly break down.<br><br>" +
      "Then you came along. Now whatever happens, I know there’s someone who will listen to me, who won’t belittle my problems, who won’t brush them off — even when she has a million problems of her own.<br><br>" +
      "You mean the world to me. You understand me better than anyone else, and that is something I will never take for granted.<br><br>" +
      "<strong>— HET</strong>";
  }

  if (id === 3) {
    title.textContent = "Lastly Me";
    subtitle.textContent = "My Wishes for You";
    content.innerHTML =
      "For this year and for all the years to come,<br><br>" +
      "I wish that with each passing day, you move closer to your dreams. I wish your friendships stay strong forever. I wish you find happiness wherever you are and in whatever you do.<br><br>" +
      "I wish we end up together forever. I wish every wish of yours comes true. And I wish that beautiful, mesmerizing smile never leaves your face.<br><br>" +
      "No matter where life takes us, I will always be cheering for you — silently, proudly, endlessly.<br><br>" +
      "<strong>— HET</strong>";
  }

  modal.classList.add("active");
}

function closeLetter() {
  document.getElementById("letterModal").classList.remove("active");
}


/* ===============================
   MEMORY MODAL
================================ */

function openMemory(card) {
  document.getElementById("modalMemoryImage").src =
    card.querySelector("img").src;
  document.getElementById("memoryModal").style.display = "flex";
}

function closeMemory() {
  document.getElementById("memoryModal").style.display = "none";
}

/* ===============================
   MIRROR IMAGES
================================ */

const mirrorImages = [
  "https://i.ibb.co/fdF1TZgM/Whats-App-Image-2026-01-16-at-13-54-19-c21d7f1c.jpg",
  "https://i.ibb.co/LfYVqHn/Whats-App-Image-2026-01-16-at-13-53-07-b4ca0ce9.jpg",
  "https://i.ibb.co/JjP8b0jH/Whats-App-Image-2026-01-16-at-13-52-58-556241be.jpg",
  "https://i.ibb.co/ccFHPHwW/Whats-App-Image-2026-01-16-at-13-59-37-0d75a76f.jpg",
  "https://i.ibb.co/vx8gMCJK/Whats-App-Image-2026-01-16-at-14-09-28-9503b74c.jpg"
];

let mirrorIndex = 0;
function nextMirrorImage() {
  mirrorIndex = (mirrorIndex + 1) % mirrorImages.length;
  document.getElementById("mirrorImage").src = mirrorImages[mirrorIndex];
}

/* ===============================
   20 REASONS
================================ */

function flipCard(card) {
  card.classList.toggle("flipped");
}

let loveCount = 0;
function incrementLove() {
  loveCount++;
  document.getElementById("loveCount").textContent = loveCount;
}

const compliments = [
  "Every moment with you feels like peace.",
  "You are effortlessly beautiful.",
  "You make love feel safe.",
  "You are my favorite person.",
  "Loving you feels natural."
];

function revealCompliment() {
  document.getElementById("complimentText").textContent =
    compliments[Math.floor(Math.random() * compliments.length)];
}

/* ===============================
   🧠 DOODLE ENGINE — FINAL FIX
================================ */

/* Canvas setup */
const canvas = document.getElementById("doodleCanvas");
const ctx = canvas.getContext("2d");

/* OFFSCREEN layer for drawing */
const drawingLayer = document.createElement("canvas");
const drawingCtx = drawingLayer.getContext("2d");

/* State */
let drawing = false;
let currentColor = "#f6b1c8";
let brushSize = 4;
let currentTool = "pen";
let stickers = [];
let selectedSticker = null;
let draggingSticker = null;

ctx.lineCap = "round";
drawingCtx.lineCap = "round";

/* ===============================
   Resize canvas (NO DOUBLE SCALE)
================================ */

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  drawingLayer.width = canvas.width;
  drawingLayer.height = canvas.height;

  redraw();
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ===============================
   Accurate pointer position
================================ */

function getPos(e) {
  const rect = canvas.getBoundingClientRect();

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}

/* ===============================
   Events
================================ */

canvas.addEventListener("mousedown", start);
canvas.addEventListener("touchstart", start);

canvas.addEventListener("mousemove", move);
canvas.addEventListener("touchmove", move);

canvas.addEventListener("mouseup", stop);
canvas.addEventListener("mouseleave", stop);
canvas.addEventListener("touchend", stop);

/* ===============================
   Drawing logic
================================ */

function start(e) {
  e.preventDefault();
  const pos = getPos(e);

  // Drag sticker
  for (let i = stickers.length - 1; i >= 0; i--) {
    const s = stickers[i];
    if (
      pos.x > s.x - 24 &&
      pos.x < s.x + 24 &&
      pos.y > s.y - 24 &&
      pos.y < s.y + 24
    ) {
      draggingSticker = s;
      return;
    }
  }

  // Place sticker
  if (selectedSticker) {
    stickers.push({ text: selectedSticker, x: pos.x, y: pos.y });
    selectedSticker = null;
    redraw();
    return;
  }

  drawing = true;
  drawingCtx.beginPath();
  drawingCtx.moveTo(pos.x, pos.y);
}

function move(e) {
  if (!drawing && !draggingSticker) return;
  e.preventDefault();

  const pos = getPos(e);

  if (draggingSticker) {
    draggingSticker.x = pos.x;
    draggingSticker.y = pos.y;
    redraw();
    return;
  }

  drawingCtx.strokeStyle =
    currentTool === "eraser" ? "#ffffff" : currentColor;

  drawingCtx.lineWidth = brushSize;
  drawingCtx.lineTo(pos.x, pos.y);
  drawingCtx.stroke();

  redraw();
}

function stop() {
  drawing = false;
  draggingSticker = null;
  drawingCtx.closePath();
}

/* ===============================
   Redraw EVERYTHING (FIXES BUG)
================================ */

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1️⃣ Draw saved drawing
  ctx.drawImage(drawingLayer, 0, 0);

  // 2️⃣ Commit current drawing
  drawingLayer.getContext("2d").drawImage(drawingLayer, 0, 0);

  // 3️⃣ Draw stickers
  stickers.forEach(s => {
    ctx.font = "32px serif";
    ctx.fillText(s.text, s.x - 12, s.y + 12);
  });
}

/* ===============================
   Controls
================================ */

document.querySelectorAll(".color").forEach(btn => {
  btn.style.background = btn.dataset.color;
  btn.onclick = () => {
    currentColor = btn.dataset.color;
    currentTool = "pen";
    selectedSticker = null;
  };
});

document.querySelectorAll(".sticker").forEach(btn => {
  btn.onclick = () => {
    selectedSticker = btn.dataset.sticker;
  };
});

document.getElementById("brushSize").oninput = e => {
  brushSize = e.target.value;
};

document.getElementById("penTool").onclick = () => {
  currentTool = "pen";
};

document.getElementById("eraserTool").onclick = () => {
  currentTool = "eraser";
};

document.getElementById("clearDoodle").onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawingCtx.clearRect(0, 0, drawingLayer.width, drawingLayer.height);
  stickers = [];
};

document.getElementById("saveDoodle").onclick = () => {
  const link = document.createElement("a");
  link.download = "my_doodle_for_you.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};
/* ===============================
   PUZZLE GAME LOGIC
   =============================== */

const tray = document.getElementById("puzzleTray");
const board = document.getElementById("puzzleBoard");

let selectedPiece = null;
const pieces = [];

// Create board slots
for (let i = 0; i < 9; i++) {
  const slot = document.createElement("div");
  slot.className = "puzzle-slot";
  slot.dataset.index = i;

  slot.onclick = () => {
    if (slot.firstChild) {
      tray.appendChild(slot.firstChild);
    }
  };

  board.appendChild(slot);
}

// Create pieces
for (let i = 0; i < 9; i++) {
  const piece = document.createElement("div");
  piece.className = "puzzle-piece";
  piece.dataset.index = i;

  const x = (i % 3) * -100;
  const y = Math.floor(i / 3) * -100;
  piece.style.backgroundPosition = `${x}px ${y}px`;

  piece.onclick = () => {
    selectedPiece = piece;
  };

  pieces.push(piece);
}

// Shuffle pieces
pieces.sort(() => Math.random() - 0.5);
pieces.forEach(p => tray.appendChild(p));

// Place piece
board.addEventListener("click", e => {
  if (!selectedPiece) return;
  if (e.target.classList.contains("puzzle-slot") && !e.target.firstChild) {
    e.target.appendChild(selectedPiece);
    selectedPiece = null;
  }
});

// Reset
function resetPuzzle() {
  document.querySelectorAll(".puzzle-slot").forEach(slot => {
    if (slot.firstChild) tray.appendChild(slot.firstChild);
  });
}
/* ===============================
   GLOBAL MOBILE TAP FEEDBACK
   =============================== */

const tapElements = document.querySelectorAll(
  ".story-item, .letter-card, .poem, .memory-card, .song-card, .reason-card, .puzzle-piece"
);

tapElements.forEach(el => {
  el.addEventListener("touchstart", () => {
    el.classList.add("tap-active");
  });

  el.addEventListener("touchend", () => {
    setTimeout(() => {
      el.classList.remove("tap-active");
    }, 150);
  });
});
/* ===============================
   MEMORY MATCH GAME LOGIC
================================ */

const memoryImages = [
  "https://i.ibb.co/6R2D5NDm/Whats-App-Image-2026-01-17-at-12-55-37-75c905d2.jpg",
  "https://i.ibb.co/TDhPvH5j/1768634817687.jpg",
  "https://i.ibb.co/BV0p97cv/1768634817692.jpg",
  "https://i.ibb.co/0VyN8gkP/Whats-App-Image-2026-01-17-at-13-01-05-e209e475.jpg"
];

// duplicate & shuffle
let memoryCards = [...memoryImages, ...memoryImages]
  .sort(() => Math.random() - 0.5);

const memoryGrid = document.getElementById("memoryGrid");

let firstCard = null;
let lockBoard = false;

function createMemoryGame() {
  memoryGrid.innerHTML = "";

  memoryCards.forEach(src => {
    const card = document.createElement("div");
    card.className = "memory-card";

    const inner = document.createElement("div");
    inner.className = "memory-inner";

    const front = document.createElement("div");
    front.className = "memory-front";
    front.textContent = "💗";

    const back = document.createElement("div");
    back.className = "memory-back";
    back.style.backgroundImage = `url(${src})`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    memoryGrid.appendChild(card);

    card.addEventListener("click", () => flipMemoryCard(card, src));
  });
}

function flipMemoryCard(card, src) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = { card, src };
    return;
  }

  if (firstCard.src === src) {
    card.classList.add("matched");
    firstCard.card.classList.add("matched");
    firstCard = null;
  } else {
    lockBoard = true;
    setTimeout(() => {
      card.classList.remove("flipped");
      firstCard.card.classList.remove("flipped");
      firstCard = null;
      lockBoard = false;
    }, 800);
  }
}

function resetMemoryGame() {
  memoryCards = [...memoryImages, ...memoryImages]
    .sort(() => Math.random() - 0.5);
  firstCard = null;
  lockBoard = false;
  createMemoryGame();
}

// INIT
createMemoryGame();
function makeItRain() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 3 + Math.random() * 2 + "s";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }
}

function toggleSecret() {
 
}
function toggleSecretNote() {
  document.getElementById("secretNote").classList.toggle("active");
}




