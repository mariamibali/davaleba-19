import { results } from "./results.js";
// 1.
const button = document.getElementById("myButton");
button.addEventListener("click", function () {
  this.remove();
});

// 2.
const bodyElement = document.querySelector("body");
const photo = document.createElement("img");
photo.setAttribute(
  "src",
  "https://fastly.picsum.photos/id/534/1000/800.jpg?hmac=tFbU1nZ2RnQNroI_ToBhH-LFB8KNjyWoc3bVv5G9Wkw"
);
bodyElement.appendChild(photo);
photo.style.width = "300px";

// 4.
const cardsContainer = document.createElement("div");
cardsContainer.classList.add("cards-container");
const imagesList = document.getElementById("images-list");
imagesList.appendChild(cardsContainer);

function renderCards() {
  return results
    .map(
      (el) =>
        `<div class="card" data-id="${el.id}">
        <img src="${el.webImage.url}" alt="${el.title}" />
        <div class="card-content">
            <div class="details-info">
                <h3>${el.title}</h3>
            </div>
            <div class="buttons">
                <button class="details">see more details</button>
                <button class="remove">remove card</button>
            </div>
        </div>
      </div>`
    )
    .join("");
}
cardsContainer.innerHTML = renderCards();

// 5.
const removeBtn = (e) => {
  const cardToRemove = e.target.closest(".card");
  cardToRemove.remove();
};

const detailsBtn = (e) => {
  const card = e.target.closest(".card");
  const infoBox = card.querySelector(".details-info");
  const id = card.dataset.id;
  const item = results.find((el) => el.id === id);

  if (infoBox.classList.contains("open")) {
    infoBox.innerHTML = `<h3>${item.title}</h3>`;
    infoBox.classList.remove("open");
    e.target.textContent = "see more details";
  } else {
    infoBox.innerHTML = `
        <h3>${item.longTitle}</h3>
        <p>for more information visit</p>
        <a href="${item.links.web}" target="_blank">Here</a>
    `;
    infoBox.classList.add("open");
    e.target.textContent = "see less";
    e.target.classList.add("active");
  }
};

function initBtns() {
  const removeButton = document.querySelectorAll(".remove");
  removeButton.forEach((btn) => btn.addEventListener("click", removeBtn));

  const detailsButton = document.querySelectorAll(".details");
  detailsButton.forEach((btn) => btn.addEventListener("click", detailsBtn));
}
initBtns();
