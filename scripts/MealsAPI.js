class MealsAPI {
  #baseUrl = "https://www.themealdb.com/api/json/v1/1";
  endpoints = {
    categories: "/categories.php",
    filter: "/filter.php",
    lookup: "/lookup.php",
    recipeOfTheDay: "/random.php",
  };
  maxCacheSize = 20;

  static cache = new Map();

  constructor(apiBaseUrl, endpoints) {
    if (apiBaseUrl) this.#baseUrl = apiBaseUrl;
    if (endpoints) this.endpoints = endpoints;
  }

  static clearCache() {
    MealsAPI.cache = {};
  }

  #optimizeCache() {
    if (MealsAPI.cache.size < this.maxCacheSize) return;

    // const arr = Array.from(MealsAPI.cache);
    // arr.shift();

    // MealsAPI.cache = new Map(arr);
    MealsAPI.cache.delete(Array.from(MealsAPI.cache)[0][0]);
  }

  async get(endpoint, ...queryParams) {
    const queryString = queryParams.length > 0 ? queryParams.join("&") : "";

    const url =
      this.#baseUrl + endpoint + (queryString ? "?" + queryString : "");

    if (MealsAPI.cache.has(url)) {
      return MealsAPI.cache.get(url);
    }

    return fetch(url)
      .then((response) => response.json())
      .then((result) => {
        this.#optimizeCache();
        MealsAPI.cache.set(url, result);
        return result;
      })
      .catch((err) => {
        alert("Something went wrong, see console for more details.");
        console.error(err);
      });
  }
}

export default MealsAPI;
