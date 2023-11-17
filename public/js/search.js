document
  .querySelector("#products-search-btn")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = document.querySelector("#products-search").value.trim();

    if (searchTerm) {
      location.href = `/dashboard/products?search=${searchTerm}`;
    }
  });

  document
  .querySelector("#users-search-btn")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = document.querySelector("#users-search").value.trim();

    if (searchTerm) {
      location.href = `/dashboard/users?search=${searchTerm}`;
    }
  });
