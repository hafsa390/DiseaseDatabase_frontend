import { getDiseaseImagesApi, uploadImagesApi } from "../service/imageApi.js";
import { baseUrl } from "../../config/config.js";
import { updateDiseaseAPI } from "../service/diseaseApi.js";

const disease = JSON.parse(localStorage.getItem("disease"));

document.getElementById("orphaCode_field").value = disease.orpha_code;
document.getElementById("name_field").value = disease.name;
document.getElementById("abbr_field").value = disease.abbreviation;
document.getElementById("subcategory_field").value = disease.sub_category;
document.getElementById("gene_field").value = disease.gene_name;
document.getElementById("gene_ref_field").value = disease.gene_reference;

const list = document.getElementById("disease_images_holder");
let filesToDelete = [];

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
          `<img id="img-${imageObject.id}" src="${baseUrl}/static/${imageObject.image_url}" class="image" />` +
          `<button class="btn" id="removeImg-${imageObject.id}" style="margin-bottom: 30px">Remove</button>`;
        list.appendChild(li);

        document
          .getElementById(`removeImg-${imageObject.id}`)
          .addEventListener("click", function () {
            const img = document.getElementById(`img-${imageObject.id}`);
            const removeBtn = document.getElementById(
              `removeImg-${imageObject.id}`
            );
            const opacity = img.style.opacity;
            if (opacity === "1" || opacity === "") {
              img.style.opacity = "0.5";
              removeBtn.innerHTML = "Cancel";
              filesToDelete.push(imageObject.id);
            } else {
              img.style.opacity = "1";
              removeBtn.innerHTML = "Remove";
              filesToDelete = filesToDelete.filter(
                (value) => value !== imageObject.id
              );
            }
          });
      });
    }
  } else {
    alert(data.message);
  }
});

function uploadImage(files, onImageUploadCallback) {
  if (files !== undefined) {
    uploadImagesApi(files, (data) => {
      if (data === null) {
        alert("Something went wrong. Please try again later.");
        return;
      }

      if (data.success === "true") {
        onImageUploadCallback("true", data["uploaded_files"]);
      } else {
        alert(data.message);
        onImageUploadCallback("false", null);
      }
    });
  } else {
    onImageUploadCallback("false");
  }
}

let fileList = [];
document
  .querySelector("#imageSelector")
  .addEventListener("change", function (event) {
    event.preventDefault();
    const files = event.target.files;

    const list = document.getElementById("new_disease_images_holder");
    Object.keys(files).forEach((key) => {
      const oFReader = new FileReader();
      const file = files[key];
      fileList.push(file);
      oFReader.readAsDataURL(files[key]);
      oFReader.onload = (evt) => {
        let li = document.createElement("li");
        li.className = "full-width";
        li.innerHTML =
          `<div><img src="${evt.target.result}" class="thumbnil" style="margin-right: 30px" />` +
          `<input id="input-${file.name}" placeholder="Add reference" class="textBox"/></div>`;
        list.appendChild(li);
      };
    });
  });

document.getElementById("confirmBtnId").addEventListener("click", function () {
  const orphaCode = document.getElementById("orphaCode_field").value.trim();
  const name = document.getElementById("name_field").value.trim();
  const abbreviation = document.getElementById("abbr_field").value.trim();
  const subCategory = document.getElementById("subcategory_field").value.trim();
  const geneName = document.getElementById("gene_field").value.trim();
  const geneRef = document.getElementById("gene_ref_field").value.trim();

  if (name.length === 0) {
    alert("Name is required");
  } else {
    const updatedDisease = {
      id: disease.id,
      orphaCode,
      name,
      abbreviation,
      subCategory,
      geneName,
      geneRef,
      filesToDelete,
    };

    if (fileList !== undefined && fileList.length > 0) {
      let files = [];
      let refs = [];
      Object.keys(fileList).forEach((key) => {
        const file = fileList[key];
        const ref = document.getElementById(`input-${file.name}`).value;
        files.push(file);
        refs.push(ref);
      });

      uploadImage(files, (isSuccessful, uploadedFiles) => {
        if (isSuccessful === "true") {
          const diseaseWithImages = {
            uploadedFiles,
            refs,
          };
          Object.assign(diseaseWithImages, updatedDisease);

          updateDiseaseAPI(diseaseWithImages, (response) => {
            if (response === null) {
              alert("Something went wrong. Please try again later.");
              return;
            }

            if (response.success === "true") {
              alert(response.message);
              location.href = "browse.html";
            } else {
              alert(response.message);
            }
          });
        } else {
          alert("Only png and jpg image files are accepted");
        }
      });
    } else {
      updateDiseaseAPI(updatedDisease, (response) => {
        if (response.success === "true") {
          alert(response.message);
          location.href = "browse.html";
        } else {
          alert(response.message);
        }
      });
    }
  }
});

document.getElementById("cancelBtnId").addEventListener("click", function () {
  location.href = "disease_details.html";
});
