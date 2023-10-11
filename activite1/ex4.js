// Sélectionnez le premier élément 'div' dans le document HTML
const div__dom = document.getElementsByTagName("div")[0];

// Ajoutez un écouteur d'événements pour le clic de la souris
div__dom.addEventListener("click", (event) => {
  //
  // Récupérez les coordonnées X et Y du clic de la souris
  const x = event.clientX;
  const y = event.clientY;
  // Affichez les coordonnées de la souris dans une boîte de dialogue
  alert(`Position de la souris : ${x}, ${y}`);
});

// Définissez une constante pour le nom de classe CSS
const CLASS_NAME = "animation";

// Ajoutez un écouteur d'événements pour le survol de la souris
div__dom.addEventListener("mouseover", () => {
  // Modifiez le contenu de la 'div' pour afficher "bonjour"
  div__dom.innerHTML = "bonjour";
  // Ajoutez la classe CSS 'animation' à la 'div'
  div__dom.classList.add(CLASS_NAME);
});

// Ajoutez un écouteur d'événements pour la sortie de la souris
div__dom.addEventListener("mouseout", () => {
  // Supprimez le contenu de la 'div'
  div__dom.innerHTML = "";
  // Retirez la classe CSS 'animation' de la 'div'
  div__dom.classList.remove(CLASS_NAME);
});
