"use strict";
import { getAllProductsBackUp } from "./api.js";
import { handleSetCartAmount, getCartAmount } from "./cartService.js";

handleSetCartAmount();

// LocalStorage Current Cart
const currentCart = JSON.parse(localStorage.getItem("cart"));

// Fetch All Products, so we can use getProductById()
const data = await getAllProductsBackUp();

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

const renderPage = () => {
  if (currentCart != null && currentCart.length > 0) {
    const amountInCartElement = $(".rounded-pill");
    const productsInCart = getFullInfoProductArray();
    renderCartHtml(productsInCart);
    amountInCartElement.text(getCartAmount);

    document
      .getElementById("checkout-button")
      .addEventListener("click", validate);
  } else {
    const checkOutContainer = $(".checkout-container");
    checkOutContainer.empty();
    checkOutContainer.append(
      `<div class="text-center fw-bold h2 my-5">Your cart is empty, lets get shopping!</div>`
    );
  }
};

const renderCartHtml = (arrayOfProducts) => {
  const cartListElement = $(".cart-list");
  arrayOfProducts.forEach((element) => {
    let totalPerProduct = (element.price * element.amount).toFixed(1);
    cartListElement.append(`
    <li class="list-group-item d-flex justify-content-between lh-sm">
    <div>
      <h6 class="my-0 mx-3">${element.title}</h6>
    </div>
      <span class="text-muted">${element.amount}x ${totalPerProduct}$</span>
      </li>`);
  });
};

renderPage();

// Validation of Form logic
function validate(e) {
  e.preventDefault(); // Gör så det inte postar formuläret (default)

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");

  const email = document.getElementById("email");
  const address = document.getElementById("address");
  const county = document.getElementById("county");
  const zip = document.getElementById("zip");

  const phoneNumber = document.getElementById("phoneNumber");

  const firstNameCorrect = nameIsCorrectLength(firstName);

  const lastNameCorrect = nameIsCorrectLength(lastName);

  const emailCorrect = emailIsCorrect(email);

  const phoneNrCorrectFormat = phoneNumberIsCorrect(phoneNumber);

  const addressCorrect = addressIsCorrect(address);
  const zipCorrect = zipIsCorrect(zip);
  const countyCorrect = countyIsCorrect(county);

  const formBools = [
    firstNameCorrect,
    lastNameCorrect,
    emailCorrect,
    phoneNrCorrectFormat,
    addressCorrect,
    zipCorrect,
    countyCorrect,
  ];

  checkFormIsValid(formBools);
}

const checkFormIsValid = (listOfBooleans) => {
  let checker = (listOfBooleans) =>
    listOfBooleans.every((element) => element === true);

  console.log(listOfBooleans);

  if (checker(listOfBooleans) === true) {
    console.log("Form Complete");
    // Simulate an HTTP redirect:
    window.location.replace("/confirmation.html");
  } else {
    console.log("Form not complete");
  }
};

function nameIsCorrectLength(name) {
  if (name.value.length <= 2 || name.value.length > 50) {
    name.classList.add("invalid");
    name.placeholder = "Please enter a valid name";
    return false;
  } else {
    name.classList.remove("invalid");
  }
  return true;
}

function emailIsCorrect(email) {
  if (
    !email.value.includes("@") ||
    email.value.length > 50 ||
    email.value.length == 0
  ) {
    email.classList.add("invalid");
    email.placeholder = "Please enter a valid email";
    return false;
  } else {
    email.classList.remove("invalid");
    return true;
  }
}

function phoneNumberIsCorrect(phoneNumber) {
  const validFormat = /^[\d()-]{1,50}$/gm;
  if (!phoneNumber.value.match(validFormat)) {
    phoneNumber.classList.add("invalid");
    phoneNumber.placeholder = "Not valid phone nr";
    return false;
  } else {
    phoneNumber.classList.remove("invalid");
    return true;
  }
}

function zipIsCorrect(zip) {
  const validZip = /^[0-9]{3} [0-9]{2}$/g;
  if (zip.value.match(validZip)) {
    zip.classList.remove("invalid");
    return true;
  } else {
    zip.classList.add("invalid");
    zip.placeholder = "XXX XX";
    return false;
  }
}

function addressIsCorrect(address) {
  if (address.value.length > 3 && address.value.length < 51) {
    address.classList.remove("invalid");
    return true;
  } else {
    address.classList.add("invalid");
    address.placeholder = "Please enter a valid address";
    return false;
  }
}

function countyIsCorrect(county) {
  if (county.value.length > 1 && county.value.length < 51) {
    county.classList.remove("invalid");
    return true;
  } else {
    county.classList.add("invalid");
    county.placeholder = "Enter a valid county";
    return false;
  }
}
