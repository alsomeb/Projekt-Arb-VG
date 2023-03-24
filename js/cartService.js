"use strict";

// metoden handleSetCartAmount() återanv för att sätta cart amount, samt i product.js jQuery listener när man lägger till varor i korgen

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
