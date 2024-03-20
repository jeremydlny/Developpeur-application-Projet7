/**
 * *********************
 * Module qui gère la recherche autocomplete
 * pour chaque filtre (Ingrédient, appareil, ustensil)
 * *********************
 */

import { capitalizeFirstLetter } from '../utils/formatData.js';

/**
 * ------------
 * FONCTIONS
 * ------------
 */

/**
 * Autocomplete de chaque filtre via la recherche :
 * Parcours la liste des options et n'affiche que
 * les éléments qui correspondent à la requête de recherche
 * @param {string} inputId - ID utilisé comme sélecteur pour l'input
 * @param {string} filterItemsSelector - Sélecteur de chaque option de la liste du filtre
 */
function getSearchResultsForFilter(inputId, filterItemsSelector) {
  const filterItems = document.querySelectorAll(filterItemsSelector);
  const searchTextQuery = document.getElementById(inputId).value.toLowerCase();

  filterItems.forEach((item) => {
    const itemName = item.innerText.toLowerCase();
    const isVisible = itemName.includes(searchTextQuery);
    item.style.display = isVisible ? 'block' : 'none';
  });
}

/**
 * Gère l'affichage de l'icône de suppression de l'input
 * @param {string} inputId
 */
function manageClearInputIcon(inputId) {
  const searchInput = document.getElementById(inputId);
  const clearInputIcon = document
    .getElementById(inputId)
    .nextElementSibling.querySelector('img.closeInputFilter');
  const searchInputValue = searchInput.value;

  clearInputIcon.style.display =
    searchInputValue.length > 0 ? 'inline' : 'none';
}

/**
 * Ajoute l'écouteur d'évènement qui lance la recherche dans le filtre
 * et l'écouteur d'évènement qui permet de supprimer le champs de la recherche
 * @param {'Ingredient' | 'Appliance' | 'Ustensil'} dropdownType
 * @param {string} inputId
 * @param {string} filterItemsSelector
 * @param {string} clearInputBtnId - Sélecteur du bouton de suppression de l'input
 */
function listenInputSearchFilter(
  dropdownType,
  inputId,
  filterItemsSelector,
  clearInputBtnId
) {
  const searchInput = document.getElementById(inputId);
  const clearInputButton = document.getElementById(clearInputBtnId);

  searchInput.addEventListener('keyup', () => {
    manageClearInputIcon(inputId);
    getSearchResultsForFilter(inputId, filterItemsSelector);
  });

  clearInputButton.addEventListener('click', () => {
    resetInputOnDropdown(dropdownType);
    manageClearInputIcon(inputId);
    getSearchResultsForFilter(inputId, filterItemsSelector);
  });
}

/**
 * Réinitialise la valeur de l'input du dropdown
 * @param {'Ingredient' | 'Appliance' | 'Ustensil'} dropdownType - Type de dropdown concerné
 */
function resetInputOnDropdown(dropdownType) {
  const searchInput = document.querySelector(
    `#searchInputFilter${capitalizeFirstLetter(dropdownType)}`
  );
  searchInput.value = '';
}

export { resetInputOnDropdown, listenInputSearchFilter };
