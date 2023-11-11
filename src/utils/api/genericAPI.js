import axios from "axios";

export function getData(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function getOne(endpoint, id, options = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint}/${id}`, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function postData(endpoint, data, options = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, data, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function deleteData(endpoint, id, options = {}) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${endpoint}/${id}`, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function updateData(endpoint, id, data, options = {}) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${endpoint}/${id}`, data, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
