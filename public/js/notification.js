axios
  .get("/nots")
  .then((response) => {
    createNots(response.data.items);
    notsCounter(response.data.items);
  })
  .catch((error) => {
    console.log(error.response.text);
  });

function orderText(name) {
  return `
  <a href="#" class="flex items-center font-IRanSans border-b py-2 hover:text-red transition-all duration-300">
    <i class="fa-solid fa-cart-shopping text-lg ml-2"></i>
    <p class="whitespace-nowrap">درخواست خرید تابلوی <span class="font-bold">${name}</span>.</p>
  </a>
 `;
}
function buyText(name) {
  return `
  <a href="#" class="flex items-center font-IRanSans border-b py-2 hover:text-red transition-all duration-300">
    <i class="fa-solid fa-basket-shopping text-lg ml-2"></i>
    <p class="whitespace-nowrap">سفارش تابلوی جدید از <span class="font-bold">${name}</span>.</p>
  </a>
  `;
}

function createNots(data) {
  const container = document.querySelector("#not-container");

  for (let item of data) {
    if (item.width) {
      container.innerHTML += orderText(item.name);
    } else {
      container.innerHTML += buyText(item.artwork.name);
    }
  }
}

function notsCounter(items) {
  if (items.length === 0) {
    document.querySelector("#nots-counter").classList.add("hidden");
  } else {
    document.querySelector("#nots-counter").textContent = items.length;
  }
}

document.querySelector("#bell")?.addEventListener("click", function (e) {
  document.querySelector("#not-container").classList.toggle("hidden");
});
