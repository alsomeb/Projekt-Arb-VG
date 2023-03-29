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

// Calc total sum of cart and to 1 dec precision
const calcCurrentTotalSum = () => {
  let sum = 0;

  currentCart.forEach((element) => {
    let itemId = element.id;
    let itemAmount = element.amount;
    sum += findProductById(itemId).price * itemAmount;
  });

  return sum.toFixed(1);
};

const renderPage = () => {
  const confirmationContainer = $(".confirmation");
  if (currentCart != null && currentCart.length > 0) {
    confirmationContainer.empty();
    const fullArray = getFullInfoProductArray();
    confirmationContainer.append(
      `<div class="text-center h2 my-5">Thank you for ordering the following:</div>`
    );
    renderProducts(fullArray, confirmationContainer);
    let totalSumCart = calcCurrentTotalSum();
    confirmationContainer.append(
      `<div class="text-center h4 mt-5">Your account will be billed ${totalSumCart} $ and items will ship today</div>
      <div class="text-center mt-5">
        <a class="btn btn-secondary mb-5" href="/index.html">Back to main</a>
      </div>`
    );
    localStorage.clear();
  } else {
    confirmationContainer.empty();
    confirmationContainer.append(
      `<div class="text-center fw-bold h2 my-5">Your cart is empty, lets get shopping!</div>`
    );
  }
};

const renderProducts = (array, container) => {
  array.forEach((element) => {
    let totalPerProduct = (element.price * element.amount).toFixed(1);
    container.append(
      `<div class="text-center fs-5 my-3"><strong>${element.amount}x</strong>, ${element.title} - ${totalPerProduct} $</div>`
    );
  });
};

renderPage();
