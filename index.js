let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let clearpro = document.querySelector(".btn-buy");
let span = document.querySelector(".span");

//OPEN CART
cartIcon.onclick = () => {
  cart.classList.add("active");
};

//CLOSES CART
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//CART WORKING
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// ..making function
function ready() {
  //remove items from cart
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //quantity changes
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChange);
  }
  //   //add to cart
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
}

//buy button work

clearpro.addEventListener("click", buyButtonClicked);

//buy button
function buyButtonClicked() {
  document.querySelector(".cart-content").innerHTML = "";
  updatenull();
  alert("Thank you for your purchase! Your cart will be cleared.");
}

// ..remove item from cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
  updatenull();
}
//Quantity change
function quantityChange(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}
// ..Add to Cart
function addCartClicked(event) {
  let button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImage = shopProducts.getElementsByClassName("product-img")[0].src;
  console.log(title, price, productImage);
  addProductToCart(title, price, productImage);
  updateTotal();
}

function addProductToCart(title, price, productImage) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItemsNames[i].innerText == title)
      alert("You can't add more than one product to cart");
    return;
  }

  var cartBoxContent = `<img src="${productImage}" alt="" class="cart-img"/>
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <label for="quantity">Quantity</label>
                            <input type="number" value="1" id="quantity" class="cart-quantity"/>
                        </div>
                        <i class="bx bxs-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChange);
}

//update total{}
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("Kshs", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
    //if rice contain some cents value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText =
      "Kshs " + total.toFixed(2);
  }
}
function updatenull() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  if (cartBoxes.length <= 0) {
    document.getElementsByClassName("total-price")[0].innerText =
      "Kshs " + total;
  }
}
