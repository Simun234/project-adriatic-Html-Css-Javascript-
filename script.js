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

function displayData(data, currentPage, itemsPerPage) {
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    if (
      i >= (currentPage - 1) * itemsPerPage &&
      i < currentPage * itemsPerPage
    ) {
      const tr = document.createElement("tr");

      tr.innerHTML = `
            <td>${item.rowId}</td>
            <td>${item.iskaznica}</td>          
            <td>${item.datum}</td>
            <td>${item.vrijeme}</td>
            <td>${item.oznaciti}</td>
            <td>${item.barcode}</td>
            <td><input type="text" value="${data[i].tezina}"></td>
            <td>${item.registracija}</td>
            `;

      tbody.appendChild(tr);
    }
  }
}
