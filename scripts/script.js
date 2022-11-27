import fetchData, { apiBaseUrl, categoriesEndpoint } from "./fetchData.js";

const categoriesFilterDiv = document.getElementById(
  "detailed-categories-filter"
);

function createCategoryElement(categoryObj) {
  const { strCategory: title, strCategoryThumb: imgSrc } = categoryObj;

  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category-box";

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
  const { categories } = await fetchData(apiBaseUrl + categoriesEndpoint);

  categories.forEach((el) => {
    const newCategoryEl = createCategoryElement(el);
    categoriesFilterDiv.appendChild(newCategoryEl);
  });
}

main();
