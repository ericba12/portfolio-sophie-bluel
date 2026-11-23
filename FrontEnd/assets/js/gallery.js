/**
 * Affichage de la galerie de travaux.
 * Ce module ne fait aucun appel réseau : il reçoit des données
 * et les transforme en éléments HTML.
 */

/**
 * Construit l'élément <figure> d'un travail.
 *
 * Les éléments sont créés avec createElement et le texte est inséré
 * avec textContent : les données de l'API sont toujours traitées comme
 * du texte, jamais interprétées comme du HTML (protection contre le XSS).
 *
 * @param {{id:number, title:string, imageUrl:string, categoryId:number}} work
 * @returns {HTMLElement}
 */
function buildFigure(work) {
  const figure = document.createElement("figure");

  // Attributs data-* : serviront à filtrer par catégorie
  // et à retrouver un travail lors de sa suppression.
  figure.dataset.id = work.id;
  figure.dataset.categoryId = work.categoryId;

  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title; // texte alternatif pour l'accessibilité
  img.loading = "lazy"; // l'image ne se charge qu'à l'approche de l'écran

  const caption = document.createElement("figcaption");
  caption.textContent = work.title;

  figure.append(img, caption);
  return figure;
}

/**
 * Affiche une liste de travaux dans la galerie, en remplaçant
 * le contenu existant. Réutilisée telle quelle par les filtres.
 *
 * @param {HTMLElement} container - L'élément .gallery
 * @param {Array} works - Les travaux à afficher
 */
export function renderGallery(container, works) {
  // Le fragment sert de conteneur temporaire hors de la page :
  // toutes les figures y sont ajoutées, puis insérées dans le DOM
  // en une seule opération (un seul recalcul de la mise en page).
  const fragment = document.createDocumentFragment();
  works.forEach((work) => fragment.appendChild(buildFigure(work)));

  // replaceChildren vide la galerie et insère le nouveau contenu.
  container.replaceChildren(fragment);
}

/**
 * Affiche un message d'erreur à la place de la galerie.
 *
 * @param {HTMLElement} container - L'élément .gallery
 * @param {string} message - Message destiné à l'utilisateur
 */
export function renderGalleryError(container, message) {
  const p = document.createElement("p");
  p.className = "gallery-error";
  p.textContent = message;
  container.replaceChildren(p);
}
