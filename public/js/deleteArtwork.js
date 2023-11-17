import { showAlert } from "./alert.js";

function hideDeleteAlert() {
  document.querySelector("#delete-artwork-popup").classList.add("hidden");
}
function showDeleteAlert() {
  document.querySelector("#delete-artwork-popup").classList.remove("hidden");
}

async function deleteArtwork(id) {
  axios
    .delete(`/api/v1/artworks/${id}`)
    .then((response) => {
      if (response.status === 204) {
        showAlert("success", "تابلو حذف شد.");
        window.setTimeout(() => {
          location.assign("/dashboard/products");
        }, 1500);
      } else {
        showAlert("error", "ناموفق! تابلو حذف نشد.");
      }
      hideDeleteAlert();
    })
    .catch((err) => {
      showAlert("error", "ناموفق! خطا هنگام حذف تابلو رخ داد.");
      hideDeleteAlert();
    });
}

document
  .querySelector("#delete-artwork-no")
  ?.addEventListener("click", hideDeleteAlert);
document
  .querySelector("#delete-artwork-popup-close")
  ?.addEventListener("click", hideDeleteAlert);

document
  .querySelector("#artwork-delete-btn")
  ?.addEventListener("click", showDeleteAlert);

document
  .querySelector("#delete-artwork-yes")
  ?.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    deleteArtwork(id);
  });
