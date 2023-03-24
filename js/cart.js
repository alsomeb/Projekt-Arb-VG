"use strict";
import { handleSetCartAmount } from "./cartService.js";
import { getAllProductsBackUp } from "./api.js";

handleSetCartAmount();
const currentCart = JSON.parse(localStorage.getItem("cart"));
const data = await getAllProductsBackUp();

// cart.html logic

const renderCartUi = async () => {
  const cardSection = document.querySelector(".todo-cards");

  if (currentCart != null) {
    cardSection.innerHTML = `
    <h1 class="text-center h1">Review your cart</h1>
    <div class="total-cart text-center h2 my-5">Total cart: -$</div>
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

renderCartUi();

const calcCurrentSum = () => {
  currentCart.forEach((element) => {
    let itemId = element.id;
    let itemAmount = element.amount;
    console.log("ID: " + itemId + " AMOUNT: " + itemAmount);
  });
};

calcCurrentSum();
