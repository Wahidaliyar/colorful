const menu = document.querySelector("#navbar-menu");
const navbarMobile = document.querySelector("#navbar-mobile");
const navbarMobileWrapper = document.querySelector("#navbar-mobile__wrapper");
const navbarMobileClose = document.querySelector("#navbar-mobile__close");
const loginContainer = document.querySelector("#login-container");
const btnLogin = document.querySelector("#btn-login");
const btnSignup = document.querySelector("#btn-signup");
const signupContainer = document.querySelector("#signup-container");
const btnLoginClose = document.querySelector("#btn-login-close");
const btnSignupClose = document.querySelector("#btn-signup-close");

function showLoginForm() {
  loginContainer.classList.remove("hidden");
}
function hideLoginForm() {
  loginContainer.classList.add("hidden");
}
function showSignupForm() {
  signupContainer.classList.remove("hidden");
}
function hideSignupForm() {
  signupContainer.classList.add("hidden");
}

menu.addEventListener("click", function () {
  navbarMobile.classList.remove("hidden");
  navbarMobile.classList.add("flex");
  navbarMobileWrapper.classList.remove("hidden");
});

navbarMobileWrapper.addEventListener("click", function () {
  navbarMobile.classList.add("hidden");
  navbarMobile.classList.remove("flex");
  navbarMobileWrapper.classList.add("hidden");
});

navbarMobileClose.addEventListener("click", function () {
  navbarMobile.classList.add("hidden");
  navbarMobile.classList.remove("flex");
  navbarMobileWrapper.classList.add("hidden");
});

if (btnLogin) btnLogin.addEventListener("click", showLoginForm);
btnLoginClose.addEventListener("click", hideLoginForm);

if (btnSignup) btnSignup.addEventListener("click", showSignupForm);
btnSignupClose.addEventListener("click", hideSignupForm);

const navbar = document.querySelector("#navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("bg-bg");
  }
  if (window.scrollY < 10) {
    navbar.classList.remove("bg-bg");
  }
});

const mobileLoginBtn = document.querySelector("#mobile-login-btn");
const mobileSignupBtn = document.querySelector("#mobile-signup-btn");
if (mobileLoginBtn) mobileLoginBtn.addEventListener("click", showLoginForm);
if (mobileSignupBtn) mobileSignupBtn.addEventListener("click", showSignupForm);
