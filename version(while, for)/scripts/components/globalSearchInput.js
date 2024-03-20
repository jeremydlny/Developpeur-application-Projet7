/**
 * *********************
 * Module qui gère la recherche globale avec et/ou sans filtre
 * *********************
 */
import { displayRecipes, recipes as allRecipes } from '../index.js';
import { fillFilters } from './filters.js';
import { filterRecipesWithTags } from './filterTags.js';
import { clearRecipes } from '../ui/recipeCard.js';

/**
 * ------------
 * CONSTANTES
 * ------------
 */
const globalSearchInput = document.querySelector('#inputNav');
const clearGlobalInputIcon = document.querySelector('#clearInputNav');

/**
 * ------------
 * FONCTIONS
 * ------------
 */

/**
 * Filtre les recettes en fonction du champs tapé par l'utilisateur dans la barre de recherche
 * @param {Object[]} recipesTofilter - Liste des recettes à filtrer
 * @param {string} inputValue - Valeur du champ dans la barre de recherche
 * @returns
 */
function filterRecipesWithGlobalInput(recipesTofilter, inputValue) {
  const inputValueFormatted = inputValue.trim().toLowerCase();

  const recipesListToDisplay = [];
  for (const recipe of recipesTofilter) {
    let recipeIsMatching = false;
    // Vérifie si la valeur saisie correspond à un titre, à la description ou à un ingrédient de la carte
    if (
      recipe.name.toLowerCase().includes(inputValueFormatted) ||
      recipe.description.toLowerCase().includes(inputValueFormatted)
    ) {
      recipeIsMatching = true;
    }

    for (const { ingredient } of recipe.ingredients) {
      const ingredientNameFormatted = ingredient.toLowerCase();
      if (ingredientNameFormatted.includes(inputValueFormatted)) {
        recipeIsMatching = true;
      }
    }

    if (recipeIsMatching) {
      recipesListToDisplay.push(recipe);
    }
  }
  return recipesListToDisplay;
}

/**
 * Recherche les recettes en prenant en compte le champ de recherche globale et les filtres
 */
function searchRecipes() {
  let isAnyTagSelected = false;
  let recipesListToDisplay = [];
  let globalInputValue;

  // Pour chaque filtre, lister les tags sélectionnés
  const ingredientTagsList = document.querySelectorAll(
    '.wrapper-tag-selected-ingredient .tag-selected-ingredient'
  );
  const applianceTagsList = document.querySelectorAll(
    '.wrapper-tag-selected-appliance .tag-selected-appliance'
  );
  const ustensilTagsList = document.querySelectorAll(
    '.wrapper-tag-selected-ustensil .tag-selected-ustensil'
  );

  // ------ FILTRE RECETTES VIA INPUT DE LA RECHERCHE GLOBALE ------
  // Si une recherche dans input global
  if (globalSearchInput.value.length >= 3) {
    globalInputValue = globalSearchInput.value;

    recipesListToDisplay = filterRecipesWithGlobalInput(
      allRecipes,
      globalInputValue
    );
  } else {
    recipesListToDisplay = allRecipes;
  }

  recipesListToDisplay.length === 0
    ? displayNoMatchMessage(true)
    : displayNoMatchMessage(false);

  // ------ FILTRE RECETTES VIA LES TAGS ------
  // Si un tag est utilisé dans l'un des filtre
  if (
    ingredientTagsList.length > 0 ||
    applianceTagsList.length > 0 ||
    ustensilTagsList.length > 0
  ) {
    isAnyTagSelected = true;

    recipesListToDisplay = filterRecipesWithTags(
      recipesListToDisplay,
      Array.from(ingredientTagsList),
      Array.from(applianceTagsList),
      Array.from(ustensilTagsList)
    );
  }

  // Si aucun tag et aucune recherche globale => tout afficher
  if (
    globalSearchInput.value.length === 0 &&
    ingredientTagsList.length === 0 &&
    applianceTagsList.length === 0 &&
    ustensilTagsList.length === 0
  ) {
    clearRecipes();
    fillFilters(allRecipes);
    displayRecipes(allRecipes);
  } else {
    clearRecipes();
    fillFilters(recipesListToDisplay);
    displayRecipes(recipesListToDisplay);
  }
}

/**
 * Gère l'affichage du message indiquant qu'il n'y a pas de résultat pour cette recherche
 * @param {boolean} displayNoMatchRecipeFound - Détermine si on affiche le message 'Aucun résultat...
 */
function displayNoMatchMessage(displayNoMatchRecipeFound) {
  const noMatchMessage = document.querySelector('.no-match-message');
  const searchTermElement = noMatchMessage.querySelector('#searchTerm');
  const inputValue = document.querySelector('#inputNav').value;

  if (displayNoMatchRecipeFound === true) {
    noMatchMessage.style.display = 'block';
    searchTermElement.textContent = inputValue;
  } else {
    noMatchMessage.style.display = 'none';
    // Réinitialisez le terme de recherche si des correspondances ont été trouvées
    searchTermElement.textContent = '';
  }
}

/**
 * Gère l'affichage de l'icône de suppression de l'input de la recherche globale
 */
function manageClearGlobalInputIcon() {
  const globalInputValue = globalSearchInput.value;
  clearGlobalInputIcon.style.display =
    globalInputValue.length > 0 ? 'inline' : 'none';
}

/**
 * ------------
 * EVENTS
 * ------------
 */
globalSearchInput.addEventListener('keyup', () => {
  manageClearGlobalInputIcon();
  searchRecipes();
});

clearGlobalInputIcon.addEventListener('click', () => {
  globalSearchInput.value = '';
  manageClearGlobalInputIcon();
  searchRecipes();
});

export { searchRecipes };
