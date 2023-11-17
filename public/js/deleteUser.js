import { showAlert } from "./alert.js";

const deleteBtn = document.querySelectorAll(".user-delete-btn");
const deletePopupCloseBtn = document.querySelector("#delete-user-popup-close");
const deleteUserYes = document.querySelector("#delete-user-yes");
const deleteUserNo = document.querySelector("#delete-user-no");

function hideDeleteAlert() {
  const deletePopup = document.querySelector("#delete-user-popup");
  deletePopup.classList.add("hidden");
}
function showDeleteAlert() {
  const deletePopup = document.querySelector("#delete-user-popup");
  deletePopup.classList.remove("hidden");
}

async function deleteUser(id) {
  axios
    .delete(`/api/v1/users/${id}`)
    .then((response) => {
      if (response.status === 204) {
        showAlert("success", "کاربر حذف شد.");
        window.setTimeout(() => {
          location.reload(true);
        }, 1500);
      } else {
        showAlert("error", "ناموفق! کاربر حذف نشد.");
      }
      hideDeleteAlert();
    })
    .catch((err) => {
      showAlert("error", "ناموفق! خطا هنگام حذف کاربر رخ داد.");
      hideDeleteAlert();
    });
}

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const id = btn.getAttribute("id");
    deleteUserYes.setAttribute("data-id", id);
    showDeleteAlert();
  });
});

deleteUserNo.addEventListener("click", hideDeleteAlert);
deletePopupCloseBtn.addEventListener("click", hideDeleteAlert);

deleteUserYes.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  deleteUser(id);
});
