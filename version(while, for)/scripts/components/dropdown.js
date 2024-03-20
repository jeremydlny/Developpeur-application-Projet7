/**
 * *********************
 * Module qui gère chaque dropdown utilisée
 * pour chaque filtre (Ingrédient, appareil, ustensil)
 * *********************
 */

/**
 * ---------
 * CONTANTES
 * ---------
 */
const ingredientDropdown = document.querySelector(
  '.dropdown-ingredient .title-ingredient'
);
const applianceDropdown = document.querySelector(
  '.dropdown-appliance .title-appliance'
);
const ustensilDropdown = document.querySelector(
  '.dropdown-ustensil .title-ustensil'
);

/**
 * ---------
 * EVENTS
 * ---------
 */
if (ingredientDropdown) {
  ingredientDropdown.addEventListener('click', toggleMenuDisplayIngredient);
}
if (applianceDropdown) {
  applianceDropdown.addEventListener('click', toggleMenuDisplayAppliance);
}
if (ustensilDropdown) {
  ustensilDropdown.addEventListener('click', toggleMenuDisplayUstensil);
}

/**
 * ------------
 * FONCTIONS
 * ------------
 */

/**
 * Ajoute ou supprime une classe CSS sur un élément.
 * @param {HTMLElement} element - L'élément sur lequel la classe doit être ajoutée ou supprimée.
 * @param {string} className - Le nom de la classe à ajouter ou supprimer.
 */
function toggleClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

/**
 * Ouvre ou ferme le menu FILTRE INGREDIENT en modifiant les classes CSS des éléments.
 * @param {MouseEvent} event - L'événement déclencheur de la fonction.
 */
function toggleMenuDisplayIngredient(event) {
  const dropdown = event.currentTarget.closest('.dropdown-ingredient');
  const menu = dropdown.querySelector('.menu-ingredient');
  const icon = dropdown.querySelector('.fa-angle-down');

  toggleClass(menu, 'hide-ingredient');
  toggleClass(icon, 'rotate-90');
  toggleClass(dropdown, 'active-ingredient');
}

/**
 * Ouvre ou ferme le menu FILTRE APPAREIL en modifiant les classes CSS des éléments.
 * @param {MouseEvent} event - L'événement déclencheur de la fonction.
 */
function toggleMenuDisplayAppliance(event) {
  const dropdown = event.currentTarget.closest('.dropdown-appliance');
  const menu = dropdown.querySelector('.menu-appliance');
  const icon = dropdown.querySelector('.fa-angle-down');

  toggleClass(menu, 'hide-appliance');
  toggleClass(icon, 'rotate-90');
  toggleClass(dropdown, 'active-appliance');
}

/**
 * Ouvre ou ferme le menu FILTRE USTENSIL en modifiant les classes CSS des éléments.
 * @param {MouseEvent} event - L'événement déclencheur de la fonction.
 */
function toggleMenuDisplayUstensil(event) {
  const dropdown = event.currentTarget.closest('.dropdown-ustensil');
  const menu = dropdown.querySelector('.menu-ustensil');
  const icon = dropdown.querySelector('.fa-angle-down');

  toggleClass(menu, 'hide-ustensil');
  toggleClass(icon, 'rotate-90');
  toggleClass(dropdown, 'active-ustensil');
}

export {
  toggleMenuDisplayIngredient,
  toggleMenuDisplayAppliance,
  toggleMenuDisplayUstensil
};
