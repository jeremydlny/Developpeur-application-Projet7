/**
 * *********************
 * Module qui gère liste de chaque filtre
 * (Ingrédient, appareil, ustensil)
 * *********************
 */
import {
  addIngredientAsFilterTag,
  addApplianceAsFilterTag,
  addUstensilAsFilterTag,
  setIsAnyTagIngredientAdded,
  setIsAnyTagApplianceAdded,
  setIsAnyTagUstensilAdded
} from './filterTags.js';
import { listenInputSearchFilter } from './filtersSearchInput.js';
import { capitalizeFirstLetter } from '../utils/formatData.js';

/**
 * Ajoute un élément à une des listes de filtre sur la page HTML
 * @param {'ingredient' | 'appliance'| 'ustensil'} dropdownType
 * @param {HTMLElement} filterContainer
 * @param {string} filterElementText
 */
function addElementToFilterList(
  dropdownType,
  filterContainer,
  filterElementText
) {
  const filterItem = document.createElement('li');
  filterItem.classList.add(`${dropdownType}-option`);
  filterItem.innerText = capitalizeFirstLetter(filterElementText);

  // Définit la fonction d'ajout de tag à appeler en fonction du dropdownType
  let addTagEventToPass;
  if (dropdownType === 'ingredient') {
    addTagEventToPass = addIngredientAsFilterTag;
  } else if (dropdownType === 'appliance') {
    addTagEventToPass = addApplianceAsFilterTag;
  } else if (dropdownType === 'ustensil') {
    addTagEventToPass = addUstensilAsFilterTag;
  }

  if (addTagEventToPass) {
    filterItem.addEventListener('click', (e) => addTagEventToPass(e));
  } else {
    console.error(
      "Aucune fonction d'ajout de tag définie pour ce type de dropdown."
    );
  }
  filterContainer.appendChild(filterItem);
}

/**
 * Rempli et met à jour la liste de chaque filtre à partir des recettes affichées
 * @param {Object[]} recipes - Liste des recettes affichées
 */
function fillFilters(recipes) {
  // Répertorier les conteneurs de chaque filtre
  const ingredientFilterContainer = document.querySelector(
    '.container-option-ingredient'
  );
  const applianceFilterContainer = document.querySelector(
    '.container-option-appliance'
  );
  const ustensilFilterContainer = document.querySelector(
    '.container-option-ustensil'
  );

  // Set uniques pour éviter les doublons
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

  // Vider anciennes listes
  ingredientFilterContainer.textContent = '';
  applianceFilterContainer.textContent = '';
  ustensilFilterContainer.textContent = '';

  // Répertorier les listes de tags sélectionnés pour chaque filtre
  const ingredientTags = [
    ...document.querySelectorAll('.tag-selected-ingredient')
  ].map((ingredientTag) => ingredientTag.innerText.toLowerCase());
  const applianceTags = [
    ...document.querySelectorAll('.tag-selected-appliance')
  ].map((applianceTag) => applianceTag.innerText.toLowerCase());
  const ustensilTags = [
    ...document.querySelectorAll('.tag-selected-ustensil')
  ].map((ustensilTag) => ustensilTag.innerText);

  // Parcourir les recettes pour alimenter les listes
  recipes.forEach((recipe) => {
    // ---- INGREDIENTS ----
    recipe.ingredients.forEach(({ ingredient }) => {
      const ingredientFormatted = ingredient.toLowerCase();

      // Vérifier si l'ingrédient normalisé est déjà dans la liste ou parmi les tags
      const isAlreadyAdded =
        ingredientsSet.has(ingredientFormatted) ||
        ingredientTags.includes(ingredientFormatted);

      // si ingredient n'est ni dans la liste des options ni dans les tags, l'ajouter aux options
      if (!isAlreadyAdded) {
        ingredientsSet.add(ingredientFormatted);
        addElementToFilterList(
          'ingredient',
          ingredientFilterContainer,
          ingredient
        );
      }
    });

    // ---- APPLIANCE ----
    const applianceFormatted = recipe.appliance.toLowerCase();

    // Vérifier si l'appareil normalisé est déjà dans la liste ou parmi les tags
    const isAlreadyAdded =
      appliancesSet.has(applianceFormatted) ||
      applianceTags.includes(applianceFormatted);

    // si appareil n'est ni dans la liste des options ni dans les tags, l'ajouter aux options
    if (!isAlreadyAdded) {
      appliancesSet.add(applianceFormatted);
      addElementToFilterList(
        'appliance',
        applianceFilterContainer,
        recipe.appliance
      );
    }

    // ---- USTENSIL ----
    recipe.ustensils.forEach((ustensil) => {
      const ustensilFormatted = ustensil.toLowerCase();

      // Vérifier si l'ustensil normalisé est déjà dans la liste ou parmi les tags
      const isAlreadyAdded =
        ustensilsSet.has(ustensilFormatted) ||
        ustensilTags.includes(ustensilFormatted);

      if (!isAlreadyAdded) {
        ustensilsSet.add(ustensilFormatted);
        addElementToFilterList('ustensil', ustensilFilterContainer, ustensil);
      }
    });
  });
  // Ingredients
  setIsAnyTagIngredientAdded(false);
  listenInputSearchFilter(
    'Ingredient',
    'searchInputFilterIngredient',
    '.container-option-ingredient li',
    'clearInputFilterIngredient'
  );
  // Appareils (appliance)
  setIsAnyTagApplianceAdded(false);
  listenInputSearchFilter(
    'Appliance',
    'searchInputFilterAppliance',
    '.container-option-appliance li',
    'clearInputFilterAppliance'
  );
  // Ustensiles
  setIsAnyTagUstensilAdded(false);
  listenInputSearchFilter(
    'Ustensil',
    'searchInputFilterUstensil',
    '.container-option-ustensil li',
    'clearInputFilterUstensil'
  );
}

export { fillFilters };
