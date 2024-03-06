let currentPage = 1;
let itemsPerPage = 24;
let data = [];

const tbody = document.getElementById("table-body");
const tdElements = document.querySelectorAll("tbody td");
const thead = document.querySelector("thead");
const thElements = document.querySelectorAll("thead th");
const prevBtn = document.getElementById("prethodni");
const firstBtn = document.getElementById("prvi");
const showAllBtn = document.getElementById("prikazi-sve");
const lastBtn = document.getElementById("zadnji");
const nextBtn = document.getElementById("sljedeći");
const lightModeBtn = document.getElementById("lightModeBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const body = document.body;

function fetchData() {
  $.ajax({
    url: "data.json",
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
  const endIndex = page * itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  tbody.innerHTML = "";

  pageData.forEach((item) => {
    const row = document.createElement("tr");
    const datumVrijemeParts = item.datumVrijeme
      ? item.datumVrijeme.split(" ")
      : ["", ""];
    const datum = datumVrijemeParts[0];
    const vrijeme = datumVrijemeParts[1];

    row.innerHTML = `
    <td class="border text-center">${item.rowId || ""}</td>
    <td class="border text-center">${item.iskaznica || ""}</td>
    <td class="border text-center">${item.datum || ""}</td>
    <td class="border text-center">${item.vrijeme || ""}</td>
    <td class="border text-center">${item.oznaciti || ""}</td>   
    <td class="border text-center">${item.barkod || ""}</td>
    <td class="border text-center"><span class="tezina-display">${
      item.tezina || ""
    }</span></td>    
    <td class="border text-center">${item.registracija || ""}</td>
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
  body.classList.add("bg-dark");
  body.classList.remove("bg-light");
  thead.classList.add("table-light");
  thead.classList.remove("table-dark");
  thElements.forEach((th) => {
    th.classList.add("text-black");
    th.classList.remove("text-white");
    th.classList.add("border-black");
    th.classList.remove("border-white");
  });
  tbody.classList.add("table-light");
  tbody.classList.remove("table-dark");
});

lightModeBtn.addEventListener("click", () => {
  body.classList.add("bg-light");
  body.classList.remove("bg-dark");
  thead.classList.add("table-dark");
  thead.classList.remove("table-success");
  thElements.forEach((th) => {
    th.classList.add("text-white");
    th.classList.remove("text-black");
    th.classList.add("border-white");
    th.classList.remove("border-black");
  });
  tbody.classList.add("table-dark");
  tbody.classList.remove("table-");
});
