function recipesFactory(data) {
  const { id, name, ingredients, time, description } = data;

  let displayIngredients = "";

  ingredients.forEach((ingredient) => {
    let ingredientData = '';
    if (ingredient.unit) {
      ingredientData += ingredient.ingredient + ': ' + ingredient.quantity + " " + ingredient.unit;
    } else if (ingredient.quantity) {
      ingredientData = ingredient.ingredient + ': ' + ingredient.quantity;
    } else {
      ingredientData = ingredient.ingredient;
    }

    displayIngredients += "<li>" + ingredientData + "</li>";
  })

  function getRecipesCardDOM() {
    // console.log('getRecipesCardDOM() called');
    const rowCol = document.createElement('div');
    rowCol.classList.add('col-md-4');

    rowCol.insertAdjacentHTML(
      "beforeend",
      `
            <div class="card_container">
                <div class="card no-border">
                    <div class="card-image">
                        <span class="card-time">${time}min</span>
                        <img src="contents/recettes/Recette${id}.jpg" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">${name}</h4>
                        <div class="card-text">
                            <h5>RECETTE</h5>
                            <textarea>${description}</textarea>
                            <h5 class="h5-style">INGRÉDIENTS</h5>
                            <ul class="list-group list-group-flush">
                                ${displayIngredients}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
            `
    );

    return rowCol;
  }

  function displayFilters() {
    let filtersCard = document.createElement('div');
    filtersCard.insertAdjacentHTML("beforeend", `
          <div class="dropdown-wrapper">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Ingrédients
              </button>
              <ul class="dropdown-menu">
                <li>
                  <form class="px-4 py-3">
                    <input type="search" class="form-control">
                  </form>
                </li>
              </ul>
            </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Appareils
              </button>
              <ul class="dropdown-menu">
                <li>
                  <form class="px-4 py-3">
                    <input type="search" class="form-control">
                  </form>
                </li>
              </ul>
            </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Ustenstiles
              </button>
              <ul class="dropdown-menu">
                <li>
                  <form class="px-4 py-3">
                    <input type="search" class="form-control">
                  </form>
                </li>
              </ul>
            </div>
            <div class="recipe-count">
              ${newRecipes.length} recettes
            </div>
          </div>
        `);

    return filtersCard;
  }

  return { getRecipesCardDOM, displayFilters }
}