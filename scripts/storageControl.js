const storageType = "localStorage";
const storageKeys = {
  categories: "categories",
  areas: "areas",
};
function readFromStorage(key) {
  const stringValue = window[storageType].getItem(key);
  const parsedValue = JSON.parse(stringValue);
  return parsedValue;
}
function writeToStorage(key, value) {
  window[storageType].setItem(key, JSON.stringify(value));
}
export { readFromStorage, writeToStorage, storageKeys };
