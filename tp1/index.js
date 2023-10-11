function toggleClass(className) {
  const elementId = "test";

  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  element.classList.toggle(className);
}
