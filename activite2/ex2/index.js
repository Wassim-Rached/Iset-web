//
const btn_start = document.getElementById("btn-start");
const btn_resume = document.getElementById("btn-resume");
const btn_pause = document.getElementById("btn-pause");

//
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

//
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//
var hits = 0;
var misses = 0;
var TIMER = 2000;
var currentTarget;
var gameInterval;
var isGamePaused = true;

function resetVars() {
  hits = 0;
  misses = 0;
  TIMER = 2000;
  currentTarget;
  gameInterval;
  isGamePaused = true;
}

//
const TAGET_WIDTH = 60;
const TAGET_HEIGHT = 60;

function init() {
  createPopOut("Spacebar to Pause/Resume", "info");
  resetVars();
  startTheGame();
}

document.body.onload = init;

//
class Target {
  x;
  y;
  width;
  height;
  type;
  fillStyle;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.type = getShapeType();
    this.size = getShapeSize();
    this.fillStyle = getShapeColor();

    this.x = Target.getRandomCanvasPositionX(this.width);
    this.y = Target.getRandomCanvasPositionY(this.height);
  }

  drawTarget() {
    switch (this.type) {
      case "rectangle":
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.fill();
        break;

      case "circle":
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(
          this.x + this.size / 2,
          this.y + this.size / 2,
          this.size / 2,
          0,
          2 * Math.PI
        );
        ctx.fill();
        break;

      case "triangle":
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.moveTo(this.x + this.size / 2, this.y);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.closePath();
        ctx.fill();
        break;

      default:
        break;
    }
  }
  static getRandomCanvasPositionX(width) {
    return Math.random() * (canvas.width - width);
  }

  static getRandomCanvasPositionY(height) {
    return Math.random() * (canvas.height - height);
  }

  positionIsInsideTarget(
    point_relative_to_canvas_x,
    point_relative_to_canvas_y
  ) {
    return pointInsideRectangel(
      point_relative_to_canvas_x,
      point_relative_to_canvas_y,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

//
function startTheGame() {
  console.log("new game created");
  resetVars();
  isGamePaused = false;

  hits = 0;
  misses = 0;
  document.getElementById("hits-counter").innerHTML = hits;
  document.getElementById("misses-counter").innerHTML = misses;

  startSpawningTargets();
}

btn_start.onclick = startTheGame;

function startSpawningTargets() {
  clearCanvas(ctx);
  if (gameInterval) clearInterval(gameInterval);
  currentTarget = new Target(TAGET_WIDTH, TAGET_HEIGHT);
  currentTarget.drawTarget();

  gameInterval = setInterval(() => {
    if (isGamePaused) return;
    clearCanvas(ctx);
    currentTarget = new Target(TAGET_WIDTH, TAGET_HEIGHT);
    currentTarget.drawTarget();
  }, TIMER);
}

//
function pauseTheGame() {
  pauseCanvasScreen();
  btn_pause.disabled = true;
  btn_resume.disabled = false;
  isGamePaused = true;
}
btn_pause.onclick = pauseTheGame;

//
function resumeTheGame() {
  resumeCanvasScreen();
  btn_pause.disabled = false;
  btn_resume.disabled = true;
  isGamePaused = false;
}
btn_resume.onclick = resumeTheGame;

canvas.addEventListener("click", (event) => {
  if (isGamePaused) return;
  const rect = canvas.getBoundingClientRect();
  const point_x = event.clientX - rect.left;
  const point_y = event.clientY - rect.top;

  if (currentTarget.positionIsInsideTarget(point_x, point_y)) {
    createPopOut("you just hit the target", "success");
    document.getElementById("hits-counter").innerHTML = ++hits;
    startSpawningTargets();
  } else {
    createPopOut("you just missied the target", "danger");
    document.getElementById("misses-counter").innerHTML = ++misses;
  }
});

document.onkeydown = (event) => {
  if (event.keyCode === 32) {
    if (isGamePaused) {
      resumeTheGame();
    } else {
      pauseTheGame();
    }
  }
};
