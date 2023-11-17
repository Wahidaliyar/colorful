async function updateMe(id, formData) {
  await axios
    .patch(`/api/v1/users/${id}`, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

function gatherData() {
  const name = document.querySelector("#u_u_name").value;
  const email = document.querySelector("#u_u_email").value;
  const photo = document.querySelector("#u_u_photo");
  const id = document.querySelector("#updateMe-btn").dataset.id;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("photo", photo.files[0]);

  updateMe(id, formData);
}

document.querySelector("#updateMe-btn")?.addEventListener("click", gatherData);
