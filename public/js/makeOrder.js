const name = document.getElementById("firstnameOrder");
const phoneNumber = document.getElementById("phonenumber");
const email = document.getElementById("emailOrder");
const image = document.getElementById("image");
const height = document.getElementById("height");
const width = document.getElementById("width");
const tech = document.getElementById("tech");
const description = document.getElementById("description");
const orderBtn = document.getElementById("order-btn");

async function sendOrder(formData) {
  await axios
    .post("/api/v1/order", formData)
    .then((res) => {
      showSuccessMessage();
    })
    .catch((err) => console.log(err));
}

orderBtn.addEventListener("click", function (e) {
  e.preventDefault();
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
});

function showSuccessMessage() {
  const successMessage = document.querySelector("#success");
  successMessage.classList.remove("hidden");

  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 2000);
}
