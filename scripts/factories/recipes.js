// Création un objet global pour stocker les fonctions exportées
const Recipes = {};

// Liste des recettes
Recipes.Recipe = function (id, name, servings, ingredients, time, description, appliance, ustensils, thumbnail) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
    this.thumbnail = thumbnail;
};

// Créer une carte de recette
Recipes.createRecipeCard = function (recipe) {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const recipeImage = document.createElement("div");
    recipeImage.classList.add("recipe-card__img");
    recipeImage.innerHTML = `<img src="${recipe.thumbnail}" alt="${recipe.name}">`;
    recipeCard.appendChild(recipeImage);

    const recipeContent = document.createElement("div");
    recipeContent.classList.add("recipe-card__content");
    recipeContent.innerHTML = `
      <h2 class="recipe-card__title">${recipe.name}</h2>
      <p class="recipe-card__description">${recipe.description}</p>
      <a href="#" class="recipe-card__link">Voir la recette</a>
    `;
    recipeCard.appendChild(recipeContent);

    return recipeCard;
}

// Créer une liste de recettes
Recipes.createRecipeList = function (items, className, propertyName) {
    const list = document.createElement("ul");
    list.classList.add(className);

    items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add(`${className}__item`);
        listItem.textContent = item[propertyName];

        list.appendChild(listItem);
    });

    return list;
}

// Créer une liste d'ingrédients
Recipes.createRecipeIngredients = function (recipe) {
    return createRecipeList(recipe.ingredients, "recipe-ingredient", "ingredient");
}

// Créer une liste d'ustensiles
Recipes.createRecipeUstensils = function (recipe) {
    return createRecipeList(recipe.ustensils, "recipe-ustensil", "");
}

// Créer une liste d'appareils
Recipes.createRecipeAppliance = function (recipe) {
    return createRecipeList([recipe.appliance], "recipe-appliance", "");
}

// Créer une liste de temps
Recipes.createRecipeTime = function (recipe) {
    return createRecipeList([recipe.time], "recipe-time", "");
}

// Créer une liste de description
Recipes.createRecipeDescription = function (recipe) {
    return createRecipeList([recipe.description], "recipe-description", "");
}

// Créer une liste de portions
Recipes.createRecipeServings = function (recipe) {
    return createRecipeList([recipe.servings], "recipe-servings", "");
}

// Créer une liste de noms
Recipes.createRecipeName = function (recipe) {
    return createRecipeList([recipe.name], "recipe-name", "");
}

// Créer une liste d'identifiants
Recipes.createRecipeId = function (recipe) {
    return createRecipeList([recipe.id], "recipe-id", "");
}

// Export des fonctions et de la classe du module
window.Recipes = Recipes;