function filter() {
  const filterPopup = document.getElementById("filterPopup");
  const filterBtn = document.getElementById("filterBtn");
  const closeBtn = document.getElementsByClassName("popup-close")[0];

  if (filterPopup && filterBtn && closeBtn) {
    filterBtn.onclick = function() {
      filterPopup.style.display = "block";
    };

    closeBtn.onclick = function() {
      filterPopup.style.display = "none";
    };

    window.onclick = function(event) {
      if (event.target == filterPopup) {
        filterPopup.style.display = "none";
      }
    };
  }
}



/* -------------------  Login and Sign up modal  -----------------*/
const modal = document.getElementById("myModal");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const mobLoginbtn = document.getElementById("mob-log-btn");
const mobSignInbtn = document.getElementById("mob-sign-btn");

const span = document.getElementsByClassName("close")[0];

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");


loginBtn.onclick = function() {
  modal.style.display = "block";
  document.querySelector(".modal-content h2").textContent = "Log In";
  loginForm.style.display = "block";
  signupForm.style.display = "none";
}

signupBtn.onclick = function() {
  modal.style.display = "block";
  document.querySelector(".modal-content h2").textContent = "Sign Up";
  loginForm.style.display = "none";
  signupForm.style.display = "block";
}

mobLoginbtn.onclick = function(){
  modal.style.display = "block";
  document.querySelector(".modal-content h2").textContent = "Log In";
  loginForm.style.display = "block";
  signupForm.style.display = "none";
}

mobSignInbtn.onclick = function(){
  modal.style.display = "block";
  document.querySelector(".modal-content h2").textContent = "Sign Up";
  loginForm.style.display = "none";
  signupForm.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* -------------------  Login and Sign up modal Ended -----------------*/


/* -------------- -----------------------*/
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  // console.log('Script loaded and DOM fully parsed');

  burger.addEventListener('click', () => {
    console.log("Hamburger clicked");
    mobileNav.classList.toggle('show');
    console.log("Class list after toggle:", mobileNav.classList);
  });

  window.addEventListener('click', function(event) {
    if (!burger.contains(event.target) && !mobileNav.contains(event.target)) {
      mobileNav.classList.remove('show');
      console.log("Clicked outside, removed 'show' class");
    }
  });
  filter()
});
