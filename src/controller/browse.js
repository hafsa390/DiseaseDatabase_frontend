import {
  getAllCategories,
  getDiseasesByCategory,
} from "../service/diseaseApi.js";
import { baseUrl } from "../config/config.js";

const categoryContainer = document.getElementById("category_container");
const table = document.getElementById("diseaseTable");

const loadDiseases = (category) => {
  getDiseasesByCategory(category, (data) => {
    console.log(data);

    const table = document.getElementById("diseaseTable");
    const newTbody = document.createElement("tbody");
    newTbody.id = "tableBody";
    const oldTbody = document.getElementById("tableBody");
    table.replaceChild(newTbody, oldTbody);

    const columns = [
      "orpha_code",
      "name",
      "abbreviation",
      "sub_category",
      "gene_name",
    ];

    const tableBody = document.getElementById("tableBody");
    data.forEach((row) => {
      const tr = tableBody.insertRow(-1);
      columns.forEach((column) => {
        const tabCell = tr.insertCell(-1);
        tabCell.innerHTML = row[column];
      });
      const tabCell = tr.insertCell(-1);
      tabCell.style.border = "none";

      const viewBtnId = "view-btn-" + row["id"];

      tabCell.innerHTML =
        `<div style="display:flex; align-items:center;justify-content:center;">` +
        `<button id="${viewBtnId}" class="btn" style="margin-right: 3px;">View</button></div>`;

      document.getElementById(viewBtnId).addEventListener("click", function () {
        localStorage.setItem("disease", JSON.stringify(row));
        localStorage.setItem("lastpage", location.href.replace(baseUrl + "/"));

        const a = document.createElement("a");
        a.target = "_blank";
        a.href = "disease_details.html";
        a.click();
      });
    });
  });
};

getAllCategories((categories) => {
  if (categories !== null || categories !== undefined) {
    categories.forEach((category, index) => {
      const element = document.createElement("li");
      element.id = `category_${index}`;
      element.className = "category";
      element.innerHTML = category;
      categoryContainer.appendChild(element);

      element.addEventListener("click", function () {
        console.log(category);
        table.classList.remove("invisible");
        loadDiseases(category);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
    });
  }
});
