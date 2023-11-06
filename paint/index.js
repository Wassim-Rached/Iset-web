const moncanvas = document.getElementById("dessin");
const ctx = moncanvas.getContext("2d");

var en_dessin = false;
var form = "creuse";
var eraser_size = 20;

const shapes_trash = [];
const shapes = [];

const line_btn__dom = document.getElementById("line-btn");
const cercle_btn__dom = document.getElementById("cercle-btn");
const rectangle_btn__dom = document.getElementById("rectangle-btn");
const eraser_btn__dom = document.getElementById("eraser-btn");

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

moncanvas.onmouseup = function (e) {
  en_dessin = false;
};

function drawAllShapes() {
  ctx.clearRect(0, 0, moncanvas.width, moncanvas.height);

  shapes.forEach((shape) => {
    ctx.strokeStyle = shape.strokeStyle;
    ctx.fillStyle = shape.fillStyle;

    switch (shape.type) {
      case "line":
        ctx.lineWidth = shape.lineWidth;
        if (shape.move_to_x) {
          ctx.beginPath();
          ctx.moveTo(shape.move_to_x, shape.move_to_y);
        } else {
          ctx.lineTo(shape.x, shape.y);
          ctx.stroke();
        }
        break;

      case "circle":
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        if (shape.form == "fill") {
          ctx.fill();
        } else {
          ctx.stroke();
        }

        break;

      case "rectangle":
        if (shape.form == "fill") {
          ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        } else {
          ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
        break;

      case "eraser":
        ctx.clearRect(shape.x, shape.y, shape.size, shape.size);
        break;

      default:
        break;
    }
  });
}

function modifierCouleur(codeCouleur) {
  if (codeCouleur) {
    ctx.strokeStyle = codeCouleur;
    ctx.fillStyle = codeCouleur;
  }
}

line_btn__dom.addEventListener("click", (event) => {
  reset_moncanvas_events();

  moncanvas.onmousedown = (e) => {
    en_dessin = true;
    ctx.beginPath();

    move_to_x = e.offsetX;
    move_to_y = e.offsetY;

    // ctx.moveTo(move_to_x, move_to_y);
    shapes.push({
      type: "line",
      x: null,
      y: null,
      strokeStyle: ctx.strokeStyle,
      fillStyle: ctx.fillStyle,
      move_to_x: move_to_x,
      move_to_y: move_to_y,
      lineWidth: ctx.lineWidth,
    });

    drawAllShapes();
  };

  moncanvas.onmousemove = function (e) {
    if (en_dessin) {
      //   ctx.lineTo(e.offsetX, e.offsetY);
      //   ctx.stroke();

      shapes.push({
        type: "line",
        x: e.offsetX,
        y: e.offsetY,
        strokeStyle: ctx.strokeStyle,
        fillStyle: ctx.fillStyle,
        move_to_x: null,
        move_to_y: null,
        lineWidth: ctx.lineWidth,
      });

      drawAllShapes();
    }
  };
});

cercle_btn__dom.addEventListener("click", (event) => {
  reset_moncanvas_events();

  let startX = 0;
  let startY = 0;

  moncanvas.onmousedown = (e) => {
    en_dessin = true;
    ctx.beginPath();

    startX = e.offsetX;
    startY = e.offsetY;
  };

  moncanvas.onmouseup = (e) => {
    en_dessin = false;

    const endX = e.offsetX;
    const endY = e.offsetY;

    const radius = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );

    shapes.push({
      type: "circle",
      x: startX,
      y: startY,
      radius: radius,
      strokeStyle: ctx.strokeStyle,
      fillStyle: ctx.fillStyle,
      form: form,
    });

    drawAllShapes();

    // ctx.arc(startX, startY, radius, 0, 2 * Math.PI);

    // ctx.stroke();
  };

  moncanvas.onmousemove = (e) => {
    if (en_dessin) {
      //   ctx.clearRect(0, 0, moncanvas.width, moncanvas.height);

      const endX = e.offsetX;
      const endY = e.offsetY;
      const radius = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
      );

      shapes.pop();
      shapes.push({
        type: "circle",
        x: startX,
        y: startY,
        radius: radius,
        strokeStyle: ctx.strokeStyle,
        fillStyle: ctx.fillStyle,
        form: form,
      });
      drawAllShapes();

      //   ctx.beginPath();
      //   ctx.arc(startX, startY, radius, 0, 2 * Math.PI);

      //   ctx.stroke();
    }
  };
});

rectangle_btn__dom.addEventListener("click", (event) => {
  reset_moncanvas_events();

  let startX = 0;
  let startY = 0;

  moncanvas.onmousedown = (e) => {
    en_dessin = true;

    startX = e.offsetX;
    startY = e.offsetY;
  };

  moncanvas.onmouseup = (e) => {
    en_dessin = false;

    const endX = e.offsetX;
    const endY = e.offsetY;
    const width = endX - startX;
    const height = endY - startY;

    shapes.push({
      type: "rectangle",
      x: startX,
      y: startY,
      width: width,
      height,
      strokeStyle: ctx.strokeStyle,
      fillStyle: ctx.fillStyle,
      form: form,
    });

    drawAllShapes();

    // ctx.strokeRect(startX, startY, width, height);
  };

  moncanvas.onmousemove = (e) => {
    if (en_dessin) {
      //   ctx.clearRect(0, 0, moncanvas.width, moncanvas.height);

      const endX = e.offsetX;
      const endY = e.offsetY;
      const width = endX - startX;
      const height = endY - startY;

      shapes.pop();
      shapes.push({
        type: "rectangle",
        x: startX,
        y: startY,
        width: width,
        height,
        strokeStyle: ctx.strokeStyle,
        fillStyle: ctx.fillStyle,
        form: form,
      });
      drawAllShapes();
    }
  };
});

eraser_btn__dom.addEventListener("click", (event) => {
  reset_moncanvas_events();

  moncanvas.onclick = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    shapes.push({ type: "eraser", x: x, y: y, size: eraser_size });
    drawAllShapes();
  };

  moncanvas.onmousedown = (e) => {
    en_dessin = true;
  };

  moncanvas.onmousemove = (e) => {
    if (!en_dessin) return;

    const x = e.offsetX;
    const y = e.offsetY;
    shapes.push({ type: "eraser", x: x, y: y, size: eraser_size });
    drawAllShapes();
  };

  moncanvas.onmouseup = (e) => {
    en_dessin = false;
  };
});

function setForm(value) {
  form = value;
}

function undo() {
  const deleted_shape = shapes.pop();
  shapes_trash.push(deleted_shape);
  drawAllShapes();
}

function redo() {
  const restored_shape = shapes_trash.pop();
  shapes.push(restored_shape);
  drawAllShapes();
}

document.getElementById("line_width").addEventListener("change", (e) => {
  let value = parseInt(e.target.value);
  if (value > 0) {
    ctx.lineWidth = value;
  }
});

document.getElementById("eraser_size").addEventListener("change", (e) => {
  let value = parseInt(e.target.value);
  if (value > 0) {
    eraser_size = value;
  }
});

function reset_moncanvas_events() {
  moncanvas.onmousedown = null;
  moncanvas.onmouseover = null;
  moncanvas.onclick = null;
}

// default
line_btn__dom.click();
