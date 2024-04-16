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
    if (error.response) {
      // Error de respuesta del servidor
      const errorMessage =
        error.response.data.message || 'Error en la solicitud';
      // Mostrar el mensaje de error usando tu sistema de notificaciones
      toast(errorMessage); // Asumiendo que `toast` es una función que muestra notificaciones en tu aplicación
    } else if (error.request) {
      // Error en la solicitud, pero no se recibe respuesta del servidor
      console.error('Error en la solicitud:', error.request);
    } else {
      // Otro tipo de error
      console.error('Error:', error.message);
    }
    // Propagar el error para que el código que llama a la función pueda manejarlo si es necesario
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
