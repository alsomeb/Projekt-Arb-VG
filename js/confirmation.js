import { handleSetCartAmount } from "./cartService.js";
import { getAllProductsBackUp } from "./api.js";

handleSetCartAmount();
const currentCart = JSON.parse(localStorage.getItem("cart"));
const data = await getAllProductsBackUp();

// Återanvänder findProductById() & getFullInfoProductArray() för confirmation.html

// Finds specific product
const findProductById = (id) => {
  return data.find((element) => element.id === id);
};

// With LocalStorage 'cart' key we can find id and amount of product, then we can fetch full info regarding products and collect them to one array
const getFullInfoProductArray = () => {
  let array = [];

  currentCart.forEach((element) => {
    let itemId = element.id;
    let itemAmount = element.amount;
    const product = findProductById(itemId);
    product.amount = itemAmount; // lägger till amount property på befintlig objekt så vi vet hur många det rör sig om i kundvagnen, blir lättare också att räkna ut summa per produkt!
    array.push(product);
  });

  return array;
};

const fullArray = getFullInfoProductArray();
console.log(fullArray);
