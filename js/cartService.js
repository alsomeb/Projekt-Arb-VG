"use strict";
import { getAllProductsBackUp } from "./api.js";

// metoden handleSetCartAmount() återanv för att sätta cart amount, samt i product.js jQuery listener när man lägger till varor i korgen

const getProductById = async (productID) => {
  const data = await getAllProductsBackUp();
  return await data.filter((element) => element.id == productID);
};

const getCartAmount = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  let amount = 0;

  if (cart != null) {
    cart.forEach((element) => {
      amount += element.amount;
    });
  }

  console.log(`${amount} items in cart`);

  return amount;
};

export const handleSetCartAmount = () => {
  const amount = getCartAmount();

  const cartSpanElement = document.querySelector(".cart-amount");

  const cartSpanValue = amount >= 1 ? amount : "Empty";

  cartSpanElement.textContent = cartSpanValue;
};

export const calcSumInCart = (arrayOfProducts) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let amount = 0;

  for (let index = 0; index < arrayOfProducts.length; index++) {
    const element = array[index];
    console.log(element);
  }

  return amount;
};
