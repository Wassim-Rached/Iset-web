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
      document.body.appendChild(popOut);
      break;

    case "danger":
      popOut.classList.add("pop-out-danger");
      document.body.appendChild(popOut);
      break;

    default:
      break;
  }
  setTimeout(() => {
    popOut.remove();
  }, 2000);
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
  return document.getElementById("shape-size").value;
}

function getShapeColor() {
  return document.getElementById("shape-color").value;
}

function getShapeType() {
  return document.getElementById("shape-type").value;
}
