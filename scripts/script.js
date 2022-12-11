// import fetchData, {
//   apiBaseUrl,
//   categoriesEndpoint,
//   fetchMealsByCategory,
//   fetchMealById,
// } from "./fetchData.js";
import MealsAPI from "./MealsAPI.js";
import {
  readFromStorage,
  writeToStorage,
  storageKeys,
} from "./storageControl.js";

const mealsApi = new MealsAPI();

const categoriesFilterDiv = document.getElementById(
  "detailed-categories-filter"
);
const resultsContainer = document.getElementById("results-contaienr");

async function visualizeMealById(event) {
  const id = event.currentTarget.id;
  // const {
  //   meals: [recipe],
  // } = await fetchMealById(id);
  const {
    meals: [recipe],
  } = await mealsApi.get(mealsApi.endpoints.lookup, "i=" + id);

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    strInstructions,
    strSource,
  } = recipe;

  resultsContainer.innerHTML = "";

  const htmlString = `
  <div>
    <h2>${strMeal}</h2>
    <h4>
      <a href=${strSource} target="_blank"
        >Original Source</a
      >
    </h4>
    <img
      src=${strMealThumb}
      alt=${strMeal} 
    />
    <table>
      <tr>
        <th>Category</th>
        <th>Origin</th>
      </tr>
      <tr>
        <td>${strCategory}</td>
        <td>${strArea}</td>
      </tr>
    </table>
    <p>
      ${strInstructions}
    </p>
  </div>
  `;

  resultsContainer.insertAdjacentHTML("afterbegin", htmlString);
  // create recipe view
  // append recipe view to results container
}

function createMealPreviewElement(meal) {
  const { idMeal, strMealThumb, strMeal } = meal;
  const recipeDiv = document.createElement("div");
  recipeDiv.className = "category-box";
  recipeDiv.setAttribute("id", idMeal);
  recipeDiv.addEventListener("click", visualizeMealById);

  const recipeImg = document.createElement("img");
  recipeImg.setAttribute("src", strMealThumb + "/preview");

  const recipeTitle = document.createElement("h4");
  recipeTitle.textContent = strMeal;

  recipeDiv.appendChild(recipeImg);
  recipeDiv.appendChild(recipeTitle);
  resultsContainer.appendChild(recipeDiv);
}

async function showMealsByCategory(category) {
  // const { meals } = await fetchMealsByCategory(category);
  const { meals } = await mealsApi.get(
    mealsApi.endpoints.filter,
    "c=" + category
  );

  resultsContainer.innerHTML = "";

  meals.forEach((recipe) => {
    createMealPreviewElement(recipe);
  });

  // if (window.innerHeight < window.innerWidth) {
  //   window.scrollTo({ top: 0 });
  // } else {
  //   window.scrollTo(0, resultsContainer.offsetTop);
  // }
  // window.scrollTo(0, resultsContainer.offsetTop);
  window.scrollTo({
    top: resultsContainer.offsetTop,
  });
}

function createCategoryElement(categoryObj) {
  const { strCategory: title, strCategoryThumb: imgSrc } = categoryObj;

  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category-box";
  categoryDiv.addEventListener("click", () => showMealsByCategory(title));

  const categoryThumb = document.createElement("img");
  categoryThumb.setAttribute("src", imgSrc);
  categoryThumb.setAttribute("alt", `${title} category image`);

  const categoryTitle = document.createElement("h4");
  categoryTitle.textContent = title;

  categoryDiv.appendChild(categoryThumb);
  categoryDiv.appendChild(categoryTitle);
  return categoryDiv;
}

async function main() {
  let categories = [];
  categories = readFromStorage(storageKeys.categories);

  if (!categories) {
    // const { categories: remoteCategories } = await fetchData(
    //   apiBaseUrl + categoriesEndpoint
    // );
    const { categories: remoteCategories } = await mealsApi.get(
      mealsApi.endpoints.categories
    );
    categories = remoteCategories;
    writeToStorage(storageKeys.categories, categories);
  }

  categories.forEach((el) => {
    const newCategoryEl = createCategoryElement(el);
    categoriesFilterDiv.appendChild(newCategoryEl);
  });
}

main();

// [DONE] 1. Add title for each recipe
// 2. Build recipes view and fetch data for each recipe
// 3. Handle search
// 4. Reset initial view when logo is clicked
// 5. Recipe of the day
// 6. Filter by country
// [DONE] 7. Cache data (local storage)
// [DONE] 8. Scroll to result container
