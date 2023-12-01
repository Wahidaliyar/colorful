import { showAlert } from "./alert.js";

async function login(email, password) {
  const res = await axios({
    method: "POST",
    url: "/api/v1/users/login",
    data: {
      email,
      password,
    },
  })
    .then((res) => {
      if (res.data.status === "success") {
        showAlert("success", "موفقانه وارد شدید");
        window.setTimeout(() => {
          if (res.data.data.user.role === "admin") {
            // location.assign("/dashboard");
            location.assign("/dashboard/products");
          } else {
            location.assign("/");
          }
        }, 1500);
      }
    })
    .catch((err) => {
      showAlert("error", "ورود ناموفق! ایمیل یا رمز عبور اشتباه است");
      // console.log(err.response);
    });
}

document.querySelector("#login-btn")?.addEventListener("click", (e) => {
  e.preventDefault();
  const emailLogin = document.querySelector("#email-login").value;
  const passwordLogin = document.querySelector("#password-login").value;
  if (!emailLogin || !passwordLogin) {
    showAlert("error", "لطفاٌ ایمیل و رمز عبور خود را وارد کنید!");
  } else {
    login(emailLogin, passwordLogin);
  }
});

const logout = async () => {
  await axios({
    method: "GET",
    url: "/api/v1/users/logout",
  })
    .then((res) => {
      if (res.data.status === "success") {
        location.assign("/");
      }
    })
    .catch((err) => {
      showAlert("error", "خروج ناموفق! خطا در خروج از حساب رخ داد");
    });
};

function showLogoutAlert() {
  logoutAlert.classList.remove("hidden");
}
function hideLogoutAlert() {
  logoutAlert.classList.add("hidden");
}

document.querySelector("#profile-pic")?.addEventListener("click", () => {
  document.querySelector("#profile-card").classList.toggle("hidden");
});

document
  .querySelector("#logout-btn")
  ?.addEventListener("click", showLogoutAlert);

const logoutAlert = document.querySelector("#logout-alert");

document
  .querySelector("#logout-close")
  ?.addEventListener("click", hideLogoutAlert);
document
  .querySelector("#logout-cancel")
  ?.addEventListener("click", hideLogoutAlert);
document
  .querySelector("#mobile-logout-btn")
  ?.addEventListener("click", showLogoutAlert);

document.querySelector("#logout-ok")?.addEventListener("click", logout);

document
  .querySelector("#logout-btn-dashboard")
  ?.addEventListener("click", showLogoutAlert);
