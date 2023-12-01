function animateNumber(numId) {
  var countElement = document.getElementById(`${numId}`);
  var targetNumber = parseInt(countElement.innerText);
  console.log(targetNumber);
  var duration = 1500; // Animation duration in milliseconds
  var frameRate = 30; // Number of frames per second

  var increment = targetNumber / (duration / 1000) / frameRate;
  var currentNumber = 0;

  var interval = setInterval(function () {
    currentNumber += increment;
    countElement.innerText = Math.round(currentNumber);

    if (Math.round(currentNumber) >= targetNumber) {
      clearInterval(interval);
      countElement.innerText = targetNumber;
    }
  }, 1000 / frameRate);
}

document.addEventListener("DOMContentLoaded", function () {
  animateNumber("user-counter");
  animateNumber("artwork-counter");
  animateNumber("order-counter");
  // animateNumber("monthlyIncome");
});

axios
  .get("/monthlyPrices")
  .then((response) => {
    // Handle the response data
    console.log(response.data);
    createChart(response.data.data);
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });

function createChart(data) {
  const months = data.map((obj) => obj.month);
  const prices = data.map((obj) => obj.totalPrice);

  console.log(data);

  new Chart("myChart", {
    type: "bar", // Change the chart type to "bar"
    data: {
      labels: months, // Specify the labels for the x-axis
      datasets: [
        {
          label: "قروشات", // Specify the label for the dataset
          data: prices, // Specify the data values for the y-axis
          backgroundColor: "rgba(171, 27, 9, 0.7)", // Specify the bar color with transparency (lighter color)
          borderColor: "rgba(171, 27, 9)", // Specify the bar border color (darker color)
          borderWidth: 1, // Specify the width of the bar borders
        },
      ],
    },
    options: {},
  });
}
