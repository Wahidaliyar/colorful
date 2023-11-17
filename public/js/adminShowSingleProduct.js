// const showInfoBtns = document.querySelectorAll(".desc-btn");

// showInfoBtns.forEach((btn) => {
//   btn.addEventListener("click", function () {
//     const id = btn.getAttribute("id");
//     getAdminSingleArtwork(id);
//   });
// });

// async function getAdminSingleArtwork(id) {
//   await axios
//     .get(`/dashboard/products/${id}`)
//     .then((res) => {
//       showSingleArtwork(res.data.data.artwork);
//     })
//     .catch((err) => console.log(err));
// }

// function showSingleArtwork(artwork) {
//   console.log(artwork);

//   const singleArtworkContainer = document.getElementById("single-artwork");

//   singleArtworkContainer.classList.remove("hidden");

//   const image = document.getElementById("artwork-image");
//   const name = document.getElementById("artwork-name");
//   const paper = document.getElementById("artwork-paper");
//   const height = document.getElementById("artwork-height");
//   const width = document.getElementById("artwork-width");
//   const artist = document.getElementById("artwork-artist");
//   const price = document.getElementById("artwork-price");
//   const category = document.getElementById("artwork-category");
//   const desc = document.getElementById("artwork-desc");
//   const deleteBtnId = document.getElementById("delete-artwork-yes")

//   name.textContent = artwork.name;
//   paper.textContent = artwork.paperMaterial;
//   height.textContent = `${artwork.height} سانتی متر`;
//   width.textContent = `${artwork.width} سانتی متر`;
//   artist.textContent = "محمد رضا قاسمی";
//   price.textContent = `${artwork.price} افغانی`;
//   category.textContent = artwork.category;
//   desc.textContent = artwork.description;
//   image.src = `/imgs/artwork/${artwork.image}`;
//   deleteBtnId.setAttribute("data-id", artwork._id)
// }

// const closeArtworkBtn = document.getElementById("singleArtworkCloseBtn");

// closeArtworkBtn.addEventListener("click", function () {
//   const singleArtworkContainer = document.getElementById("single-artwork");
//   singleArtworkContainer.classList.add("hidden");
// });

