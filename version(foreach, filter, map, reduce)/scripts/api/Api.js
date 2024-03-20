/**
 * Classe représentant une API pour effectuer des requêtes HTTP et transformer les données.
 */
class RecipeApi {
  /**
   * Crée une instance de RecipeApi.
   * @param {string} url - L'URL vers laquelle les requêtes seront effectuées.
   */
  constructor(url) {
    this._url = url;
  }

  /**
   * Effectue une requête HTTP GET pour récupérer les données.
   * @returns {Promise<object>} - Les données récupérées depuis l'API.
   */
  async get() {
    try {
      const response = await fetch(this._url);
      return await response.json();
    } catch (error) {
      console.error("Une erreur s'est produite", error);
      throw error; // Lève l'erreur pour un traitement ultérieur si nécessaire
    }
  }
}

/**
 * Classe héritant de RecipeApi, permettant de récupérer les données de recettes.
 * @extends RecipeApi
 */
export default class RecipesApi extends RecipeApi {
  /**
   * Crée une instance de RecipesApi pour récupérer les données de recettes.
   * @param {string} url - L'URL vers laquelle les requêtes seront effectuées pour les recettes.
   */
  constructor(url) {
    super(url);
  }

  /**
   * Récupère les données de recettes en utilisant la méthode héritée de RecipeApi.
   * @returns {Promise<object>} - Les données des recettes récupérées depuis l'API.
   */
  async getRecipes() {
    return await this.get();
  }
}
