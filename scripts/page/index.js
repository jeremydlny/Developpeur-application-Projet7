document.addEventListener("DOMContentLoaded", function () {

  let newRecipes = [];

  async function init() {
    const { recipes } = await getDataApi();
    newRecipes = recipes;

    DisplayAll(recipes);
  }

  init();

  function getDataApi() {
    return fetch('http://localhost:5501/data/recipes.json')
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function DisplayAll(recipes) {
    displayData();
    displayHeader();
    displayFilters();
  }

  function displayData() {
    const recipesSection = document.getElementsByClassName("recipesCard")[0];
    recipesSection.innerHTML = '';
    newRecipes.forEach((recipe) => {
      const recipeModel = recipesFactory(recipe);
      const recipeCardDOM = recipeModel.getRecipesCardDOM();
      recipesSection.appendChild(recipeCardDOM);
    });
  }

  function displayFilters() {
    const filtersSection = document.querySelector(".filtersCard");
    filtersSection.innerHTML = "";

    // Récupération des ingrédients, appareils et ustensiles uniques
    const uniqueIngredients = [...new Set(newRecipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)))];
    const uniqueAppliances = [...new Set(newRecipes.map(recipe => recipe.appliance))];
    const uniqueUstensils = [...new Set(newRecipes.flatMap(recipe => recipe.ustensils))];

    const filtersCard = document.createElement("div");
    filtersCard.className = "dropdown-wrapper";
    filtersCard.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Ingrédients
        </button>
        <ul class="dropdown-menu">
          <li>
            <form class="px-4 py-3">
              <input id="searchIngredient" type="search" class="form-control">
            </form>
          </li>
          ${uniqueIngredients.map(ingredient => `<li><a class="dropdown-item" href="#">${ingredient}</a></li>`).join("")}
        </ul>
      </div>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Appareils
        </button>
        <ul class="dropdown-menu">
          <li>
            <form class="px-4 py-3">
              <input id="searchAppliance" type="search" class="form-control">
            </form>
          </li>
          ${uniqueAppliances.map(appliance => `<li><a class="dropdown-item" href="#">${appliance}</a></li>`).join("")}
        </ul>
      </div>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Ustensiles
        </button>
        <ul class="dropdown-menu">
          <li>
            <form class="px-4 py-3">
              <input id="searchUstensil" type="search" class="form-control">
            </form>
          </li>
          ${uniqueUstensils.map(ustensil => `<li><a class="dropdown-item" href="#">${ustensil}</a></li>`).join("")}
        </ul>
      </div>
      <div class="recipe-count">

      </div>
    `;

    filtersSection.appendChild(filtersCard);

    // Afficher le nombre de recettes
    const selectedFilters = document.createElement("div");
    selectedFilters.classList.add("selected-filters");
    filtersSection.appendChild(selectedFilters);

    // Afficher le nombre de recettes
    let displayedRecipesCount = newRecipes.length;

    const dropdownItems = document.querySelectorAll(".dropdown-item"); // Récupérer tous les éléments de la liste déroulante
    dropdownItems.forEach(item => { // Parcourir tous les éléments de la liste déroulante
      item.addEventListener("click", () => { // Ajouter un gestionnaire d'événement click à chaque élément
        const filterType = item.parentNode.parentNode.previousElementSibling.textContent.trim(); // Récupérer le type de filtre
        const filterValue = item.textContent.trim().toLowerCase(); // Récupérer la valeur du filtre

        // Filtrer les recettes en fonction de l'élément cliqué
        newRecipes = newRecipes.filter(recipe => {
          switch (filterType) {
            case "Ingrédients":
              // Vérifier si l'ingrédient est présent dans la liste des ingrédients de la recette
              return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filterValue));
            case "Appareils":
              // Vérifier si l'appareil est présent dans la liste des appareils de la recette
              return recipe.appliance.toLowerCase().includes(filterValue);
            case "Ustensiles":
              // Vérifier si l'ustensile est présent dans la liste des ustensiles de la recette
              return recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(filterValue));
            default:
              return true;
          }
        });

        // Mettre à jour le nombre de recettes affichées
        displayedRecipesCount = newRecipes.length;

        // Mettre à jour la liste des recettes affichées
        displayData();

        // Mettre à jour le filtre sélectionné
        const selectedFilter = document.createElement("div");
        selectedFilter.classList.add("selected-filter");
        selectedFilter.innerHTML = `
        <span>${filterValue}</span>
        <button class="btn-close" type="button"></button>
      `;
        selectedFilters.appendChild(selectedFilter); // Ajouter le filtre sélectionné à la liste des filtres sélectionnés

        const closeButton = selectedFilter.querySelector(".btn-close");
        closeButton.addEventListener("click", () => {
          // Supprimer le filtre sélectionné
          selectedFilter.remove();

          // Réinitialiser les recettes filtrées
          newRecipes = recipes;

          // Réafficher toutes les recettes
          displayData(newRecipes);
        });
        const recipeCount = filtersCard.querySelector(".recipe-count");
        recipeCount.textContent = `${displayedRecipesCount} recettes`;
      });
    });

    // Filtrer les recettes en fonction des valeurs saisies dans les champs de recherche
    const searchIngredient = document.getElementById("searchIngredient");
    const searchAppliance = document.getElementById("searchAppliance");
    const searchUstensil = document.getElementById("searchUstensil");


    const filterRecipes = () => {
      let filteredRecipes = newRecipes;

      if (searchIngredient) {
        const value = searchIngredient.value.toLowerCase();
        filteredRecipes = filteredRecipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(value)));
      }

      if (searchAppliance) {
        const value = searchAppliance.value.toLowerCase();
        filteredRecipes = filteredRecipes.filter(recipe => recipe.appliance.toLowerCase().includes(value));
      }

      if (searchUstensil) {
        const value = searchUstensil.value.toLowerCase();
        filteredRecipes = filteredRecipes.filter(recipe => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(value)));
      }

      newRecipes = filteredRecipes;
      displayData();
    };

    if (searchIngredient) {
      searchIngredient.addEventListener("input", filterRecipes);
    }

    if (searchAppliance) {
      searchAppliance.addEventListener("input", filterRecipes);
    }

    if (searchUstensil) {
      searchUstensil.addEventListener("input", filterRecipes);
    }

    const dropdownButtons = document.querySelectorAll(".dropdown-toggle");

    // Ouvrir le menu déroulant au clic
    dropdownButtons.forEach(button => {
      button.addEventListener("click", () => {
        const dropdownMenu = button.nextElementSibling;
        dropdownMenu.classList.toggle("show");
      });
    });

    // Fermer le menu déroulant si l'utilisateur clique en dehors
    window.addEventListener("click", event => {
      dropdownButtons.forEach(button => {
        if (!button.contains(event.target)) {
          const dropdownMenu = button.nextElementSibling;
          dropdownMenu.classList.remove("show");
        }
      });
    });
  }

});

