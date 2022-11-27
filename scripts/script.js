import fetchData, { apiBaseUrl, categoriesEndpoint } from "./fetchData.js";

const categoriesFilterDiv = document.getElementById(
  "detailed-categories-filter"
);

function createCategoryElement(categoryObj) {
  const { strCategory, strCategoryThumb } = categoryObj;

  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category-box";

  const categoryThumb = document.createElement("img");
  categoryThumb.setAttribute("src", strCategoryThumb);
  categoryThumb.setAttribute("alt", `${strCategory} category image`);

  categoryDiv.appendChild(categoryThumb);
  return categoryDiv;
}

async function main() {
  const { categories } = await fetchData(apiBaseUrl + categoriesEndpoint);

  categories.forEach((el) => {
    const newCategoryEl = createCategoryElement(el);
    categoriesFilterDiv.appendChild(newCategoryEl);
  });
}

main();
