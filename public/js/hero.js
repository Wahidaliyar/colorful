const slider1 = document.querySelector("#slider-1");
const slider2 = document.querySelector("#slider-2");

setInterval(() => {
  slider1.classList.toggle("hidden");
  slider2.classList.toggle("hidden");
}, 5000);