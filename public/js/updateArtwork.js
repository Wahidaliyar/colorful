import { showAlert } from "./alert.js";

async function updateArtwork(id, formData) {
  axios
    .patch(`/api/v1/artworks/${id}`, formData)
    .then((response) => {
      console.log();
      if (response.data.status == "success") {
        location.assign(`/dashboard/products/${id}`);
      }
    })
    .catch((err) => {
      showAlert("error", "ویرایش ناموفق! خطا هنگام ویرایش رخ داد.");
    });
}

function gatherData() {
  const name = document.querySelector("#u_p_name").value;
  const paper = document.querySelector("#u_p_paper").value;
  const price = document.querySelector("#u_p_price").value;
  const image = document.querySelector("#u_p_image");
  const height = document.querySelector("#u_p_height").value;
  const width = document.querySelector("#u_p_width").value;
  const tech = document.querySelector("#u_p_tech").value;
  const desc = document.querySelector("#u_p_desc").value;
  const artist = document.querySelector("#u_p_artist").value;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("paperMaterial", paper);
  formData.append("price", price);
  formData.append("height", height);
  formData.append("width", width);
  formData.append("artist", artist);
  formData.append("category", tech);
  formData.append("description", desc);
  if (image.files.length > 0) formData.append("image", image.files[0]);

  const id = document.querySelector("#u_p_btn").dataset.id;

  updateArtwork(id, formData);
}

document.querySelector("#u_p_btn")?.addEventListener("click", gatherData);
