"use strict";
import { getAllProductsBackUp } from "./api.js";
import { handleSetCartAmount } from "./cartService.js";

handleSetCartAmount();

const renderSucessMessage = async () => {
  // Fetch Item From LocalStorage
  const productID = JSON.parse(localStorage.getItem("ID"));

  const getProductById = (productID, list) => {
    return list.filter((element) => element.id == productID);
  };

  const confirmationDiv = document.querySelector(".confirmation");
  if (productID == null) {
    confirmationDiv.innerHTML = `<h1 class="my-5"> Nothing to see here </h1>`;
  } else {
    const data = await getAllProductsBackUp();
    const product = getProductById(productID, data)[0];

    let htmlContent = `
    <div class="img-thumbnail"> 
    <h1 class="my-5">THANK YOU FOR ORDERING THE FOLLOWING ITEM:</h1>
      <img class=my-5" src="${product.image}" width=100px height=100px style="object-fit: fill">
      <h2 class="my-5"> ${product.title}</h2>
      <p class="my-5 lead fs-4"><strong>Category:</strong> ${product.category}</p>
      <p class="my-5 lead fs-4"><strong>Description:</strong> ${product.description}</p>
      <p class="my-5 lead fs-4"><strong>Price: </strong> ${product.price} $</p>
      <p class="my-5 lead fs-4"><strong>Rating:</strong> ${product.rating.rate}/5 (${product.rating.count} votes)</p>
      </div>`;

    confirmationDiv.innerHTML = htmlContent;

    // Reset localStorage
    localStorage.clear();
  }
};

await renderSucessMessage();
