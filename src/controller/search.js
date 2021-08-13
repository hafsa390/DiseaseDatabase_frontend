import { searchDiseases } from "../service/diseaseApi.js";
import { baseUrl } from "../config/config.js";

const nameRadioBtn = document.getElementById("radio-disease-name");
const geneRadioBtn = document.getElementById("radio-disease-gene");
const categoryRadioBtn = document.getElementById("radio-disease-category");
const searchedItems = document.getElementById("searched_items");
const searchBox = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const clearSearchBtn = document.getElementById("clearSearchBtn");

let searchBy = "name";
nameRadioBtn.addEventListener("change", () => {
  if (nameRadioBtn.checked) {
    searchBox.placeholder = "Search by disease name";
    searchBy = "name";
  }
});

geneRadioBtn.addEventListener("change", () => {
  if (geneRadioBtn.checked) {
    searchBox.placeholder = "Search by gene";
    searchBy = "gene";
  }
});

categoryRadioBtn.addEventListener("change", () => {
  if (categoryRadioBtn.checked) {
    searchBox.placeholder = "Search by disease subcategory";
    searchBy = "category";
  }
});

clearSearchBtn.addEventListener("click", () => {
  searchBox.value = "";
});

const fetchCallback = (fetchedDataArray) => {
  let itemsHtml = "";
  if (fetchedDataArray.length === 0) {
    itemsHtml = "<p>No item is found</p>";
  } else if (fetchedDataArray.length === 1) {
    itemsHtml = "<p>1 item is found</p>";
  } else {
    itemsHtml = `<p>${fetchedDataArray.length} items are found</p>`;
  }

  const itemIds = [];
  const map = new Map();
  fetchedDataArray.forEach((data) => {
    const itemId = `searched_item_${data.id}`;
    map.set(itemId, data);
    itemIds.push(itemId);
    const itemHtml =
      `<li class="searched_item_li" id="${itemId}">` +
      `<div class="item-row">` +
      `<span style="font-weight: bold;">ID:</span>` +
      `<span>${data.orpha_code}</span></div>` +
      `<div class="item-row">` +
      `<span style="font-weight: bold;">Disease Name:</span>` +
      `<span>${data.name}</span></div>` +
      `<div class="item-row">` +
      `<span style="font-weight: bold;">Sub-Category:</span>` +
      `<span>${data.sub_category}</span>` +
      `</div></li>`;
    itemsHtml += itemHtml;
  });

  searchedItems.innerHTML = itemsHtml;

  itemIds.forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
      console.log(map.get(id));
      localStorage.setItem("disease", JSON.stringify(map.get(id)));
      localStorage.setItem("lastpage", location.href.replace(baseUrl + "/"));
      const a = document.createElement("a");
      a.target = "_blank";
      a.href = "pages/disease_details.html";
      a.click();
    });
  });
};

searchBtn.addEventListener("click", () => {
  if (searchBox.value.length > 0) {
    searchDiseases(searchBox.value, searchBy, fetchCallback);
  } else {
    alert("Enter a text to search");
  }
});
