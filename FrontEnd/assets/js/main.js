/**
 * Point d'entrée de la page d'accueil.
 * Orchestre les modules : récupère les données via l'API,
 * puis les confie au module d'affichage.
 */
import { fetchWorks } from "./api.js";
import { renderGallery, renderGalleryError } from "./gallery.js";

const gallery = document.querySelector(".gallery");

/**
 * Charge les travaux et les affiche.
 * En cas d'échec (backend arrêté, erreur serveur), l'utilisateur voit
 * un message clair au lieu d'une galerie vide, et le détail technique
 * reste disponible dans la console pour le débogage.
 */
async function init() {
  try {
    const works = await fetchWorks();
    renderGallery(gallery, works);
  } catch (error) {
    console.error(error);
    renderGalleryError(gallery, "Les projets n'ont pas pu être chargés.");
  }
}

init();
