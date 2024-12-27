// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// Ketika hamburger menu di klik
document.getElementById("hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle clas active for search
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Initialize cart
let cart = [];

// Add to cart button functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.onclick = (e) => {
    e.preventDefault();
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = parseInt(
      button
        .closest(".menu-item")
        .querySelector(".price")
        .textContent.replace(/[^0-9]/g, "")
    );
    addToCart(id, name, price);
    updateCartDisplay();
  };
});

function addToCart(id, name, price) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
}

function updateCartDisplay() {
  const cartElement = document.querySelector(".shopping-cart");
  const quantityElement = document.querySelector(".quantity");
  cartElement.innerHTML = ""; // Clear current cart items

  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.name.toLowerCase().replace(/\s/g, "")}.jpg" alt="${
      item.name
    }">
      <div class="item-detail">
        <h3>${item.name}</h3>
        <div class="item-price">Rp ${item.price.toLocaleString()}</div>
        <div class="item-quantity">Quantity: ${item.quantity}</div>
      </div>
      <i data-feather="trash-2" class="remove" data-id="${item.id}"></i>
    `;
    cartElement.appendChild(cartItem);
    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  quantityElement.textContent = totalQuantity;

  // Menambahkan elemen untuk menampilkan total harga
  const totalPriceElement = document.createElement("div");
  totalPriceElement.classList.add("total-price");
  totalPriceElement.innerHTML = `
    <h3>Total Price: Rp ${totalPrice.toLocaleString()}</h3>
  `;
  cartElement.appendChild(totalPriceElement);

  feather.replace();
}

// Remove from cart functionality
document
  .querySelector(".shopping-cart")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("remove")) {
      const itemId = event.target.dataset.id;
      const itemIndex = cart.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCartDisplay();
      }
    }
  });

// Toggle class active for shopping-cart
const shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Click outside the shopping cart to close
const shoppingbutton = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!shoppingbutton.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Klik di luar elemen hamburger menu
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Klikl di luar elemen seacrh form
const searchbutton = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!searchbutton.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

// Massage on the page reservation
const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener("click", () => {
  alert(
    "Thank you for your reservation! We will contact you soon for confirmation."
  );
});

// Massage on the page contact
const contact = document.querySelector('button[type="submit"]');

contact.addEventListener("click", () => {
  alert("Thank you for contacting us.");
});


