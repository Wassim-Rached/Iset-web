var moncanvas = document.getElementById("dessin");
var ctx = moncanvas.getContext("2d");
var en_dessin = false;
var form = "creuse";

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
  ctx.lineTo(x, y);
  if (form == "creuse") {
    ctx.stroke();
  }

  if (form == "pleine") {
    ctx.fill();
  }
}

// Modification de la couleur du contexte _
function modifierCouleur(codeCouleur) {
  if (codeCouleur) {
    if (form == "creuse") {
      ctx.strokeStyle = codeCouleur;
      ctx.fillStyle = undefined;
    }

    if (form == "pleine") {
      ctx.fillStyle = codeCouleur;
      ctx.strokeStyle = undefined;
    }
  }
}

line_btn__dom.addEventListener("click", (event) => {
  // Bouton de souris activé _
  moncanvas.onmousedown = (e) => {
    // Dessin activé
    en_dessin = true;
    ctx.beginPath();
    // Repositionnement du début du tracé
    ctx.moveTo(e.offsetX, e.offsetY);
  };

  // Mouvement de souris
  moncanvas.onmousemove = function (e) {
    if (en_dessin) dessiner(e.offsetX, e.offsetY);
  };
});

cercle_btn__dom.addEventListener("click", (event) => {
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

    ctx.strokeRect(startX, startY, width, height);
  };

  moncanvas.onmousemove = (e) => {
    if (en_dessin) {
      ctx.clearRect(0, 0, moncanvas.width, moncanvas.height);

      const endX = e.offsetX;
      const endY = e.offsetY;

      const width = endX - startX;
      const height = endY - startY;

      ctx.strokeRect(startX, startY, width, height);
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

    ctx.strokeRect(startX, startY, width, height);
  };

  moncanvas.onmousemove = (e) => {
    if (en_dessin) {
      ctx.clearRect(0, 0, moncanvas.width, moncanvas.height);

      const endX = e.offsetX;
      const endY = e.offsetY;

      const width = endX - startX;
      const height = endY - startY;

      ctx.strokeRect(startX, startY, width, height);
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

    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);

    ctx.stroke();
  };

  moncanvas.onmousemove = (e) => {
    if (en_dessin) {
      ctx.clearRect(0, 0, moncanvas.width, moncanvas.height);

      const endX = e.offsetX;
      const endY = e.offsetY;
      const radius = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
      );

      ctx.beginPath();
      ctx.arc(startX, startY, radius, 0, 2 * Math.PI);

      ctx.stroke();
    }
  };
});
