import { showAlert } from "./alert.js";

async function addArtist(formData) {
  await axios
    .post("/api/v1/artists", formData)
    .then((response) => {
      if (response.data.status == "success") {
        location.assign(`/dashboard/artists/${response.data.data.artist._id}`);
      }
    })
    .catch((err) => {
      showAlert("error", "ناموفق! هنگام درج تابلو خطایی رخ داذ.");
    });
}

function gatherData() {
  const name = document.querySelector("#a_a_name").value;
  const email = document.querySelector("#a_a_email").value;
  const image = document.querySelector("#a_a_image");
  const whatsapp = document.querySelector("#a_a_whatsapp").value;
  const facebook = document.querySelector("#a_a_facebook").value;
  const phone = document.querySelector("#a_a_phone").value;
  //   const artist = document.querySelector("#a_p_artist").value;
  const bio = document.querySelector("#a_a_bio").value;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("whatsappLink", whatsapp);
  formData.append("facebookLink", facebook);
  formData.append("phone", phone);
  formData.append("bio", bio);
  formData.append("image", image.files[0]);

  addArtist(formData);
}

document.querySelector("#a_a_btn")?.addEventListener("click", gatherData);
