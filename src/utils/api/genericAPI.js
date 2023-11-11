import axios from "axios";

export function getData(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint, options)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function getOne(endpoint, id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint}/${id}`)
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

export function deleteData(endpoint, id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${endpoint}/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function updateData(endpoint, id, data) {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${endpoint}/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
