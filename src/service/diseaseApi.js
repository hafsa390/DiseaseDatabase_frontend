import { deleteRequest, get, post, put } from "./apiCore.js";

export const getAllCategories = (callback) => {
  get("/categories", callback);
};

export const getDiseasesByCategory = (category, callback) => {
  const params = "category=" + category;
  post("/categories", callback, params);
};

export const searchDiseases = (searchString, searchBy, callback) => {
  const params = "searchStr=" + searchString + "&searchBy=" + searchBy;
  post("/", callback, params);
};

export const addDiseaseApi = (disease, callback) => {
  let params =
    "orpha_code=" +
    disease.orphaCode +
    "&name=" +
    disease.name +
    "&abbreviation=" +
    disease.abbreviation +
    "&sub_category=" +
    disease.subCategory +
    "&gene_name=" +
    disease.geneName +
    "&gene_ref=" +
    disease.geneRef;

  if (disease.uploadedFiles) {
    params += "&files=" + JSON.stringify(disease.uploadedFiles);
  } else {
    params += "&files=[]";
  }
  if (disease.refs) {
    params += "&refs=" + JSON.stringify(disease.refs);
  } else {
    params += "&refs=[]";
  }

  post("/disease", callback, params);
};

export const updateDiseaseAPI = (disease, callback) => {
  let params =
    "id=" +
    disease.id +
    "&orpha_code=" +
    disease.orphaCode +
    "&name=" +
    disease.name +
    "&abbreviation=" +
    disease.abbreviation +
    "&sub_category=" +
    disease.subCategory +
    "&gene_name=" +
    disease.geneName +
    "&gene_ref=" +
    disease.geneRef;

  if (disease.uploadedFiles) {
    params += "&files=" + JSON.stringify(disease.uploadedFiles);
  } else {
    params += "&files=[]";
  }
  if (disease.refs) {
    params += "&refs=" + JSON.stringify(disease.refs);
  } else {
    params += "&refs=[]";
  }

  if (disease.filesToDelete) {
    params += "&filesToDelete=" + JSON.stringify(disease.filesToDelete);
  } else {
    params += "&filesToDelete=[]";
  }

  put("/disease", callback, params);
};

export const removeDiseaseApi = (diseaseId, callback) => {
  const formData = new FormData();
  formData.append("id", diseaseId);
  deleteRequest("/disease", callback, formData, "EMPTY");
};
