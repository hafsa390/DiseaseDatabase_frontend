import { baseUrl } from "../../config/config.js";

export const get = (endpoint, callback, queryParams = "") => {
  const url =
    baseUrl + endpoint + (queryParams.length > 0 ? "?" : "") + queryParams;

  const options = {
    method: "GET",
  };

  callFetch(url, options, callback);
};

export const post = (
  endpoint,
  callback,
  params = null,
  requestHeader = "application/x-www-form-urlencoded"
) => {
  const url = baseUrl + endpoint;
  const options = {
    method: "POST",
  };
  if (requestHeader !== "EMPTY") {
    options.headers = {
      "Content-Type": requestHeader,
    };
  }
  if (params !== null) {
    options.body = params;
  }

  callFetch(url, options, callback);
};

export const put = (
  endpoint,
  callback,
  params = null,
  requestHeader = "application/x-www-form-urlencoded"
) => {
  const url = baseUrl + endpoint;
  const options = {
    method: "PUT",
  };
  if (requestHeader !== "EMPTY") {
    options.headers = {
      "Content-Type": requestHeader,
    };
  }
  if (params !== null) {
    options.body = params;
  }

  callFetch(url, options, callback);
};

export const deleteRequest = (
  endpoint,
  callback,
  params = null,
  requestHeader = "application/x-www-form-urlencoded"
) => {
  const url = baseUrl + endpoint;
  const options = {
    method: "DELETE",
  };
  if (requestHeader !== "EMPTY") {
    options.headers = {
      "Content-Type": requestHeader,
    };
  }
  if (params !== null) {
    options.body = params;
  }

  callFetch(url, options, callback);
};

const callFetch = (url, options, callback) => {
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      console.error(err);
      callback(null);
    });
};
