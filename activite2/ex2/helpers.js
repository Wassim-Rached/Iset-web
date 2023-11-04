const SHAPE_SIZES = [20, 40, 60];
const SHAPE_TYPES = ["rectangle", "circle", "triangle"];

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function pointInsideRectangel(
  point_x,
  point_y,
  rect_x,
  rect_y,
  rect_width,
  rect_height
) {
  return (
    // check from the top
    point_y >= rect_y &&
    // check from the right
    point_x <= rect_x + rect_width &&
    // check from the bottom
    point_y <= rect_y + rect_height &&
    // check from the left
    point_x >= rect_x
  );
}

function createPopOut(message, status) {
  const popOut = document.createElement("div");

  popOut.onmouseover = () => {
    popOut.remove();
  };

  popOut.classList.add("pop-out");
  popOut.innerHTML = message;
  switch (status) {
    case "success":
      popOut.classList.add("pop-out-success");
      break;

    case "danger":
      popOut.classList.add("pop-out-danger");
      break;

    case "info":
      popOut.classList.add("pop-out-info");
      break;

    default:
      return;
  }
  document.body.appendChild(popOut);
  setTimeout(() => {
    popOut.remove();
  }, 4000);
}

function pauseCanvasScreen() {
  const div = document.createElement("div");
  div.classList.add("pause-screen");
  div.innerHTML = "Game Paused";
  document.body.appendChild(div);
}

function resumeCanvasScreen() {
  const div = document.querySelector(".pause-screen");
  if (div) div.remove();
}

function getShapeSize() {
  const shape_size = document.getElementById("shape-size").value;
  if (shape_size == "random") {
    const randomIndex = Math.floor(Math.random() * SHAPE_SIZES.length);
    return SHAPE_SIZES[randomIndex];
  }
  return parseInt(shape_size);
}

function getShapeColor() {
  return document.getElementById("shape-color").value;
}

function getShapeType() {
  const shape_type = document.getElementById("shape-type").value;
  if (shape_type == "random") {
    const randomIndex = Math.floor(Math.random() * SHAPE_TYPES.length);
    return SHAPE_TYPES[randomIndex];
  }
  return shape_type;
}
