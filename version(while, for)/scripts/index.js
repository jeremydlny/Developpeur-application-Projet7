import RecipeApi from './api/Api.js';
import { fillRecipeCardTemplate, recipeCardTemplate } from './ui/recipeCard.js';
import { cardContainer } from './ui/recipeCard.js';
import { fillFilters } from './components/filters.js';
/**
 * ------------
 * CONSTANTES
 * ------------
 */
const recipeApi = new RecipeApi('../../data/recipes.json');
let recipes = [];

/**
 * ------------
 * FONCTIONS
 * ------------
 */

/**
 * Crée des 'card HTML' pour chaque recette et les ajoute au conteneur
 * @param {Object[]} recipes - Liste des recettes à afficher
 */
function displayRecipes(recipes) {
  const recipeCards = recipes.map((recipe) => {
    const filledTemplate = fillRecipeCardTemplate(recipeCardTemplate, recipe);
    const card = document.createElement('div');
    // card.innerHTML = filledTemplate;
    card.insertAdjacentHTML('beforeend', filledTemplate);
    return card;
  });

  // Ajoute les cartes au conteneur
  recipeCards.forEach((card) => {
    cardContainer.appendChild(card);
  });

  // Mettre à jour le nombre de recettes
  const numberOfRecipesDisplayed = document.querySelector('#numbersOfRecipes');
  // console.log('numberOfRecipesDisplayed', numberOfRecipesDisplayed);
  numberOfRecipesDisplayed.textContent = recipes.length;
}

/**
 * Récupère les données de recettes, crée des cartes HTML et les ajoute au conteneur.
 * @method
 * @returns {Promise} - Les données de recettes
 */
recipeApi
  .getRecipes()
  .then((recipesData) => {
    recipes = recipesData.recipes;
    if (recipes.length > 0) {
      displayRecipes(recipes);
      fillFilters(recipes);
    }
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des données de recettes :",
      error
    );
  });

export { displayRecipes, recipes };
