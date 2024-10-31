// Getting the Cart data from Local storage...
let cart = JSON.parse(localStorage.getItem("data")) || [];

// Grabbing the total-bill container by its id...
let totalBill = document.getElementById("total-bill");


// Function to create cards and event listener;
function createFoodItemCard(item) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
  
    const imageSection = document.createElement("div");
    imageSection.classList.add("image-section");
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = "food-image";
    imageSection.appendChild(img);
  
  
    const detailsSection = document.createElement("div");
    detailsSection.classList.add("details-section");
    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    const ratingPrice = document.createElement("div");
    ratingPrice.classList.add("rating-price");
    const ratingVotes = document.createElement("div");
    const ratingImg = document.createElement("img");
    ratingImg.src = "Zimages/rating_img.png";
    ratingImg.height = 20;
    const votes = document.createElement("p");
    votes.textContent = `${item.votes} votes`;
    ratingVotes.append(ratingImg,votes);
    const price = document.createElement("p");
    price.textContent = `₹${item.price}`;
    ratingPrice.append(ratingVotes,price);
    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = item.description;
    detailsSection.append(h3,ratingPrice,description);
  
    const buttonSection = document.createElement("div");
    buttonSection.classList.add("button-section");
  
    const increment = document.createElement("button");
    const decrement = document.createElement("button");
    const spanQty = document.createElement("span");
  
  
    increment.textContent = "+";
    decrement.textContent = "-";
    spanQty.textContent = `${item.quantity}`;
  
    increment.className = "increment-btn";
    decrement.className = "decrement-btn";
    spanQty.className = "span-Qty;"
  
  
    increment.addEventListener("click",(e)=>{
      // console.log("I am working inc btn");
      carter(item.id,e);
      spanQty.textContent = cart.find(data => data.id === item.id).quantity;
    });
  
    decrement.addEventListener("click",(e)=>{
      // console.log("I am working dec btn");
      decrease(item.id,e);
      let itemIncart = cart.find(data => data.id === item.id);
      spanQty.textContent = itemIncart? itemIncart.quantity: "";
    })
  
  
    buttonSection.append(increment,spanQty,decrement);
  
    itemElement.append(imageSection,detailsSection,buttonSection);
    return itemElement;
}


// Function to Render Cards
function renderFoodItems(items) {
    const container = document.querySelector(".items");
    if (container) {
      container.innerHTML = "";
      items.forEach((item) => {
        const itemElement = createFoodItemCard(item);
        container.appendChild(itemElement);
      });
    }
    totalSum(cart);
}


/* Function to Decrease the Qty and update the localSTorage and render cards
and check if cart is empty hide all the items and totalbill content */
function decrease(itemId, e) {
    cart = cart.filter((data) => {
      if (data.id === itemId) {
        if (data.quantity === 1) {
          // console.log(`Removing item with id ${itemId} as quantity is 0`);
          return false; // Remove item from cart
        } else {
          --data.quantity;
        }
      }
      return true; // Retain other items
    });
  
    localStorage.setItem("data", JSON.stringify(cart));
    // console.log("Decrement data got =>", cart);
  
    renderFoodItems(cart);
  
    // If the cart is empty, hide the entire cart UI
    if (cart.length === 0) {
      document.querySelector(".items").style.display = "none";
      document.querySelector("#total-bill").style.display = "none";
    } else {
      totalSum(cart);
    }
}


// Function to increase the Quantity for new food items and for existing food item.
function carter(itemId, e) {
    let res = cart.find((data) => data.id === itemId);
    let cdn = cart.find((cart) => cart.id === res.id);
  
    if (cdn && cdn.quantity > 0) { // Ensure quantity is greater than 0 before incrementing
      cdn.quantity++;
    } else if (!cdn) {
      cart.push(res);
    }
    localStorage.setItem("data", JSON.stringify(cart));
}
  

/* Function to calculate the totalSum of the all food items which are present
 in the cart and update the totalbill innerHtml*/
function totalSum(data) {
    let sum = data.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    totalBill.innerHTML = sum;
}
  

document.addEventListener("DOMContentLoaded", () => {
  // console.log("we got the data from cart LS...", cart);
renderFoodItems(cart);
});

