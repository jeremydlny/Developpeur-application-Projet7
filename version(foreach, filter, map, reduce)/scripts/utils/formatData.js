/**
 * *********************
 * Module de fonctions utilitaires
 * *********************
 */

/**
 * Transforme la première la première lettre du premier mot en capitale
 * @param {string} string - Chaîne de caractères initiale
 * @returns - La chaîne de caractères avec la première lettre du premier mot en capitale
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export { capitalizeFirstLetter };
