"use strict";
import { getAllProductsBackUp, getAllProducts } from "./api.js";
import { handleSetCartAmount } from "./cartService.js";

// const data = await getProducts(30);
const data = await getAllProductsBackUp();

// set cart amount
handleSetCartAmount();

console.log(data);

const renderCards = (prodList) => {
  let html = "";

  prodList.forEach((element) => {
    let htmlSegment = `
    <div class="col-lg-4 col-md-6">
    <div class="card mb-4 rounded-3 shadow-sm border-black">
      <div
        class="py-3 text-black border-black"
      >
      <img class="card-img-top w-25 rounded" src="${element.image}" alt="Card image cap">
      </div>
      <div class="card-body">
        <p class="lead">${element.title}</p>
        <h2 class="card-title pricing-card-title my-3">
        ${element.price}<small class="text-muted fw-light"> $</small>
        </h2>
        <a href="/product.html" id="${element.id}" class="w-100 btn btn-lg btn-dark save-id">
          Show more
        </a>
      </div>
    </div>
  </div>
    `;

    html += htmlSegment;
  });

  const productsDiv = document.querySelector(".products");
  productsDiv.innerHTML = html;
};

// Render UI Cards
renderCards(data);

// Listener for save-id a btn
const showMoreBtn = document.querySelectorAll(".save-id");

showMoreBtn.forEach((element) => {
  const itemId = element.id;

  // Save id for later use in LocalStorage
  element.addEventListener("click", () => {
    localStorage.setItem("ID", JSON.stringify(itemId));
  });
});
