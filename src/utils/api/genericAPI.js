import axios from "axios";

export function getData(endpoint) {
  const response = axios
    .get(endpoint)
    .then((res) => res.data)
    .catch((err) => err.message);

  return response;
}

export function getOne(endpoint, id) {
  const response = axios
    .get(`${endpoint}/${id}`)
    .then((res) => res.data)
    .catch((err) => err.message);

  return response;
}

export function postData(endpoint, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function deleteData(endpoint, id) {
  const response = axios
    .delete(`${endpoint}/${id}`)
    .then((res) => res)
    .catch((err) => err.message);

  return response;
}

export function updateData(endpoint, id, data) {
  const response = axios
    .patch(`${endpoint}/${id}`, data)
    .then((res) => res)
    .catch((err) => err.message);

  return response;
}
