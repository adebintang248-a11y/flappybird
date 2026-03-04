const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let bird = {
  x: 50,
  y: 150,
  width: 20,
  height: 20,
  gravity: 0.6,
  lift: -12,
  velocity: 0
};

let pipes = [];
let frame = 0;
let score = 0;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height) {
    bird.y = canvas.height - bird.height;
    bird.velocity = 0;
  }

  if (bird.y < 0) {
    bird.y = 0;
    bird.velocity = 0;
  }
}

function createPipe() {
  let gap = 120;
  let topHeight = Math.random() * 300 + 50;

  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: canvas.height - topHeight - gap,
    width: 40
  });
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  });
}

function updatePipes() {
  pipes.forEach(pipe => {
    pipe.x -= 2;

    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
    ) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }

    if (pipe.x + pipe.width === bird.x) {
      score++;
    }
  });

  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateBird();
  drawBird();

  if (frame % 90 === 0) {
    createPipe();
  }

  updatePipes();
  drawPipes();
  drawScore();

  frame++;
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", () => {
  bird.velocity += bird.lift;
});

gameLoop();
