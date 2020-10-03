import { get, post } from "./apiCore.js";

export const uploadImagesApi = (files, callback) => {
  let formData = new FormData();
  if (files !== undefined && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }
  } else {
    formData = null;
  }
  post("/images", callback, formData, "EMPTY");
};

export const getDiseaseImagesApi = (id, callback) => {
  const queryParams = "disease_id=" + id;
  get("/images", callback, queryParams);
};
