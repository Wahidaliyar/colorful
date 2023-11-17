import { showAlert } from "./alert.js";

async function updateArtist(id, formData) {
  await axios
    .patch(`/api/v1/artists/${id}`, formData)
    .then((response) => {
      console.log();
      if (response.data.status == "success") {
        location.assign(`/dashboard/artists/${id}`);
      }
    })
    .catch((err) => {
      showAlert("error", "ویرایش ناموفق! خطا هنگام ویرایش رخ داد.");
    });
}

function gatherData() {
  const name = document.querySelector("#u_a_name").value;
  const email = document.querySelector("#u_a_email").value;
  const image = document.querySelector("#u_a_image");
  const whatsapp = document.querySelector("#u_a_whatsapp").value;
  const facebook = document.querySelector("#u_a_facebook").value;
  const phone = document.querySelector("#u_a_phone").value;
  const bio = document.querySelector("#u_a_bio").value;
  
  //   const artist = document.querySelector("#u_p_artist").value;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("whatsappLink", whatsapp);
  formData.append("facebookLink", facebook);
  formData.append("phone", phone);
  formData.append("bio", bio);
  if (image.files.length > 0) formData.append("image", image.files[0]);

  const id = document.querySelector("#u_a_btn").dataset.id;

  updateArtist(id, formData);
}

document.querySelector("#u_a_btn")?.addEventListener("click", gatherData);
