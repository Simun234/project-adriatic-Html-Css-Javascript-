let currentPage = 1;
let itemsPerPage = 24;
let data = [];

const tbody = document.getElementById("table.body");
const prevbtn = document.getElementById("prethodni");
const firstBtn = document.getElementById("prvi");
const showAllBtn = document.getElementById("prikazi-sve");
const lastBtn = document.getElementById("zadnji");
const nextBtn = document.getElementById("sljedeći");

function fetchData() {
  $ajax({
    url: "data.json",
    method: "GET",
    success: function (jsonData) {
      if (jsonData.hasOwnProperty("data") && Array.isArray(jsonData.data)) {
        data = jsonData.data;
        displayData(currentPage);
      } else {
        console.error(
          "Fetched data does not contain an array in the 'data' property:",
          jsonData
        );
      }
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });
}
