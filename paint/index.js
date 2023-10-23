const moncanvas = document.getElementById("dessin");
const ctx = moncanvas.getContext("2d");
var en_dessin = false;
var form = "creuse";

const shapes_trash = [];
const shapes = [];

const line_btn__dom = document.getElementById("line-btn");
const cercle_btn__dom = document.getElementById("cercle-btn");
const rectangle_btn__dom = document.getElementById("rectangle-btn");

// Propriétés graphiques par défaut _
ctx.strokeStyle = "black";
ctx.lineWidth = 2;

// Bouton de souris relâché _
moncanvas.onmouseup = function (e) {
  // Dessin désactivé
  en_dessin = false;
};

// Ajoute un segment au tracé _
function dessiner(x, y) {
  if (form == "creuse") {
    ctx.stroke();
  }

  if (form == "pleine") {
    ctx.fill();
  }
}
function drawAllShapes() {
  ctx.clearRect(0, 0, moncanvas.width, moncanvas.height);

  shapes.forEach((shape) => {
    ctx.strokeStyle = shape.strokeStyle;
    ctx.fillStyle = shape.fillStyle;

    switch (shape.type) {
      case "line":
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

      default:
        break;
    }
  });
}

// Modification de la couleur du contexte _
function modifierCouleur(codeCouleur) {
  if (codeCouleur) {
    ctx.strokeStyle = codeCouleur;
    ctx.fillStyle = codeCouleur;
  }
}

line_btn__dom.addEventListener("click", (event) => {
  // Bouton de souris activé

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
    });

    drawAllShapes();
  };

  // Mouvement de souris
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
      });

      drawAllShapes();
    }
  };
});

cercle_btn__dom.addEventListener("click", (event) => {
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
