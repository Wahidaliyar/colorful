export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
  hideAlert();
  let color;
  if (type === "success") {
    color = "bg-emerald-700";
  } else if (type === "error") {
    color = "bg-red";
  }
  const markup = `
    <div class="alert fixed top-0 left-0 right-0" style="z-index: 300;">
        <div class="w-[80%] md:w-[30%] text-center ${color} py-6 mx-auto rounded-b-md shadow-[1px_4px_6px_0px_rgba(0,0,0,0.5)]">
            <p class="font-IRanSans text-white text-sm">${msg}</p>
        </div>
    </div>
    `;

  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 3000);
};
