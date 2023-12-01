document
  .querySelector("#sales-table")
  ?.addEventListener("change", (event) => {
    console.log(event.target.value);

    window.location.href = `/dashboard/sales?type=${event.target.value}`;
  });