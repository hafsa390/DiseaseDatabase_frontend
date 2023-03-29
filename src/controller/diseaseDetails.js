import { getDiseaseImagesApi } from "../service/imageApi.js";
import { baseUrl } from "../../config/config.js";
import { removeDiseaseApi } from "../service/diseaseApi.js";

const disease = JSON.parse(localStorage.getItem("disease"));

document.getElementById("orphaCode_field").value = disease.orpha_code;
document.getElementById("name_field").value = disease.name;
document.getElementById("abbr_field").value = disease.abbreviation;
document.getElementById("subcategory_field").value = disease.sub_category;
document.getElementById("gene_field").value = disease.gene_name;
document.getElementById("gene_ref_field").value = disease.gene_reference;

const list = document.getElementById("disease_images_holder");

getDiseaseImagesApi(disease.id, (data) => {
  if (data === null) {
    alert("Something went wrong. Could not load image.");
    return;
  }

  if (data.success === "true") {
    if (data.images !== null && data.images.length > 0) {
      data.images.forEach((imageObject) => {
        let li = document.createElement("li");
        li.className = "image";
        li.innerHTML =
          `<img id="img-${imageObject.id}" src="${baseUrl}/static/${imageObject.image_url}" class="image" style="margin-top: 30px" />` +
          `<label style="margin-right: 10px">Image Reference:</label>` +
          `<a target="_blank" href="${imageObject.image_ref}" >${imageObject.image_ref}</a>`;
        list.appendChild(li);
      });
    }
  } else {
    alert(data.message);
  }
});

document.getElementById("editBtnId").addEventListener("click", function () {
 location.href = "edit_details.html";
// alert("You are not allowed to edit the record") 
});

document.getElementById("deleteBtnId").addEventListener("click", function () {
  const isApproved = confirm("Are you sure to remove this disease?");
  if (isApproved) {
    removeDiseaseApi(disease.id, (response) => {
      if (response === null) {
        alert("Something went wrong. Please try again later.");
        return;
      }
      alert(response.message);
      if (response.success) {
        location.href = "browse.html";
      }
    });
  }
  // alert("You are not allowed to delete the record.");
});
