import axios from 'axios';

const client = axios.create({
  baseURL: '/api/',
  // withCredentials: true,
});

// GET
export const fetchData = (endpoint) => {
  return client.get(endpoint);
};

// POST
export const postData = (endpoint, data) => {
  return client.post(endpoint, data);
};

// PUT
export const updateData = (endpoint, data) => {
  return client.put(endpoint, data);
};

// DELETE
export const deleteData = (endpoint) => {
  return client.delete(endpoint);
};

// GENERIC
export const sendGenericRequest = (method, endpoint, data = {}) => {
  return client({
    method,
    url: endpoint,
    data,
  });
};
