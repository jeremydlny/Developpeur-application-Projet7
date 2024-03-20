/**
 * *********************
 * Module qui gère les tags de chaque filtre
 * (Ingrédient, appareil, ustensil)
 * *********************
 */
import { fillFilters } from './filters.js';
import { searchRecipes } from './globalSearchInput.js';
import { clearRecipes } from '../ui/recipeCard.js';
import {
  toggleMenuDisplayIngredient,
  toggleMenuDisplayAppliance,
  toggleMenuDisplayUstensil
} from './dropdown.js';
import { resetInputOnDropdown } from './filtersSearchInput.js';

/**
 * ------------
 * CONSTANTES
 * ------------
 */

// Répertorie les conteneurs de chaque filtre
const tagIngredientWrapper = document.querySelector(
  '.wrapper-tag-selected-ingredient'
);
const tagApplianceWrapper = document.querySelector(
  '.wrapper-tag-selected-appliance'
);
const tagUstensilWrapper = document.querySelector(
  '.wrapper-tag-selected-ustensil'
);

// Boolean permettant de savoir si un tag a été sélectionné
let isAnyTagIngredientAdded = false;
let isAnyTagApplianceAdded = false;
let isAnyTagUstensilAdded = false;

// Setters pour chaque boolean car sinon impossible de redéfinir depuis un autre module
function setIsAnyTagIngredientAdded(value) {
  isAnyTagIngredientAdded = value;
}

function setIsAnyTagApplianceAdded(value) {
  isAnyTagApplianceAdded = value;
}

function setIsAnyTagUstensilAdded(value) {
  isAnyTagUstensilAdded = value;
}

/**
 * ------------
 * FONCTIONS
 * ------------
 */

/**
 * Ajoute un ingrédient à la liste des tags sous le filtre "ingredient"
 */
function addIngredientAsFilterTag(e) {
  if (!isAnyTagIngredientAdded) {
    setIsAnyTagIngredientAdded(true);
    const tagIngredient = document.createElement('li');
    tagIngredient.innerText = e.target.innerText;
    tagIngredient.classList.add('tag-selected-ingredient');

    const deleteTagSpan = document.createElement('span');
    deleteTagSpan.classname = 'deleteTag';

    const deleteTagImg = document.createElement('img');
    deleteTagImg.src = 'assets/icons/icon-close.png';
    deleteTagImg.alt = 'Fermer';
    deleteTagImg.style.cursor = 'pointer';

    // Ajoute l'évènement de suppression du tag
    deleteTagImg.addEventListener('click', () => {
      tagIngredient.remove();
      clearRecipes();
      searchRecipes();
    });

    tagIngredientWrapper.appendChild(tagIngredient);
    tagIngredient.appendChild(deleteTagSpan);
    deleteTagSpan.appendChild(deleteTagImg);

    clearRecipes();
    searchRecipes();
    toggleMenuDisplayIngredient({
      currentTarget: document.querySelector(
        '.dropdown-ingredient .title-ingredient'
      )
    });
    resetInputOnDropdown('Ingredient');
  }
}

/**
 * Ajoute un appareil à la liste des tags sous le filtre "appliance"
 */
function addApplianceAsFilterTag(e) {
  if (!isAnyTagApplianceAdded) {
    setIsAnyTagApplianceAdded(true);
    const tagAppliance = document.createElement('li');
    tagAppliance.innerText = e.target.innerText;
    tagAppliance.classList.add('tag-selected-appliance');

    const deleteTagSpan = document.createElement('span');
    deleteTagSpan.className = 'deleteTag';

    const deleteTagImg = document.createElement('img');
    deleteTagImg.src = 'assets/icons/icon-close.png';
    deleteTagImg.alt = 'Fermer';
    deleteTagImg.style.cursor = 'pointer';

    // Ajoute l'évènement de suppression du tag
    deleteTagSpan.addEventListener('click', () => {
      tagAppliance.remove();
      clearRecipes();
      searchRecipes();
    });

    tagApplianceWrapper.appendChild(tagAppliance);
    tagAppliance.appendChild(deleteTagSpan);
    deleteTagSpan.appendChild(deleteTagImg);

    clearRecipes();
    searchRecipes();
    toggleMenuDisplayAppliance({
      currentTarget: document.querySelector(
        '.dropdown-appliance .title-appliance'
      )
    });
    resetInputOnDropdown('Appliance');
  }
}

/**
 * Ajoute un ustensil à la liste des tags sous le filtre "ustensil"
 */
function addUstensilAsFilterTag(e) {
  if (!isAnyTagUstensilAdded) {
    setIsAnyTagUstensilAdded(true);
    const tagUstensil = document.createElement('li');
    tagUstensil.innerText = e.target.innerText;
    tagUstensil.classList.add('tag-selected-ustensil');

    const deleteTagSpan = document.createElement('span');
    deleteTagSpan.className = 'deleteTag';

    const deleteTagImg = document.createElement('img');
    deleteTagImg.src = 'assets/icons/icon-close.png';
    deleteTagImg.alt = 'Fermer';
    deleteTagImg.style.cursor = 'pointer';

    // Ajoute l'évènement de suppression du tag
    deleteTagSpan.addEventListener('click', () => {
      tagUstensil.remove();
      clearRecipes();
      searchRecipes();
    });

    tagUstensilWrapper.appendChild(tagUstensil);
    tagUstensil.appendChild(deleteTagSpan);
    deleteTagSpan.appendChild(deleteTagImg);

    clearRecipes();
    searchRecipes();
    toggleMenuDisplayUstensil({
      currentTarget: document.querySelector(
        '.dropdown-ustensil .title-ustensil'
      )
    });
    resetInputOnDropdown('Ustensil');
  }
}

/**
 * Filtre les recettes en fonction des tags sélectionnés
 * @param {Object[]} recipesToFilter - Recettes actuellement affichées
 * @returns Liste des recettes filtrées par les tags
 */
function filterRecipesWithTags(
  recipesToFilter,
  ingredientTagsList,
  applianceTagsList,
  ustensilTagsList
) {
  let filteredRecipesList = [];

  // Pour chaque filtre, créer une liste qui récupère le nom dans chaque tag
  const tagIngredientNamesList = ingredientTagsList.map((taggedIngredient) =>
    taggedIngredient.innerText.toLowerCase()
  );

  const tagApplianceNamesList = applianceTagsList.map((taggedAppliance) =>
    taggedAppliance.innerText.toLowerCase()
  );

  const tagUstensilNamesList = ustensilTagsList.map((taggedUstensil) =>
    taggedUstensil.innerText.toLowerCase()
  );

  // Définir le tableau des recettes filtrées
  filteredRecipesList = recipesToFilter.filter((recipe) => {
    // Pour chaque recette

    let isRecipeMatching = false;
    let isIngredientMatching = false;
    let isApplianceMatching = false;
    let isUstensilMatching = false;

    // Répertorier ingrédients de la recette
    const ingredientsInTheRecipe = recipe.ingredients.map(({ ingredient }) =>
      ingredient.toLowerCase()
    );

    // Répertorier appareil de la recette
    const appliancesInTheRecipe = [recipe.appliance.toLowerCase()];

    // Répertorier ustensils de la recette
    const ustensilsInTheRecipe = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase()
    );

    // Vérifier que la recette parcourue contient tous les tags ingrédients sélectionnés
    isIngredientMatching = tagIngredientNamesList.every((tag) =>
      ingredientsInTheRecipe.includes(tag)
    );

    // Vérifier que la recette parcourue contient tous les tags appareils sélectionnés
    isApplianceMatching = tagApplianceNamesList.every((tag) =>
      appliancesInTheRecipe.includes(tag)
    );

    // Vérifier que la recette parcourue contient tous les tags ustensiles sélectionnés
    isUstensilMatching = tagUstensilNamesList.every((tag) =>
      ustensilsInTheRecipe.includes(tag)
    );

    // Si tous les tags sélectionnés correspondent à la recette parcourue => retourner true
    if (
      isIngredientMatching === true &&
      isApplianceMatching === true &&
      isUstensilMatching === true
    ) {
      isRecipeMatching = true;
    }

    return isRecipeMatching;
  });
  fillFilters(filteredRecipesList);
  return filteredRecipesList;
}

export {
  addIngredientAsFilterTag,
  addApplianceAsFilterTag,
  addUstensilAsFilterTag,
  setIsAnyTagIngredientAdded,
  setIsAnyTagApplianceAdded,
  setIsAnyTagUstensilAdded,
  filterRecipesWithTags
};
