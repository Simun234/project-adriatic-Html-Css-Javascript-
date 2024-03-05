let currentPage = 1;
let itemsPerPage = 24;
let data = [];

const tbody = document.getElementById("table-body");
const prevBtn = document.getElementById("prethodni");
const firstBtn = document.getElementById("prvi");
const showAllBtn = document.getElementById("prikazi-sve");
const lastBtn = document.getElementById("zadnji");
const nextBtn = document.getElementById("sljedeći");

function fetchData() {
  let xml = new XMLHttpRequest();
  xml.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);
      if (Array.isArray(response)) {
        data = response;
        displayData();
      }
    }
    xml.open("GET", "data.json", true);
    xml.send();
  };
}

function dispalyData(page) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  tbody.innerHTML = "";

  pageData.forEach((item) => {
    const row = document.createElement("tr");
    const dateTimePart = item.dateTime ? item.dateTime.split(" ") : [" ", " "];
    const date = dateTimePart[0];
    const time = dateTimePart[1];

    row.innerHTML = `
    <td>${item.rowId || ""}</td>
    <td>${item.iskaznica || ""}</td>
    <td>${date}</td>
    <td>${time}</td>
    <td>${item.oznaciti || ""}</td>
    <td>${item.barcode || ""}</td>
    <td><span class="weight-display">${item.weight || ""}</span></td>
    <td>${item.registracija || ""}</td>
    `;
  });
}
