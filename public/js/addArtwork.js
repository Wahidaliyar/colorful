import { showAlert } from "./alert.js";

async function addArtwork(formData) {
  await axios
    .post("/api/v1/artworks", formData)
    .then((response) => {
      if (response.data.status == "success") {
        location.assign(
          `/dashboard/products/${response.data.data.artwork._id}`
        );
      }
    })
    .catch((err) => {
      if (err.response.data.error.code === 11000)
        showAlert("error", "تابلویی با این نام از قبل موجود است!");
      else showAlert("error", "ناموفق! هنگام درج تابلو خطایی رخ داذ.");
    });
}

function gatherData() {
  const name = document.querySelector("#a_p_name").value;
  const paper = document.querySelector("#a_p_paper").value;
  const price = document.querySelector("#a_p_price").value;
  const image = document.querySelector("#a_p_image");
  const height = document.querySelector("#a_p_height").value;
  const width = document.querySelector("#a_p_width").value;
  const tech = document.querySelector("#a_p_tech").value;
  const artist = document.querySelector("#a_p_artist").value;
  const desc = document.querySelector("#a_p_desc").value;

  if (!/^[\p{L}\p{N}\s]+$/u.test(name)) {
    showAlert("error", "نام معتبر وارد کنید!");
  } else if (!/^\d+$/.test(price)) {
    showAlert("error", "قیمت باید به اعداد باشد!");
  } else if (!/^\d+$/.test(width)) {
    showAlert("error", "ابعاد تابلو باید به اعداد باشد!");
  } else if (!/^\d+$/.test(height)) {
    showAlert("error", "ابعاد تابلو باید به اعداد باشد!");
  } else if (!/\.(jpg|jpeg|png)$/i.test(image.files[0].name)) {
    showAlert(
      "error",
      "لطفاً یک عکس با فرمت‌های .jpg، .jpeg، یا .png انتخاب کنید."
    );
  } else {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("paperMaterial", paper);
    formData.append("price", price);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("category", tech);
    formData.append("description", desc);
    formData.append("artist", artist);
    formData.append("image", image.files[0]);

    addArtwork(formData);
  }
}

document.querySelector("#n_p_btn")?.addEventListener("click", gatherData);
