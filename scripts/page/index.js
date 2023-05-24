// Récupération des données de l'API et affichage des recettes et des filtres
async function init() {
    let recipes = await getRecipes();
    let filters = getFilters();
    displayRecipes(recipes);
    displayFilters(filters);
}

init();

// Récupération des recettes depuis le fichier recipes.js
async function getRecipes() {
    try {
        const response = await fetch("http://localhost:5501/data/recipes.js");
        if (response.ok) {
            const recipes = await response.json();
            return recipes;
        } else {
            throw new Error("Failed to fetch recipes data.");
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Récupération des filtres depuis le fichier filters.js
function getFilters() {

    const filters = {
        ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        appliances: ["Appliance 1", "Appliance 2", "Appliance 3"],
        ustensils: ["Ustensil 1", "Ustensil 2", "Ustensil 3"],
    };

    return filters;
}

// Affichage des recettes dans la page
function displayRecipes(recipes) {
    const recipesContainer = document.querySelector(".recipes");
    recipesContainer.innerHTML = "";

    if (Array.isArray(recipes)) {
        recipes.forEach((recipe) => {
            const recipeCard = createRecipeCard(recipe);
            recipesContainer.appendChild(recipeCard);
        });
    }
}

// Affichage des filtres ingrédients appareils ustensiles
function displayFilters(filters) {
    const filtersContainer = document.querySelector(".filters");
    filtersContainer.innerHTML = "";

    const ingredientsContainer = document.createElement("div");
    ingredientsContainer.classList.add("filters__ingredients");
    ingredientsContainer.innerHTML = `
        <h3 class="filters__title">Ingrédients</h3>
        <div class="filters__list"></div>
    `;
    filtersContainer.appendChild(ingredientsContainer);

    const appliancesContainer = document.createElement("div");
    appliancesContainer.classList.add("filters__appliances");
    appliancesContainer.innerHTML = `
        <h3 class="filters__title">Appareils</h3>
        <div class="filters__list"></div>
    `;
    filtersContainer.appendChild(appliancesContainer);

    const ustensilsContainer = document.createElement("div");
    ustensilsContainer.classList.add("filters__ustensils");
    ustensilsContainer.innerHTML = `
        <h3 class="filters__title">Ustensiles</h3>
        <div class="filters__list"></div>
    `;
    filtersContainer.appendChild(ustensilsContainer);

    filters.ingredients.forEach((ingredient) => {
        const ingredientItem = document.createElement("div");
        ingredientItem.classList.add("filters__item");
        ingredientItem.innerHTML = `
            <input type="checkbox" id="${ingredient}" name="${ingredient}" value="${ingredient}">
            <label for="${ingredient}">${ingredient}</label>
        `;
        ingredientsContainer.querySelector(".filters__list").appendChild(ingredientItem);
    });

    filters.appliances.forEach((appliance) => {
        const applianceItem = document.createElement("div");
        applianceItem.classList.add("filters__item");
        applianceItem.innerHTML = `
            <input type="checkbox" id="${appliance}" name="${appliance}" value="${appliance}">
            <label for="${appliance}">${appliance}</label>
        `;
        appliancesContainer.querySelector(".filters__list").appendChild(applianceItem);
    });

    filters.ustensils.forEach((ustensil) => {
        const ustensilItem = document.createElement("div");
        ustensilItem.classList.add("filters__item");
        ustensilItem.innerHTML = `
            <input type="checkbox" id="${ustensil}" name="${ustensil}" value="${ustensil}">
            <label for="${ustensil}">${ustensil}</label>
        `;
        ustensilsContainer.querySelector(".filters__list").appendChild(ustensilItem);
    });
}

// Export des fonctions requises
window.createRecipeCard = createRecipeCard;
window.displayFilters = displayFilters;
window.getFilters = getFilters;