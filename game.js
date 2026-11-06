const cells = Array.from(document.querySelectorAll(".game-cell"));
const status = document.querySelector("#game-status");
const resetButton = document.querySelector("#game-reset");

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill("");
let gameOver = false;
let aiThinking = false;
let aiTimeout;

function getWinner(state) {
  const line = winningLines.find(([a, b, c]) =>
    state[a] && state[a] === state[b] && state[b] === state[c],
  );
  return line ? state[line[0]] : null;
}

function renderBoard() {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    cell.disabled = gameOver || aiThinking || board[index] !== "";
    cell.setAttribute("aria-label", `Square ${index + 1}${board[index] ? `: ${board[index]}` : ""}`);
  });
}

function finishTurn() {
  const winner = getWinner(board);
  if (winner) {
    gameOver = true;
    status.textContent = winner === "X" ? "You win!" : "The AI wins!";
  } else if (board.every(Boolean)) {
    gameOver = true;
    status.textContent = "It's a draw!";
  } else {
    status.textContent = "Your turn (X)";
  }
  renderBoard();
}

function findBestMove() {
  let bestScore = -Infinity;
  let bestMove = -1;

  function scorePosition(isAiTurn, depth) {
    const winner = getWinner(board);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (board.every(Boolean)) return 0;

    let best = isAiTurn ? -Infinity : Infinity;
    for (let index = 0; index < board.length; index++) {
      if (board[index]) continue;
      board[index] = isAiTurn ? "O" : "X";
      const score = scorePosition(!isAiTurn, depth + 1);
      board[index] = "";
      best = isAiTurn ? Math.max(best, score) : Math.min(best, score);
    }
    return best;
  }

  for (let index = 0; index < board.length; index++) {
    if (board[index]) continue;
    board[index] = "O";
    const score = scorePosition(false, 0);
    board[index] = "";
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }
  return bestMove;
}

function resetGame() {
  clearTimeout(aiTimeout);
  board = Array(9).fill("");
  gameOver = false;
  aiThinking = false;
  status.textContent = "Your turn (X)";
  renderBoard();
}

function handleCellClick(event) {
  const index = cells.indexOf(event.currentTarget);
  if (gameOver || aiThinking || board[index]) return;

  board[index] = "X";
  if (getWinner(board) || board.every(Boolean)) {
    finishTurn();
    return;
  }

  aiThinking = true;
  status.textContent = "The AI is thinking…";
  renderBoard();
  aiTimeout = setTimeout(() => {
    const move = findBestMove();
    if (move !== -1) board[move] = "O";
    aiThinking = false;
    finishTurn();
  }, 300);
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
resetGame();

const snakeCanvas = document.querySelector("#snake-canvas");
const snakeStatus = document.querySelector("#snake-status");
const snakeReset = document.querySelector("#snake-reset");

if (snakeCanvas && snakeStatus && snakeReset) {
  const context = snakeCanvas.getContext("2d");
  const cellSize = 16;
  const columns = 20;
  const rows = 18;
  const colors = { background: "#0b1226", grid: "#131f3f", snake: "#5ad1ff", food: "#e8b64a", text: "#eef2fb" };
  snakeCanvas.width = columns * cellSize;
  snakeCanvas.height = rows * cellSize;

  let snake;
  let direction;
  let nextDirection;
  let food;
  let score;
  let snakeOver;
  let lastStep = 0;

  function placeFood() {
    const emptyCells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        if (!snake.some((segment) => segment.x === x && segment.y === y)) emptyCells.push({ x, y });
      }
    }
    food = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  function drawSnake() {
    context.fillStyle = colors.background;
    context.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    context.fillStyle = colors.grid;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        if ((x + y) % 2 === 0) context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    context.fillStyle = colors.food;
    context.fillRect(food.x * cellSize + 2, food.y * cellSize + 2, cellSize - 4, cellSize - 4);
    snake.forEach((segment, index) => {
      context.fillStyle = index === 0 ? colors.text : colors.snake;
      context.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
    });

    context.fillStyle = colors.text;
    context.font = "bold 14px monospace";
    context.textAlign = "left";
    context.fillText(`SCORE ${score}`, 8, 20);

    if (snakeOver) {
      context.fillStyle = colors.snake;
      context.fillRect(0, snakeCanvas.height / 2 - 30, snakeCanvas.width, 60);
      context.fillStyle = colors.background;
      context.textAlign = "center";
      context.font = "bold 20px monospace";
      context.fillText("GAME OVER", snakeCanvas.width / 2, snakeCanvas.height / 2 - 4);
      context.font = "12px monospace";
      context.fillText("Press restart to play again", snakeCanvas.width / 2, snakeCanvas.height / 2 + 18);
    }
  }

  function resetSnake() {
    snake = [{ x: 9, y: 9 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    snakeOver = false;
    snakeStatus.textContent = "Score: 0. Use arrow keys, WASD, or swipe.";
    placeFood();
    drawSnake();
  }

  function setSnakeDirection(key) {
    const directions = {
      ArrowUp: { x: 0, y: -1 },
      w: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      s: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      a: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      d: { x: 1, y: 0 },
    };
    const requested = directions[key] || directions[key.toLowerCase()];
    if (requested && direction.x + requested.x !== 0 && direction.y + requested.y !== 0) {
      nextDirection = requested;
    }
    return Boolean(requested);
  }

  snakeCanvas.addEventListener("keydown", (event) => {
    if (setSnakeDirection(event.key)) event.preventDefault();
  });
  snakeCanvas.addEventListener("click", () => snakeCanvas.focus());
  snakeReset.addEventListener("click", resetSnake);

  let touchStart = null;
  snakeCanvas.addEventListener("touchstart", (event) => {
    touchStart = event.touches[0];
  }, { passive: true });
  snakeCanvas.addEventListener("touchmove", (event) => {
    if (!touchStart) return;
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStart.clientX;
    const deltaY = touch.clientY - touchStart.clientY;
    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 12) return;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setSnakeDirection(deltaX > 0 ? "ArrowRight" : "ArrowLeft");
    } else {
      setSnakeDirection(deltaY > 0 ? "ArrowDown" : "ArrowUp");
    }
    touchStart = touch;
  }, { passive: true });
  snakeCanvas.addEventListener("touchend", () => {
    touchStart = null;
  });

  function updateSnake(timestamp) {
    if (!snakeOver && timestamp - lastStep >= 140) {
      lastStep = timestamp;
      direction = nextDirection;
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
      const ateFood = head.x === food.x && head.y === food.y;
      const collisionBody = ateFood ? snake : snake.slice(0, -1);
      if (
        head.x < 0 || head.y < 0 || head.x >= columns || head.y >= rows ||
        collisionBody.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        snakeOver = true;
        snakeStatus.textContent = `Game over. Final score: ${score}. Press restart to play again.`;
      } else {
        snake.unshift(head);
        if (ateFood) {
          score += 10;
          placeFood();
          snakeStatus.textContent = `Score: ${score}. Use arrow keys, WASD, or swipe.`;
        } else {
          snake.pop();
        }
      }
      drawSnake();
    }
    requestAnimationFrame(updateSnake);
  }

  resetSnake();
  requestAnimationFrame(updateSnake);
}

const breakoutCanvas = document.querySelector("#breakout-canvas");
const breakoutStatus = document.querySelector("#breakout-status");
const breakoutReset = document.querySelector("#breakout-reset");

if (breakoutCanvas && breakoutStatus && breakoutReset) {
  const context = breakoutCanvas.getContext("2d");
  const width = 640;
  const height = 400;
  const columns = 8;
  const rows = 5;
  breakoutCanvas.width = width;
  breakoutCanvas.height = height;

  let paddle;
  let ball;
  let bricks;
  let score;
  let lives;
  let gameOver;
  let gameWon;
  const keys = new Set();

  function buildBricks() {
    const brickWidth = width / (columns + 1);
    const brickHeight = 24;
    const offsetX = (width - brickWidth * columns) / 2;
    const palette = ["#ff2b2b", "#ff8c00", "#ffe600", "#38d430", "#2b8cff"];
    bricks = [];
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        bricks.push({
          x: offsetX + column * brickWidth,
          y: 60 + row * (brickHeight + 6),
          width: brickWidth - 6,
          height: brickHeight,
          color: palette[row],
        });
      }
    }
  }

  function resetBall() {
    paddle.x = width / 2 - paddle.width / 2;
    paddle.y = height - 40;
    ball.x = width / 2;
    ball.y = paddle.y - 20;
    ball.vx = 4 * (Math.random() < 0.5 ? -1 : 1);
    ball.vy = -4;
  }

  function startBreakout() {
    score = 0;
    lives = 3;
    gameOver = false;
    gameWon = false;
    paddle = { x: 0, y: 0, width: 94, height: 12 };
    ball = { x: 0, y: 0, vx: 4, vy: -4, radius: 6 };
    buildBricks();
    resetBall();
    breakoutStatus.textContent = "Move your mouse, touch, or use the arrow keys to control the paddle.";
  }

  function movePaddle(clientX) {
    const bounds = breakoutCanvas.getBoundingClientRect();
    const pointerX = (clientX - bounds.left) * width / bounds.width;
    paddle.x = Math.max(0, Math.min(width - paddle.width, pointerX - paddle.width / 2));
  }

  breakoutCanvas.addEventListener("pointermove", (event) => {
    movePaddle(event.clientX);
  });
  breakoutCanvas.addEventListener("pointerdown", (event) => {
    breakoutCanvas.focus();
    if (gameOver) {
      startBreakout();
    } else {
      movePaddle(event.clientX);
    }
  });
  breakoutReset.addEventListener("click", startBreakout);
  breakoutCanvas.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight", "a", "A", "d", "D"].includes(event.key)) {
      event.preventDefault();
      keys.add(event.key.toLowerCase());
    }
  });
  breakoutCanvas.addEventListener("keyup", (event) => {
    keys.delete(event.key.toLowerCase());
  });
  breakoutCanvas.addEventListener("blur", () => keys.clear());

  function drawBreakout() {
    context.fillStyle = "#0b1226";
    context.fillRect(0, 0, width, height);
    for (const brick of bricks) {
      context.fillStyle = brick.color;
      context.fillRect(brick.x, brick.y, brick.width, brick.height);
    }

    context.fillStyle = "#eef2fb";
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();

    context.font = "16px monospace";
    context.textAlign = "left";
    context.fillText(`SCORE ${score}`, 14, 26);
    context.textAlign = "right";
    context.fillText(`LIVES ${lives}`, width - 14, 26);

    if (gameOver) {
      context.textAlign = "center";
      context.font = "bold 28px monospace";
      context.fillStyle = "#ffe600";
      context.fillText(gameWon ? "YOU WIN!" : "GAME OVER", width / 2, height / 2);
      context.font = "14px monospace";
      context.fillStyle = "#eef2fb";
      context.fillText("Click or press restart to play again", width / 2, height / 2 + 28);
    }
  }

  function updateBreakout(timestamp) {
    const frameScale = Math.min((timestamp - (updateBreakout.lastTime || timestamp)) / 16.67, 2);
    updateBreakout.lastTime = timestamp;

    if (!gameOver) {
      if (keys.has("arrowleft") || keys.has("a")) paddle.x -= 8 * frameScale;
      if (keys.has("arrowright") || keys.has("d")) paddle.x += 8 * frameScale;
      paddle.x = Math.max(0, Math.min(width - paddle.width, paddle.x));

      const previousY = ball.y;
      ball.x += ball.vx * frameScale;
      ball.y += ball.vy * frameScale;

      if (ball.x - ball.radius < 0 || ball.x + ball.radius > width) ball.vx *= -1;
      if (ball.y - ball.radius < 0) ball.vy *= -1;
      if (
        ball.vy > 0 && previousY + ball.radius <= paddle.y &&
        ball.y + ball.radius >= paddle.y &&
        ball.x > paddle.x && ball.x < paddle.x + paddle.width
      ) {
        ball.y = paddle.y - ball.radius;
        ball.vy *= -1;
        ball.vx += (ball.x - (paddle.x + paddle.width / 2)) * 0.05;
      }

      const hitBrick = bricks.findIndex((brick) =>
        ball.x > brick.x && ball.x < brick.x + brick.width &&
        ball.y - ball.radius < brick.y + brick.height &&
        ball.y + ball.radius > brick.y,
      );
      if (hitBrick !== -1) {
        bricks.splice(hitBrick, 1);
        ball.vy *= -1;
        score += 10;
        breakoutStatus.textContent = `Score: ${score}. Lives: ${lives}. Keep the ball in play!`;
      }

      if (ball.y - ball.radius > height) {
        lives--;
        if (lives === 0) {
          gameOver = true;
          breakoutStatus.textContent = `Game over. Score: ${score}. Press restart to play again.`;
        } else {
          resetBall();
          breakoutStatus.textContent = `Score: ${score}. Lives: ${lives}. Keep the ball in play!`;
        }
      }
      if (bricks.length === 0) {
        gameOver = true;
        gameWon = true;
        breakoutStatus.textContent = `You win! Final score: ${score}. Press restart to play again.`;
      }
    }

    drawBreakout();
    requestAnimationFrame(updateBreakout);
  }

  startBreakout();
  requestAnimationFrame(updateBreakout);
}

const shooterCanvas = document.querySelector("#shooter-canvas");
const shooterStatus = document.querySelector("#shooter-status");
const shooterReset = document.querySelector("#shooter-reset");

if (shooterCanvas && shooterStatus && shooterReset) {
  const context = shooterCanvas.getContext("2d");
  const width = 640;
  const height = 480;
  shooterCanvas.width = width;
  shooterCanvas.height = height;

  const keys = new Set();
  let player;
  let enemies;
  let bullets;
  let particles;
  let score;
  let gameOver;
  let spawnTimer;
  let elapsed;
  let aimX = width / 2;
  let aimY = height / 2;
  let shooting = false;

  function resetShooter() {
    player = { x: width / 2, y: height / 2, radius: 14, health: 5, cooldown: 0 };
    enemies = [];
    bullets = [];
    particles = [];
    score = 0;
    gameOver = false;
    spawnTimer = 0;
    elapsed = 0;
    shooterStatus.textContent = "Move with WASD or arrow keys. Hold the mouse or touch to fire.";
  }

  function setAim(clientX, clientY) {
    const bounds = shooterCanvas.getBoundingClientRect();
    aimX = (clientX - bounds.left) * width / bounds.width;
    aimY = (clientY - bounds.top) * height / bounds.height;
  }

  function spawnEnemy() {
    const edge = Math.floor(Math.random() * 4);
    let x;
    let y;
    if (edge === 0) { x = Math.random() * width; y = -20; }
    else if (edge === 1) { x = width + 20; y = Math.random() * height; }
    else if (edge === 2) { x = Math.random() * width; y = height + 20; }
    else { x = -20; y = Math.random() * height; }

    const heavy = Math.random() < 0.25;
    enemies.push({
      x, y,
      radius: heavy ? 18 : 12,
      health: heavy ? 3 : 1,
      speed: heavy ? 0.9 : 1.5,
      heavy,
    });
  }

  function createBurst(x, y, hue, count) {
    for (let index = 0; index < count; index++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 24,
        hue,
      });
    }
  }

  function drawShooter() {
    context.fillStyle = "#0b1226";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "rgba(90,209,255,0.12)";
    context.lineWidth = 1;
    for (let x = 0; x < width; x += 48) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
    for (let y = 0; y < height; y += 48) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    for (const particle of particles) {
      context.globalAlpha = Math.max(0, particle.life / 24);
      context.fillStyle = `hsl(${particle.hue},90%,60%)`;
      context.fillRect(particle.x - 2, particle.y - 2, 4, 4);
    }
    context.globalAlpha = 1;

    context.fillStyle = "#f6d68a";
    for (const bullet of bullets) {
      context.beginPath();
      context.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
      context.fill();
    }

    for (const enemy of enemies) {
      context.strokeStyle = enemy.heavy ? "#f87171" : "#5ad1ff";
      context.lineWidth = 2.5;
      context.beginPath();
      context.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
      context.stroke();
      context.fillStyle = enemy.heavy ? "rgba(248,113,113,0.25)" : "rgba(90,209,255,0.22)";
      context.fill();
    }

    context.save();
    context.translate(player.x, player.y);
    context.rotate(Math.atan2(aimY - player.y, aimX - player.x));
    context.fillStyle = "#e8b64a";
    context.beginPath();
    context.moveTo(18, 0);
    context.lineTo(-12, -12);
    context.lineTo(-6, 0);
    context.lineTo(-12, 12);
    context.closePath();
    context.fill();
    context.restore();

    context.strokeStyle = "rgba(232,182,74,0.6)";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    context.stroke();
    context.strokeStyle = "rgba(238,242,251,0.6)";
    context.beginPath();
    context.arc(aimX, aimY, 10, 0, Math.PI * 2);
    context.stroke();

    context.fillStyle = "#eef2fb";
    context.font = "bold 18px sans-serif";
    context.textAlign = "left";
    context.fillText(`SCORE ${score}`, 18, 32);
    for (let index = 0; index < 5; index++) {
      context.fillStyle = index < player.health ? "#e8b64a" : "rgba(232,182,74,0.2)";
      context.fillRect(18 + index * 22, 44, 16, 8);
    }

    if (gameOver) {
      context.fillStyle = "rgba(2,10,6,0.82)";
      context.fillRect(0, 0, width, height);
      context.textAlign = "center";
      context.fillStyle = "#f87171";
      context.font = "bold 34px sans-serif";
      context.fillText("MISSION FAILED", width / 2, height / 2 - 10);
      context.fillStyle = "#e8b64a";
      context.font = "16px monospace";
      context.fillText(`Score ${score}`, width / 2, height / 2 + 26);
      context.fillStyle = "#eef2fb";
      context.font = "14px monospace";
      context.fillText("Tap or redeploy to try again", width / 2, height / 2 + 56);
    }
  }

  function updateShooter(timestamp) {
    const frameScale = Math.min((timestamp - (updateShooter.lastTime || timestamp)) / 16.67, 2);
    updateShooter.lastTime = timestamp;

    if (!gameOver) {
      elapsed += frameScale;
      let moveX = 0;
      let moveY = 0;
      if (keys.has("arrowleft") || keys.has("a")) moveX--;
      if (keys.has("arrowright") || keys.has("d")) moveX++;
      if (keys.has("arrowup") || keys.has("w")) moveY--;
      if (keys.has("arrowdown") || keys.has("s")) moveY++;
      const moveLength = Math.hypot(moveX, moveY) || 1;
      player.x += moveX / moveLength * 4.2 * frameScale;
      player.y += moveY / moveLength * 4.2 * frameScale;
      player.x = Math.max(16, Math.min(width - 16, player.x));
      player.y = Math.max(16, Math.min(height - 16, player.y));

      if (player.cooldown > 0) player.cooldown -= frameScale;
      if (shooting && player.cooldown <= 0) {
        const angle = Math.atan2(aimY - player.y, aimX - player.x);
        bullets.push({
          x: player.x,
          y: player.y,
          vx: Math.cos(angle) * 9,
          vy: Math.sin(angle) * 9,
          life: 70,
        });
        player.cooldown = 8;
      }

      spawnTimer += frameScale;
      const spawnRate = Math.max(22, 70 - elapsed * 0.05);
      if (spawnTimer > spawnRate) {
        spawnTimer = 0;
        spawnEnemy();
      }

      for (let index = bullets.length - 1; index >= 0; index--) {
        const bullet = bullets[index];
        bullet.x += bullet.vx * frameScale;
        bullet.y += bullet.vy * frameScale;
        bullet.life -= frameScale;
        if (
          bullet.life <= 0 || bullet.x < -20 || bullet.x > width + 20 ||
          bullet.y < -20 || bullet.y > height + 20
        ) {
          bullets.splice(index, 1);
          continue;
        }
        for (const enemy of enemies) {
          if (Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) < enemy.radius) {
            enemy.health--;
            bullets.splice(index, 1);
            createBurst(bullet.x, bullet.y, 150, 4);
            break;
          }
        }
      }

      for (let index = enemies.length - 1; index >= 0; index--) {
        const enemy = enemies[index];
        const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
        enemy.x += Math.cos(angle) * enemy.speed * frameScale;
        enemy.y += Math.sin(angle) * enemy.speed * frameScale;
        if (enemy.health <= 0) {
          enemies.splice(index, 1);
          score += enemy.heavy ? 50 : 20;
          createBurst(enemy.x, enemy.y, 140, 10);
          shooterStatus.textContent = `Score: ${score}. Health: ${player.health} / 5. Keep moving and firing!`;
          continue;
        }
        if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < enemy.radius + player.radius) {
          enemies.splice(index, 1);
          createBurst(enemy.x, enemy.y, 0, 12);
          player.health--;
          shooterStatus.textContent = `Score: ${score}. Health: ${player.health} / 5. Keep moving and firing!`;
          if (player.health <= 0) {
            gameOver = true;
            shooterStatus.textContent = `Mission failed. Final score: ${score}. Redeploy to try again.`;
          }
        }
      }
    }

    for (let index = particles.length - 1; index >= 0; index--) {
      const particle = particles[index];
      particle.x += particle.vx * frameScale;
      particle.y += particle.vy * frameScale;
      particle.vx *= 0.94;
      particle.vy *= 0.94;
      particle.life -= frameScale;
      if (particle.life <= 0) particles.splice(index, 1);
    }

    drawShooter();
    requestAnimationFrame(updateShooter);
  }

  shooterCanvas.addEventListener("pointermove", (event) => {
    setAim(event.clientX, event.clientY);
  });
  shooterCanvas.addEventListener("pointerdown", (event) => {
    shooterCanvas.focus();
    setAim(event.clientX, event.clientY);
    if (gameOver) {
      resetShooter();
      return;
    }
    shooting = true;
    shooterCanvas.setPointerCapture(event.pointerId);
  });
  shooterCanvas.addEventListener("pointerup", () => {
    shooting = false;
  });
  shooterCanvas.addEventListener("pointercancel", () => {
    shooting = false;
  });
  shooterCanvas.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (["arrowleft", "arrowright", "arrowup", "arrowdown", "a", "d", "w", "s", " "].includes(key)) {
      event.preventDefault();
      if (key === " ") shooting = true;
      else keys.add(key);
    }
  });
  shooterCanvas.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    keys.delete(key);
    if (key === " ") shooting = false;
  });
  shooterCanvas.addEventListener("blur", () => {
    keys.clear();
    shooting = false;
  });
  shooterReset.addEventListener("click", resetShooter);

  resetShooter();
  requestAnimationFrame(updateShooter);
}
