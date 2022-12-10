import fetchData, {
  apiBaseUrl,
  categoriesEndpoint,
  fetchMealsByCategory,
} from "./fetchData.js";
import {
  readFromStorage,
  writeToStorage,
  storageKeys,
} from "./storageControl.js";

const categoriesFilterDiv = document.getElementById(
  "detailed-categories-filter"
);
const resultsContainer = document.getElementById("results-contaienr");

function createMealPreviewElement(meal) {
  const { idMeal, strMealThumb, strMeal } = meal;
  const recipeDiv = document.createElement("div");
  recipeDiv.className = "category-box";
  recipeDiv.setAttribute("id", idMeal);

  const recipeImg = document.createElement("img");
  recipeImg.setAttribute("src", strMealThumb);

  const recipeTitle = document.createElement("h4");
  recipeTitle.textContent = strMeal;

  recipeDiv.appendChild(recipeImg);
  recipeDiv.appendChild(recipeTitle);
  resultsContainer.appendChild(recipeDiv);
}

async function showMealsByCategory(category) {
  const { meals } = await fetchMealsByCategory(category);

  resultsContainer.innerHTML = "";

  meals.forEach((recipe) => {
    createMealPreviewElement(recipe);
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
    const { categories: remoteCategories } = await fetchData(
      apiBaseUrl + categoriesEndpoint
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

// 1. Add title for each recipe
// 2. Build recipes view and fetch data for each recipe
// 3. Handle search
// 4. Reset initial view when logo is clicked
// 5. Recipe of the day
// 6. Filter by country
// [DONE] 7. Cache data (local storage)
