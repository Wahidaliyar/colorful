document
  .querySelector("#product-filter")
  ?.addEventListener("change", (event) => {
    console.log(event.target.value);

    window.location.href = `/products?filter=${event.target.value}`;
  });
