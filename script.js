let currentPage = 1;
let itemsPerPage = 24;
let data = [];

const tbody = document.getElementById("table.body");
const prevBtn = document.getElementById("prethodni");
const firstBtn = document.getElementById("prvi");
const showAllBtn = document.getElementById("prikazi-sve");
const lastBtn = document.getElementById("zadnji");
const nextBtn = document.getElementById("sljedeći");
const lightModeBtn = document.getElementById("light-mode-btn");
const darkModeBtn = document.getElementById("dark-mode-btn");
const body = document.body;

function fetchData() {
  $.ajax({
    url: "./data.json",
    method: "GET",
    dataType: "json",
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

function displayData(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  tbody.innerHTML = "";

  pageData.forEach((item) => {
    const row = document.createElement("tr");
    const dateTimeParts = item.dateTime ? item.dateTime.split("") : ["", ""];
    const date = dateTimeParts[0];
    const time = dateTimeParts[1];

    row.innerHTML = `
    <td>${item.rowId || ""}</td>
    <td>${item.iskaznica || ""}</td>
    <td>${date}</td>
    <td>${time}</td>
    <td>${item.oznaciti || ""}</td>   
    <td>${item.barcode || ""}</td>
    <td><span class="tezina-display">${item.weight || ""}</span></td>    
    <td>${item.registracija || ""}</td>
    `;

    const tezinaCell = row.querySelector("td:nth-child(7)");
    tezinaCell.addEventListener("click", function (event) {
      const tezinaValue = event.target.textContent.trim() || "";
      const tezinaInput = document.createElement("input");
      tezinaInput.type = "text";
      tezinaInput.value = tezinaValue;
      tezinaInput.classList.add("tezina-input");

      tezinaInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          const newTezina = parseFloat(this.value);
          if (!isNaN(newTezina)) {
            event.target.parentNode.innerHTML = newTezina;
          } else {
            alert(" Please enter a valid number for tezina");
          }
          event.target.parentNode.removeChild(this);
        }
      });
      event.target.innerHTML = "";
      event.target.appendChild(tezinaInput);
      tezinaInput.focus();
    });
    tbody.appendChild(row);
  });
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayData(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayData(currentPage);
  }
});

firstBtn.addEventListener("click", () => {
  currentPage = 1;
  displayData(currentPage);
});

lastBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  currentPage = totalPages;
  displayData(currentPage);
});

showAllBtn.addEventListener("click", () => {
  currentPage = 1;
  itemsPerPage = data.length;
  displayData(currentPage);
});

fetchData();

darkModeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode-btn");
});

lightModeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode-btn");
});
