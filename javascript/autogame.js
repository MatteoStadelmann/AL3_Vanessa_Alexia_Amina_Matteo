// javascript/autogame.js

const auto = document.getElementById("auto");
const katze = document.getElementById("katze");
const score = document.getElementById("score");
const jumpSound = document.getElementById("jumpSound");
const startBtn = document.getElementById("startBtn");

let isPlaying = false;
let scoreInterval;
let spawnTimeout;

function jump() {
  if (!isPlaying) return;
  auto.classList.add("jump-animation");
  jumpSound.currentTime = 0;
  jumpSound.play();
  setTimeout(() => {
    auto.classList.remove("jump-animation");
  }, 600);
}

document.addEventListener("keydown", (event) => {
  if (!isPlaying) return;
  if (event.code === "Space" || event.code === "ArrowUp") {
    if (!auto.classList.contains("jump-animation")) {
      jump();
    }
  }
});

function spawnKatze() {
  if (!isPlaying) return;

  // Alte Zeitgeber stoppen, falls noch einer lief
  clearTimeout(spawnTimeout);

  // Reset & Reflow
  katze.style.animation = "none";
  katze.offsetWidth;

  // Startposition und Sichtbarkeit
  katze.style.left = "100%";
  katze.style.bottom = "12%";
  katze.style.display = "block";

  // Zufällige Laufzeit zwischen 1s und 2.5s
  const speed = Math.random() * 1.5 + 1;
  katze.style.animation = `katze ${speed}s linear`;

  // Nach Ende der CSS-Animation (speed Sekunden):
  spawnTimeout = setTimeout(() => {
    if (!isPlaying) {
      katze.style.display = "none";
      return;
    }

    // Katze ausblenden
    katze.style.display = "none";
    katze.style.animation = "none";

    // Nächste Katze nach 0.5–2s
    const nextDelay = Math.random() * 1500 + 500;
    spawnTimeout = setTimeout(spawnKatze, nextDelay);

    // In 30% der Fälle innerhalb 0.2–0.8s eine zweite Katze spawnen
    if (Math.random() < 0.3) {
      const extraDelay = Math.random() * 600 + 200;
      setTimeout(spawnKatze, extraDelay);
    }
  }, speed * 1000);
}

startBtn.addEventListener("click", () => {
  if (!isPlaying) {
    // Spiel starten
    isPlaying = true;
    startBtn.textContent = "Spiel stoppen";
    score.innerText = 0;

    spawnKatze();

    scoreInterval = setInterval(() => {
      if (!isPlaying) return;

      const autoRect = auto.getBoundingClientRect();
      const katzeRect = katze.getBoundingClientRect();

      // Katze ausblenden, wenn sie vollständig links rausgelaufen ist
      if (katzeRect.right < autoRect.left - 20) {
        katze.style.display = "none";
      }

      // Kollision: Auto trifft Katze und Auto nicht springen
      if (
        katze.style.display === "block" &&
        katzeRect.left < autoRect.right &&
        katzeRect.right > autoRect.left &&
        !auto.classList.contains("jump-animation")
      ) {
        alert("Game Over!");
        isPlaying = false;
        clearInterval(scoreInterval);
        clearTimeout(spawnTimeout);
        katze.style.display = "none";
        startBtn.textContent = "Spiel starten";
        score.innerText = 0;
        return;
      }

      score.innerText++;
    }, 50);
  } else {
    // Spiel stoppen
    isPlaying = false;
    clearInterval(scoreInterval);
    clearTimeout(spawnTimeout);
    katze.style.display = "none";
    startBtn.textContent = "Spiel starten";
    score.innerText = 0;
  }
});