import { showAlert } from "./alert.js";

async function addToCart(
  artworkName,
  artworkImage,
  artworkCategory,
  user,
  artwork,
  price
) {
  await axios
    .post("/api/v1/cart", {
      user,
      artwork,
      price,
      image: artworkImage,
      category: artworkCategory,
      artworkName: artworkName,
    })
    .then((response) => {
      if (response.data.status === "success") {
        showAlert("success", "به سبد خرید افزوده شد.");
      } else if (response.data.status === "error") {
        showAlert("error", "تابلو در سبد خرید موجود است!");
        console.log(response.data);
      }
    })
    .catch((err) => {
      // showAlert("error", "نشد");
      console.log(err.response);
    });
}

document.querySelector("#add-to-cart-btn")?.addEventListener("click", () => {
  const cartBtn = document.querySelector("#add-to-cart-btn");
  const user = cartBtn.dataset.user;
  const artworkName = document.querySelector("#artwork-name").textContent;
  const artworkImage = document.querySelector("#artwork-image").dataset.src;
  const artworkCategory =
    document.querySelector("#artwork-category").textContent;
  const artwork = cartBtn.dataset.artwork;
  const price = Number(cartBtn.dataset.price);

  addToCart(artworkName, artworkImage, artworkCategory, user, artwork, price);
});

////////////////////////// DELETE FROM CART
async function deleteItem(id) {
  axios
    .delete(`/api/v1/cart/${id}`)
    .then((response) => {
      if (response.status === 204) {
        location.reload(true);
      }
    })
    .catch((err) => {
      console.log(err.response);
    });
}

document.querySelectorAll(".cart-delete-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;

    deleteItem(id);
  });
});
