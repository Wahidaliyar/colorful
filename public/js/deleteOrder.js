import { showAlert } from "./alert.js";

function hideDeleteAlert() {
  document.querySelector("#delete-order-popup").classList.add("hidden");
}
function showDeleteAlert() {
  document.querySelector("#delete-order-popup").classList.remove("hidden");
}

async function deleteOrder(id) {
  axios
    .delete(`/api/v1/order/${id}`)
    .then((response) => {
      if (response.status === 204) {
        showAlert("success", "سفارش حذف شد.");
        window.setTimeout(() => {
          location.assign("/dashboard/orders");
        }, 1500);
      } else {
        showAlert("error", "ناموفق! سفارش حذف نشد.");
      }
      hideDeleteAlert();
    })
    .catch((err) => {
      showAlert("error", "ناموفق! خطا هنگام حذف سفارش رخ داد.");
      console.log(err.response);
      hideDeleteAlert();
    });
}

document
  .querySelector("#delete-order-btn")?.addEventListener("click", function () {
    showDeleteAlert();
  });

document
  .querySelector("#delete-order-no")?.addEventListener("click", hideDeleteAlert);
document
  .querySelector("#delete-order-popup-close")?.addEventListener("click", hideDeleteAlert);

document.querySelector("#delete-order-yes")?.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  deleteOrder(id);
});
