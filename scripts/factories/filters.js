// Création un objet global pour stocker les fonctions exportées
const Filters = {};

// Filtrer les recettes en fonction des filtres sélectionnés
Filters.filterRecipesByFilters = function (recipes, filters) {
    let filteredRecipes = [...recipes];

    // Filtrer par ingrédients
    const selectedIngredients = getSelectedFilters(filters.ingredients);
    if (selectedIngredients.length > 0) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
            recipe.ingredients.some((ingredient) =>
                selectedIngredients.includes(ingredient.name)
            )
        );
    }

    // Filtrer par appareils
    const selectedAppliances = getSelectedFilters(filters.appliances);
    if (selectedAppliances.length > 0) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
            selectedAppliances.includes(recipe.appliance)
        );
    }

    // Filtrer par ustensiles
    const selectedUstensils = getSelectedFilters(filters.ustensils);
    if (selectedUstensils.length > 0) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
            recipe.ustensils.some((ustensil) =>
                selectedUstensils.includes(ustensil)
            )
        );
    }

    return filteredRecipes;
}

// Filtrer les filtres en fonction de la recherche
Filters.filterFiltersBySearch = function (filters, searchQuery) {
    const filteredFilters = {
        ingredients: [],
        appliances: [],
        ustensils: []
    };

    // Filtrer les ingrédients
    filteredFilters.ingredients = filters.ingredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filtrer les appareils
    filteredFilters.appliances = filters.appliances.filter((appliance) =>
        appliance.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filtrer les ustensiles
    filteredFilters.ustensils = filters.ustensils.filter((ustensil) =>
        ustensil.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredFilters;
}

// Filtrer les recettes en fonction du critère de recherche
Filters.filterRecipesByCriterion = function (recipes, criterion) {
    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(criterion.toLowerCase())
    );

    return filteredRecipes;
}

// Filtrer les filtres en fonction des recettes affichées
Filters.filterFiltersByRecipes = function (filters, recipes) {
    const filteredFilters = {
        ingredients: [],
        appliances: [],
        ustensils: []
    };

    // Filtrer les ingrédients
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            if (!filteredFilters.ingredients.includes(ingredient.name)) {
                filteredFilters.ingredients.push(ingredient.name);
            }
        });
    });

    // Filtrer les appareils
    recipes.forEach((recipe) => {
        if (!filteredFilters.appliances.includes(recipe.appliance)) {
            filteredFilters.appliances.push(recipe.appliance);
        }
    });

    // Filtrer les ustensiles
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            if (!filteredFilters.ustensils.includes(ustensil)) {
                filteredFilters.ustensils.push(ustensil);
            }
        });
    });

    return filteredFilters;
}

// Obtenir les filtres sélectionnés
Filters.getSelectedFilters = function (filters) {
    const selectedFilters = Array.from(filters)
        .filter((filter) => filter.checked)
        .map((filter) => filter.value);

    return selectedFilters;
}

// Export des fonctions et de la classe du module
window.Filters = Filters;