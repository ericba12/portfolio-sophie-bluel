/**
 * Couche d'accès à l'API.
 * Tous les appels réseau passent par ce fichier : le reste du code
 * ne connaît ni fetch, ni les URL, ni la gestion des erreurs HTTP.
 */
import { API_URL } from "./config.js";

/**
 * Fonction générique utilisée par tous les appels à l'API.
 *
 * @param {string} endpoint - Route appelée, ex. "/works"
 * @param {RequestInit} [options] - Options fetch (méthode, en-têtes, body…)
 * @returns {Promise<any|null>} Les données JSON, ou null si la réponse est vide (204)
 * @throws {Error} Si le serveur répond avec un code d'erreur (4xx, 5xx)
 */
async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, options);

  // fetch ne rejette la promesse qu'en cas d'erreur réseau.
  // Un 404 ou un 500 est une réponse "réussie" pour lui :
  // on vérifie donc nous-mêmes le statut avant de lire le contenu.
  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${endpoint} : HTTP ${response.status}`);
  }

  // 204 No Content (ex. après une suppression) : pas de JSON à lire,
  // appeler response.json() provoquerait une erreur.
  return response.status === 204 ? null : response.json();
}

/**
 * Récupère la liste de tous les travaux de l'architecte.
 * @returns {Promise<Array<{id:number, title:string, imageUrl:string, categoryId:number}>>}
 */
export function fetchWorks() {
  return request("/works");
}

/**
 * Récupère la liste des catégories (utilisée pour les filtres).
 * @returns {Promise<Array<{id:number, name:string}>>}
 */
export function fetchCategories() {
  return request("/categories");
}
