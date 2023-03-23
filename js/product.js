"use strict";
import { getAllProductsBackUp } from "./api.js";

// Fetch Item From LocalStorage
const productID = JSON.parse(localStorage.getItem("ID"));

const data = await getAllProductsBackUp();

const getProductById = (productID) => {
  return data.filter((element) => element.id == productID);
};

const product = getProductById(productID)[0];

const renderProduct = (data) => {
  // Ändra InnerHTML efter products värden
  const specificProductDiv = document.querySelector(".jumbo-product");

  //A HREFEN SKA ÄNDRAS FRÅN CHECKOUT I VG-DELEN
  let htmlContent = `
        <img class=my-5" src="${data.image}" width=200px height=200px style="object-fit: fill">
        <h2 class="my-5"> ${data.title}</h2>
        <p class="my-5 lead fs-4"><strong>Category:</strong> ${data.category}</p>
        <p class="my-5 lead fs-4"><strong>Description:</strong> ${data.description}</p>
        <p class="my-5 lead fs-4"><strong>Price: </strong> ${data.price} $</p>
        <p class="my-5 lead fs-4"><strong>Rating:</strong> ${data.rating.rate}/5 (${data.rating.count} votes)</p>
        <button class="my-3 w-100 btn btn-lg btn-dark add"> 
          Add to cart
        </button>
        `;

  specificProductDiv.innerHTML = htmlContent;
};

renderProduct(product);

// jQuery Listener for Button i Product.html
$(document).ready(function () {
  $("button").click(function () {
    handleAddToCart(product);
  });
});

// Logic for Cart
// Jag har ändrat objektens format till ex {id: 1, amount: 2} för varje objekt i varukorgen.
// Behöver bara ha en identiferare och antal för detta objekt, mer clean.
// Jag kan använda detta id på produkten i localStorage för att hämta dens fulla information mha FETCH från FakeStore APIn.

const handleAddToCart = (productToAppendToCart) => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (cart == null) {
    handleAddNewCartItem(productToAppendToCart);
  } else {
    handleCheckIfProductAlreadyExistInCart(productToAppendToCart, cart);
  }
};

const handleCheckIfProductAlreadyExistInCart = (productToAppend, cartArr) => {
  if (cartArr.some((item) => item.id === productToAppend.id)) {
    const arrUpdate = JSON.parse(localStorage.getItem("cart"));
    handleArrayUpdate(arrUpdate, productToAppend);
  } else {
    handleAddNewCartItemInExistingCart(productToAppend);
  }
};

const handleArrayUpdate = (arrayToUpdate, productToAppend) => {
  arrayToUpdate.map((element) => {
    if (element.id === productToAppend.id) {
      element.amount += 1;
    }
  });

  localStorage.setItem("cart", JSON.stringify(arrayToUpdate));
};

const handleAddNewCartItem = (productToAppendToCart) => {
  const newCart = [];

  const cartItem = {
    id: productToAppendToCart.id,
    amount: 1,
  };

  newCart.push(cartItem);

  localStorage.setItem("cart", JSON.stringify(newCart));
};

const handleAddNewCartItemInExistingCart = (productToAppend) => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const cartItem = {
    id: productToAppend.id,
    amount: 1,
  };

  cart.push(cartItem);

  localStorage.setItem("cart", JSON.stringify(cart));
};
