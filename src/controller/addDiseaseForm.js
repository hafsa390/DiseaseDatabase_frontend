import { addDiseaseApi } from "../service/diseaseApi.js";
import { uploadImagesApi } from "../service/imageApi.js";

let fileList = [];
document
  .querySelector("#imageSelector")
  .addEventListener("change", function (event) {
    event.preventDefault();
    const files = event.target.files;

    const list = document.getElementById("disease_images_holder");
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
          `<input id="input-${file.name}" placeholder="Add reference" class="textBox"/></div> `;
        list.appendChild(li);
      };
    });
  });

document.getElementById("submitBtn").addEventListener("click", () => {
  // let files = undefined;
  // let refs = undefined;
  // if (fileList !== undefined && fileList.length > 0) {
  //   files = [];
  //   refs = [];
  //   Object.keys(fileList).forEach((key) => {
  //     const file = fileList[key];
  //     const ref = document.getElementById(`input-${file.name}`).value;
  //     files.push(file);
  //     refs.push(ref);
  //   });
  // }
  // addDisease(files, refs);
  alert("You are not allowed to add new disease record.")  
});

document.getElementById("cancelBtnId").addEventListener("click", function () {
  location.href = localStorage.getItem("lastpage");
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

function addDisease(fileList = undefined, refs = undefined) {
  const orphaCode = document.getElementById("orphaCode").value.trim();
  const name = document.getElementById("dname").value.trim();
  const abbreviation = document.getElementById("dabbr").value.trim();
  const subCategory = document.getElementById("sub_category").value.trim();
  const geneName = document.getElementById("gene_name").value.trim();
  const geneRef = document.getElementById("gene_ref").value.trim();

  if (orphaCode.length === 0) {
    alert("ID is required");
  } else if (name.length === 0) {
    alert("Name is required");
  } else {
    const disease = {
      orphaCode,
      name,
      abbreviation,
      subCategory,
      geneName,
      geneRef,
    };

    if (fileList !== undefined && fileList.length > 0) {
      uploadImage(fileList, (isSuccessful, uploadedFiles) => {
        if (isSuccessful === "true") {
          const diseaseWithImages = {
            uploadedFiles,
            refs,
          };
          Object.assign(diseaseWithImages, disease);

          addDiseaseApi(diseaseWithImages, (response) => {
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
      addDiseaseApi(disease, (response) => {
        if (response.success === "true") {
          alert(response.message);
          location.href = "browse.html";
        } else {
          alert(response.message);
        }
      });
    }
  }
}
