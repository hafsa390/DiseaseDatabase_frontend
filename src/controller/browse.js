import {
	getAllCategories,
	getDiseasesByCategory,
} from "../service/diseaseApi.js";
import { baseUrl } from "../../config/config.js";
import { getDiseaseImagesApi } from "../service/imageApi.js";

const categoryContainer = document.getElementById("category_container");
const table = document.getElementById("diseaseTable");
const detailsContainer = document.getElementById("disease_details_container");

let imageNodes = [];

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

			document
				.getElementById(viewBtnId)
				.addEventListener("click", function () {
					// localStorage.setItem("disease", JSON.stringify(row));

					detailsContainer.classList.remove("invisible");

					document.getElementById("orphaCode_field").value =
						row.orpha_code;
					document.getElementById("name_field").value = row.name;
					document.getElementById("abbr_field").value =
						row.abbreviation;
					document.getElementById("subcategory_field").value =
						row.sub_category;
					document.getElementById("gene_field").value = row.gene_name;
					document.getElementById("gene_ref_field").value =
						row.gene_reference;

					const list = document.getElementById(
						"disease_images_holder"
					);

					imageNodes.map((img) => list.removeChild(img));
					imageNodes = [];

					getDiseaseImagesApi(row.id, (data) => {
						if (data === null) {
							alert(
								"Something went wrong. Could not load image."
							);
							return;
						}

						if (data.success === "true") {
							if (
								data.images !== null &&
								data.images.length > 0
							) {
								data.images.forEach((imageObject) => {
									let imageName =
										imageObject.image_url.split("_")[1];
									let li = document.createElement("li");
									li.className = "image";
									li.innerHTML =
										`<img id="img-${imageObject.id}" src="${baseUrl}/static/rd_images/${imageName}" class="image" style="margin-top: 30px" />` +
										`<label style="margin-right: 10px">Image Reference:</label>` +
										`<a target="_blank" href="${imageObject.image_ref}" >${imageObject.image_ref}</a>`;

									imageNodes.push(li);
									list.appendChild(li);
								});
							}
						} else {
							alert(data.message);
						}
					});

					// localStorage.setItem("lastpage", location.href.replace(baseUrl + "/"));

					// const a = document.createElement("a");
					// a.target = "_blank";
					// a.href = "disease_details.html";
					// a.click();
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
				detailsContainer.classList.add("invisible");
				loadDiseases(category);
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			});
		});
	}
});
