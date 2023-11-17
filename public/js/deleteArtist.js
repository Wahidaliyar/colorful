import { showAlert } from "./alert.js";

function hideDeleteAlert() {
  document.querySelector("#delete-artist-popup").classList.add("hidden");
}
function showDeleteAlert() {
  document.querySelector("#delete-artist-popup").classList.remove("hidden");
}

async function deleteArtist(id) {
  axios
    .delete(`/api/v1/artists/${id}`)
    .then((response) => {
      if (response.status === 204) {
        showAlert("success", "هنرمند حذف شد.");
        window.setTimeout(() => {
          location.assign("/dashboard/artists");
        }, 1500);
      } else {
        showAlert("error", "ناموفق! هنرمند حذف نشد.");
      }
      hideDeleteAlert();
    })
    .catch((err) => {
      showAlert("error", "ناموفق! خطا هنگام حذف هنرمند رخ داد.");
      hideDeleteAlert();
    });
}

document
  .querySelector("#artist-delete-btn")
  ?.addEventListener("click", function () {
    showDeleteAlert();
  });

document
  .querySelector("#delete-artist-no")
  ?.addEventListener("click", hideDeleteAlert);
document
  .querySelector("#delete-artist-popup-close")
  ?.addEventListener("click", hideDeleteAlert);

document.querySelector("#delete-artist-yes")?.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  deleteArtist(id);
});
