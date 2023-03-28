import { baseUrl } from "../../config/config.js";

console.log("in header.js");

document.getElementById("search").onclick = (event) => {
  console.log("click on search");
  event.preventDefault();
  const isSelected = document
    .getElementById("search")
    .className.includes("menu_item_selected");

  if (!isSelected) {
    location.href = "../index.html";
  }
};

document.getElementById("browse").onclick = (event) => {
  console.log("click on browse");
  event.preventDefault();
  const isSelected = document
    .getElementById("browse")
    .className.includes("menu_item_selected");

  if (!isSelected) {
    if (location.href.includes("pages")) {
      location.href = "browse.html";
    } else {
      location.href = "../pages/browse.html";
    }
  }
};

document.getElementById("about").onclick = (event) => {
  console.log("click on about");
  event.preventDefault();
  const isSelected = document
    .getElementById("about")
    .className.includes("menu_item_selected");

  if (!isSelected) {
    if (location.href.includes("pages")) {
      location.href = "about.html";
    } else {
      location.href = "../pages/about.html";
    }
  }
};

document.getElementById("add_disease").onclick = (event) => {
  console.log("click on add_disease");
  event.preventDefault();
  const isSelected = document
    .getElementById("add_disease")
    .className.includes("menu_item_selected");

  if (!isSelected) {
    localStorage.setItem("lastpage", location.href.replace(baseUrl + "/"));
    if (location.href.includes("pages")) {
      location.href = "add_disease_info.html";
    } else {
      location.href = "../pages/add_disease_info.html";
    }
  }
};
