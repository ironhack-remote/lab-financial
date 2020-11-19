const presentData = "http://api.coindesk.com/v1/bpi/historical/close.json";
const ctx = document.getElementById("myChart").getContext("2d");
const fromDate = document.getElementById("from");
const toDate = document.getElementById("to");
const currencySelect = document.getElementById("currency");
const minVal = document.getElementById("minVal");
const maxVal = document.getElementById("maxVal");
let startDateInputValue;
let endDateInputValue;
let currencySelectValue;

fromDate.onchange = (event) => {
  startDateInputValue = event.target.value;
  console.log("startDateInputValue:", startDateInputValue);
  bitcoinPriceTracker();
};
toDate.onchange = (event) => {
  endDateInputValue = event.target.value;
  console.log("endDateInputValue:", endDateInputValue);
  bitcoinPriceTracker();
};

currencySelect.onchange = (event) => {
  currencySelectValue = event.target.value;
  console.log("endDateInputValue:", currencySelectValue);
  bitcoinPriceTracker();
};

function bitcoinPriceTracker() {
  if (!startDateInputValue || !endDateInputValue) {
    return;
  }
  getUpdatedValues();
  // performCallWithTheseValues()
}

function getUpdatedValues() {
  const currencyVal = currencySelectValue || "USD";
  axios
    .get(
      `${presentData}?currency=${currencyVal}&start=${startDateInputValue}&end=${endDateInputValue}`
    )
    .then((response) => {
      console.log("response:", response.data.bpi);
      const labels = Object.keys(response.data.bpi);
      const data = Object.values(response.data.bpi);
      drawChart(labels, data);
      letsGetMathMin(data);
    });
}

axios.get(presentData).then((response) => {
  console.log("response:", response.data.bpi);
  const labels = Object.keys(response.data.bpi);
  const data = Object.values(response.data.bpi);
  drawChart(labels, data);
  letsGetMathMin(data);
});

function letsGetMathMin(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  minVal.innerText = min;
  maxVal.innerText = max;
}
// var myChart =

function drawChart(labels, data) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of Votes",
          data: data,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
