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

  clearTimeout(spawnTimeout);

  katze.style.animation = "none";
  katze.offsetWidth;

  katze.style.left = "100%";
  katze.style.bottom = "12%";
  katze.style.display = "block";

  const speed = Math.random() * 1.5 + 1;
  katze.style.animation = `katze ${speed}s linear`;

  spawnTimeout = setTimeout(() => {
    if (!isPlaying) {
      katze.style.display = "none";
      return;
    }

    katze.style.display = "none";
    katze.style.animation = "none";

    const nextDelay = Math.random() * 1500 + 500;
    spawnTimeout = setTimeout(spawnKatze, nextDelay);

    if (Math.random() < 0.3) {
      const extraDelay = Math.random() * 600 + 200;
      setTimeout(spawnKatze, extraDelay);
    }
  }, speed * 1000);
}

startBtn.addEventListener("click", () => {
  if (!isPlaying) {
    isPlaying = true;
    startBtn.textContent = "Spiel stoppen";
    score.innerText = 0;

    spawnKatze();

    scoreInterval = setInterval(() => {
      if (!isPlaying) return;

      const autoRect = auto.getBoundingClientRect();
      const katzeRect = katze.getBoundingClientRect();

      if (katzeRect.right < autoRect.left - 20) {
        katze.style.display = "none";
      }

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
    isPlaying = false;
    clearInterval(scoreInterval);
    clearTimeout(spawnTimeout);
    katze.style.display = "none";
    startBtn.textContent = "Spiel starten";
    score.innerText = 0;
  }
});