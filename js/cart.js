"use strict";
import { handleSetCartAmount } from "./cartService.js";
import { getAllProductsBackUp } from "./api.js";

handleSetCartAmount();
const currentCart = JSON.parse(localStorage.getItem("cart"));
const data = await getAllProductsBackUp();

// Renders default Cart UI, cards is rendered with handleRenderCards()
const renderCartUi = async () => {
  const cardSection = document.querySelector(".todo-cards");
  if (currentCart != null && currentCart.length > 0) {
    let totalSum = calcCurrentTotalSum();
    cardSection.innerHTML = `
    <h1 class="text-center h1">Review your cart</h1>
    <div class="total-cart text-center h2 mt-5">Total cart: ${totalSum} $</div>
    <div class="text-center mt-5">
    <a href="#" class="btn btn-secondary">Proceed to Checkout</a>
    <a href="#" class="btn btn-danger">Clear Cart</a>
    </div>
    <div class="row" id="cardsrow">
    </div>
    `;
    handleRenderCards();
  } else {
    cardSection.innerHTML = `<div class="text-center fw-bold h2 my-5">Your cart is empty, lets get shopping!</div>`;
  }
};

// Finds specific product
const findProductById = (id) => {
  return data.find((element) => element.id === id);
};

const refresh = () => {
  window.location.reload();
};

// Listener +/- knappar samt delete
$(document).ready(function () {
  $(".increase").click(function () {
    handleIncreasingProductAmount(this.id);
    handleSetCartAmount();
    refresh();
  });

  $(".decrement").click(function () {
    handleDecreasingProductAmount(this.id);
    handleSetCartAmount();
    refresh();
  });

  $(".delete").click(function () {
    let id = $(this).prop("id");
    handleDeleteAnimation(id);
    handleDeletingProductFromCart(id);
    handleSetCartAmount();
  });
});

// Logic + knapp
const handleIncreasingProductAmount = (productId) => {
  const arrUpdate = JSON.parse(localStorage.getItem("cart"));
  arrUpdate.map((element) => {
    if (element.id == productId) {
      element.amount += 1;
      localStorage.setItem("cart", JSON.stringify(arrUpdate));
      $("#" + element.id).text(`Amount: ${element.amount}x`);
    }
  });
};

// Logic - knapp
const handleDecreasingProductAmount = (productId) => {
  const arrUpdate = JSON.parse(localStorage.getItem("cart"));
  arrUpdate.map((element) => {
    if (element.id == productId && element.amount > 1) {
      element.amount -= 1;
      localStorage.setItem("cart", JSON.stringify(arrUpdate));
      $("#" + element.id).text(`Amount: ${element.amount}x`);
    }
  });
};

// jQuery Delete Animation
const handleDeleteAnimation = (id) => {
  let cardId = `card-${id}`;
  $(`#${cardId}`).fadeOut("slow", () => {
    refresh();
  });
};

// Logic Delete knapp
const handleDeletingProductFromCart = (productId) => {
  const cartArr = JSON.parse(localStorage.getItem("cart"));
  const updatedArray = cartArr.filter((element) => element.id != productId);
  console.log(updatedArray);
  console.log(updatedArray.length);
  localStorage.setItem("cart", JSON.stringify(updatedArray));
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

// jQuery Hoover effect function which takes 2 args, "color"
const borderHooverEffect = (mouseOverColor, mouseOutColor) => {
  $(".card").mouseover(function () {
    $(this).css("border-color", mouseOverColor);
    $(this).css("border-width", "2px");
  });
  $(".card").mouseout(function () {
    $(this).css("border-color", mouseOutColor);
    $(this).css("border-width", "1px");
  });
};

// Renders Cards content, all products customer has added to cart
const handleRenderCards = () => {
  let cards = getFullInfoProductArray();
  const cardsRowJquery = $("#cardsrow"); // using jQuery Selector

  cards.forEach((element) => {
    let totalPerProduct = (element.price * element.amount).toFixed(1);
    cardsRowJquery.append(`
    <div class="todo-column col-lg-4 col-md-6">
    <div class="card" id="card-${element.id}">
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
        <div id="${element.price}" class="fs-6 fw-bold">Unit Price: ${element.price} $</div>
        <div id="${element.id}" class="amount fs-6 fw-bold">Amount: ${element.amount}x</div>
        <div class="total-price fs-5 fw-bold mt-3">Total: ${totalPerProduct} $</div>
      </div>
      <div class="card-footer">
        <div class="update-buttons">
          <div class="box">
            <button id ="${element.id}" class="increase btn btn-outline-secondary">
              <i class="fa-solid fa-plus"></i>
            </button>
            <button id="${element.id}" class="decrement btn btn-outline-secondary">
              <i class="fa-solid fa-minus"></i>
            </button>
            <button id="${element.id}" class="delete btn btn-outline-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>`);
  });

  borderHooverEffect("#36AE7C", "lightgray");
};

renderCartUi();
