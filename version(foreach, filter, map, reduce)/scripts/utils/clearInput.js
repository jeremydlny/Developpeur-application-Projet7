/**
 * Nettoie les champs d'entrée en ajoutant des fonctionnalités pour effacer le contenu et gérer la visibilité des icônes de suppression.
 * @param {string} inputID - L'ID de l'élément input.
 * @param {string} clearInputID - L'ID de l'icône de suppression du contenu.
 */
function cleanInput(inputID, clearInputID) {
  // Sélectionne l'élément input et l'icône de suppression
  const input = document.getElementById(inputID);
  const clearInput = document.getElementById(clearInputID);

  /**
   * Affiche ou masque l'icône de suppression en fonction du contenu de l'input.
   */
  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      return (clearInput.style.display = 'inline');
    }
    clearInput.style.display = 'none';
  });

  /**
   * Efface le contenu du champ d'entrée lorsque l'icône de suppression est cliquée.
   */
  clearInput.addEventListener('click', () => {
    input.value = '';
    clearInput.style.display = 'none';
  });
}

// Appels à la fonction cleanInput pour différents champs d'entrée
cleanInput('inputNav', 'clearInputNav');
cleanInput('searchInputFilter', 'clearInputFilter');
cleanInput('searchInputFilterAppliance', 'clearInputFilterAppliance');
cleanInput('searchInputFilterUstensil', 'clearInputFilterUstensil');
