const menu = document.querySelector("#navbar-menu");
const navbarMobile = document.querySelector("#navbar-mobile");
const navbarMobileWrapper = document.querySelector("#navbar-mobile__wrapper");
const navbarMobileClose = document.querySelector("#navbar-mobile__close");
const loginContainer = document.querySelector("#login-container");
const btnLogin = document.querySelector("#btn-login");
const btnSignup = document.querySelectorAll("#btn-signup");
const signupContainer = document.querySelector("#signup-container");
const btnLoginClose = document.querySelector("#btn-login-close");
const btnSignupClose = document.querySelector("#btn-signup-close");

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

btnLogin.addEventListener("click", function () {
  loginContainer.classList.remove("hidden");
});

btnLoginClose.addEventListener("click", function () {
  loginContainer.classList.add("hidden");
});

btnSignup.forEach((btn) => {
  btn.addEventListener("click", function () {
    signupContainer.classList.remove("hidden");
  });
});

btnSignupClose.addEventListener("click", function () {
  signupContainer.classList.add("hidden");
});

const navbar = document.querySelector("#navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("bg-bg");
  }
  if (window.scrollY < 10) {
    navbar.classList.remove("bg-bg");
  }
});

menu.addEventListener("click", function () {
  navbarMobile.classList.remove("hidden");
  navbarMobile.classList.add("flex");
  navbarMobileWrapper.classList.remove("hidden");
});
