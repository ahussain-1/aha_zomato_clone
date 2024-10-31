let menusData = [];
const url = "https://dummyjson.com/recipes";

/*Async Function with Try Catch to fetch data and transform as per the
 given structure and stored in menusData variable and invoke the 
 renderFoodItem function to render menu cards...*/
async function menuFetch(url){
  try{
    const res = await fetch(url);
    const data = await res.json();
    const final = data.recipes.map((recipe) => ({
        image: recipe.image,
        title: recipe.name,
        votes: recipe.reviewCount,
        price: getRandomPrice(),
        description: recipe.cuisine,
        id: recipe.id,
        quantity: 1,
    }));
    menusData.push(...final);
      renderFoodItems(menusData);
    } catch (error){
      console.log("I got error in url",error);
    }
}
  
// Function to create random price...
function getRandomPrice(){
  return Math.floor(Math.random() * 200) + 100;
}
menuFetch(url);
  
let cart = JSON.parse(localStorage.getItem("data")) || [];
  
// Function to Create Food card elements ...
function createFoodItemCard(item) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
  
    const imageSection = document.createElement("div");
    imageSection.classList.add("image-section");
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = "food-image";
    img.loading = "lazy";
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
  
    const button = document.createElement("button");
    const increment = document.createElement("button");
    const decrement = document.createElement("button");
    const spanQty = document.createElement("span");
  
  
    button.textContent = "Add";
    increment.textContent = "+";
    decrement.textContent = "-";
    spanQty.textContent = "1";
  
    button.id = "add-cart-btn";
    increment.className = "increment-btn";
    decrement.className = "decrement-btn";
    spanQty.className = "span-Qty;"
  
    button.setAttribute("data-id",item.id)
    button.addEventListener("click",(e)=>{
      console.log("Hello from Arsalan item => ",item.id)
      carter(item.id,e);
      button.style.display = "none";
      increment.style.display = "block";
      decrement.style.display = "block";
      spanQty.style.display = "block";
      spanQty.textContent = "1";
    });
  
    increment.addEventListener("click",(e)=>{
      // console.log("increased by inc-btn => ",item.id)
      carter(item.id,e);
      spanQty.textContent = cart.find(data => data.id === item.id).quantity;
    });
  
    decrement.addEventListener("click",(e)=>{
      decrease(item.id,e,button,increment,decrement,spanQty);
      let itemIncart = cart.find(data => data.id === item.id);
      spanQty.textContent = itemIncart? itemIncart.quantity: "";
    })
  
  
    buttonSection.append(button,decrement,spanQty,increment);
  
    itemElement.append(imageSection,detailsSection,buttonSection);
    return itemElement;
}

// Function to Render Food Items ....
function renderFoodItems(items) {
    const container = document.querySelector(".items");
    if(container){
      container.innerHTML = "";
      items.forEach((item) => {
        const itemElement = createFoodItemCard(item);
        container.appendChild(itemElement);
      });
    }
}
  
  
// Function to decrease the quantity of menu quanity and updating the local storage  
function decrease(itemId,e,button,increment,decrement,spanQty) {
    cart = cart.filter((data) => {
      if (data.id === itemId) {
        if (data.quantity === 1) {
          // console.log(`Removing item with id ${itemId} as quantity is 0`);
          button.style.display = "block";
      increment.style.display = "none";
      decrement.style.display = "none";
      spanQty.style.display = "none";
     
          return false; // Remove item from cart
        } else {
          --data.quantity;
        }
      }
      return true; // Retain other items
    });
  
    localStorage.setItem("data", JSON.stringify(cart));
    // console.log("Decrement data got =>", cart);
}
  
// Function  Add to cart with local storage updatation
function carter(itemId,e){
    let res = menusData.find((data) => {
      return data.id === itemId;
    });
  
    let cdn = cart.find((cart) => {
      return cart.id===res.id;
    });
  
  if(cdn){
  ++cdn.quantity;
  } else{
    cart.push(res);
    
  }  
  localStorage.setItem("data",JSON.stringify(cart));
};

