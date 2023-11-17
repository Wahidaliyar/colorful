const sliderHero1 = document.getElementById("slider-1");
const sliderHero2 = document.getElementById("slider-2");

let index = 0;

setInterval(() => {
  if (index === 0) {
    sliderHero1.style.transform = `translateX(100%)`;
    sliderHero2.style.transform = `translateX(0%)`;
    index = 1;
  } else if (index === 1) {
    sliderHero1.style.transform = `translateX(0%)`;
    sliderHero2.style.transform = `translateX(100%)`;
    index = 0;
  }
}, 5000);

