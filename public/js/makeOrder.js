import { showAlert } from "./alert.js";

async function sendOrder(formData) {
  await axios
    .post("/api/v1/order", formData)
    .then((res) => {
      showSuccessMessage();
    })
    .catch((err) => console.log(err));
}

document.getElementById("order-btn")?.addEventListener("click", function (e) {
  e.preventDefault();
  const name = document.getElementById("firstnameOrder");
  const phoneNumber = document.getElementById("phonenumber");
  const email = document.getElementById("emailOrder");
  const image = document.getElementById("image");
  const height = document.getElementById("height");
  const width = document.getElementById("width");
  const tech = document.getElementById("tech");
  const description = document.getElementById("description");

  if (!/^[\p{L}\s]{3,}$/u.test(name.value)) {
    showAlert("error", "لطفاً نام خود را وارد کنید.");
  } else if (!/^(?:\+\d{1,12}|\d{10,12})$/.test(phoneNumber.value)) {
    showAlert("error", "لطفاً شماره تلفن معتبر وارد کنید.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showAlert("error", "لطفاً ایمیل معتبر وارد کنید.");
  } else if (image.files.length > 0) {
    if (!/\.(png|jpe?g)$/i.test(image.files[0].name)) {
      showAlert(
        "error",
        " تنها فایل‌های با پسوندهای .png، .jpeg یا .jpg مجاز هستند."
      );
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("phone", phoneNumber.value);
      formData.append("email", email.value);
      formData.append("image", image.files[0]);
      formData.append("height", Number(height.value));
      formData.append("width", Number(width.value));
      formData.append("technique", tech.value);
      formData.append("description", description.value);
      sendOrder(formData);
    }
  } else {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("phone", phoneNumber.value);
    formData.append("email", email.value);
    formData.append("image", image.files[0]);
    formData.append("height", Number(height.value));
    formData.append("width", Number(width.value));
    formData.append("technique", tech.value);
    formData.append("description", description.value);
    sendOrder(formData);
  }
});

function showSuccessMessage() {
  const successMessage = document.querySelector("#success");
  successMessage.classList.remove("hidden");

  setTimeout(() => {
    successMessage.classList.add("hidden");
    window.location.href = "/order"
  }, 1500);
}
