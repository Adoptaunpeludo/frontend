import axios from 'axios';
import { toast } from 'react-toastify';
const client = axios.create({
  baseURL: '/api',
  // withCredentials: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    if (error.response.status && error.response.status === 401) {
      localStorage.setItem('isLoggedIn', false);
      localStorage.removeItem('accessToken');
    }

    if (error.response) {
      const errorMessage =
        error.response.data.message || 'Error en la solicitud';

      toast(errorMessage);
    } else if (error.request) {
      console.error('Error en la solicitud:', error.request);
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export const setAuthorizationHeader = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthorizationHeader = () =>
  delete client.defaults.headers.common['Authorization'];

// GET
export const fetchData = (endpoint, params) => {
  return client.get(endpoint, { params });
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
