"use strict";
import { handleSetCartAmount, calcSumInCart } from "./cartService.js";
import { getAllProductsBackUp } from "./api.js";

handleSetCartAmount();
const currentCart = JSON.parse(localStorage.getItem("cart"));

// cart.html logic

const renderCartUi = async () => {
  const cardSection = document.querySelector(".todo-cards");

  if (currentCart != null) {
    cardSection.innerHTML = `
    <h1 class="text-center h1">Review your cart</h1>
    <div class="total-cart text-center h2 my-5">Total cart: $</div>
    <div class="row">
    </div>
    <div class="text-center">
    <a href="#" class="btn btn-secondary my-5">Proceed to Checkout</a>
    </div>
    `;
  } else {
    cardSection.innerHTML = `<div class="text-center fw-bold h2 my-5">Your cart is empty, lets get shopping!</div>`;
  }
};

// Used in renderCardsInCart()
const getProductById = (productID) => {
  let data;
  getAllProductsBackUp().then((json) => {
    data = json.filter((element) => element.id == productID)[0];
    console.log(data);
  });
};

// Här hämtar vi full productObject mha localStorage id från APIn
const getProductsFullInfoArray = (currentCart) => {
  const array = [];
  currentCart.forEach((element) => {
    let currentId = element.id;
    let amount = element.amount; // hur många gånger vi skall pusha in product i array
    const fullProduct = getProductById(currentId); // TODO ÄNDRA
    for (let index = 0; index < amount; index++) {
      array.push(fullProduct);
    }
  });

  return array;
};

const renderCardsInCart = (fullDescArray) => {
  const rowElement = document.querySelector(".cardsrow");
  //console.log(fullDescArray);
};

// Renders base cart UI
renderCartUi();
const arrayFull = getProductsFullInfoArray(currentCart);
console.log(arrayFull); // funkar ej ?
