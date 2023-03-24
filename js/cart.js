"use strict";
import { handleSetCartAmount } from "./cartService.js";
import { getAllProductsBackUp } from "./api.js";

handleSetCartAmount();
const currentCart = JSON.parse(localStorage.getItem("cart"));
const data = await getAllProductsBackUp();

// Renders default Cart UI, cards is rendered with handleRenderCards()
const renderCartUi = async () => {
  const cardSection = document.querySelector(".todo-cards");
  let totalSum = calcCurrentTotalSum();

  if (currentCart != null) {
    cardSection.innerHTML = `
    <h1 class="text-center h1">Review your cart</h1>
    <div class="total-cart text-center h2 mt-5">Total cart: ${totalSum} $</div>
    <div class="row" id="cardsrow">
    </div>
    <div class="text-center">
    <a href="#" class="btn btn-secondary my-5">Proceed to Checkout</a>
    </div>
    `;
  } else {
    cardSection.innerHTML = `<div class="text-center fw-bold h2 my-5">Your cart is empty, lets get shopping!</div>`;
  }
};

// Finds specific product
const findProductById = (id) => {
  return data.find((element) => element.id === id);
};

// Calc total sum of cart and to 1 dec precision
const calcCurrentTotalSum = () => {
  let sum = 0;

  currentCart.forEach((element) => {
    let itemId = element.id;
    let itemAmount = element.amount;
    console.log("ID: " + itemId + " AMOUNT: " + itemAmount);
    sum += findProductById(itemId).price * itemAmount;
  });

  return sum.toFixed(1);
};

// With LocalStorage 'cart' key we can find id and amount of product, then we can fetch full info regarding products and collect them to one array
const getFullInfoProductArray = () => {
  let array = [];

  currentCart.forEach((element) => {
    let itemId = element.id;
    let itemAmount = element.amount;
    const product = findProductById(itemId);
    for (let index = 0; index < itemAmount; index++) {
      array.push(product);
    }
  });

  return array;
};

// Renders Cards content, all products customer has added to cart
const handleRenderCards = () => {
  let html = "";
  let cards = getFullInfoProductArray();
  const cardsRowElement = document.getElementById("cardsrow");
  console.log(cardsRowElement);
  cards.forEach((element) => {
    console.log(element);
    let htmlSegment = `
    <div class="todo-column col-lg-4 col-md-6">
    <div class="card">
      <div class="card-header fw-bold text-center">${element.category}</div>
      <div class="card-body text-center">
        <div class="img-container mt-4">
          <img
            class="w-25 rounded"
            src="${element.image}"
            alt="product img"
          />
        </div>
        <p class="lead my-4 fs-6">
          ${element.title}
        </p>
        <div class="total-price fs-6 fw-bold">Total: todo$</div>
        <div class="amount fs-6 fw-bold">todo</div>
      </div>
      <div class="card-footer">
        <div class="update-buttons">
          <div class="box">
            <button class="increase btn btn-outline-secondary">
              <i class="fa-solid fa-plus"></i>
            </button>
            <button class="increase btn btn-outline-secondary">
              <i class="fa-solid fa-minus"></i>
            </button>
            <a class="btn btn-outline-danger" href="#">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    html += htmlSegment;
  });
  cardsRowElement.innerHTML = html;
};

renderCartUi();
handleRenderCards();
