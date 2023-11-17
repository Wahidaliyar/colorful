import { showAlert } from "./alert.js";

async function signup(formData) {
  const res = await axios({
    method: "POST",
    url: "/api/v1/users/signup",
    data: formData,
  })
    .then((res) => {
      if (res.data.status === "success") {
        showAlert("success", "حساب شما موفقانه ایجاد شد");
        window.setTimeout(() => {
          if (res.data.data.user.role === "admin") {
            location.assign("/dashboard");
          } else {
            location.assign("/");
          }
        }, 1500);
      }
    })
    .catch((err) => {
      showAlert("error", err.response.data.message);
      // console.log(err.response.data.message);
    });
}

document
  .querySelector("#signup-user-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.querySelector("#signup-name").value;
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;
    const passwordConfirm = document.querySelector(
      "#signup-passwordConfirm"
    ).value;
    const image = document.querySelector("#signup-image").files[0];

    if (!name || !email || !password || !passwordConfirm || !image) {
      showAlert("error", "لطفاٌ فورم را کامل پر کنید!");
    } else if (!(password === passwordConfirm)) {
      showAlert("error", "رمز عبور و تائید رمز عبور مشابه نیست!");
    } else if (password.length < 6) {
      showAlert("error", "رمز عبور حداقل شش کرکتر باشد!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwordConfirm", passwordConfirm);
      formData.append("photo", image);

      signup(formData);
    }
  });
