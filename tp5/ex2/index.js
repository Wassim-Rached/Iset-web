const draggables = document.querySelectorAll(".draggable");

const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    const value = parseInt(draggable.getAttribute("value"));

    const forPair = container.getAttribute("forPair") === "true";
    const isPair = value % 2 === 0;

    if ((forPair && isPair) || (!forPair && !isPair)) {
      container.appendChild(draggable);
    }
  });
});
