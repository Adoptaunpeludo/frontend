import { postData, fetchData, deleteData } from '../../api/client';

export const login = async (credentials) => {
  try {
    const response = await postData('/auth/login', credentials);
    console.log({ response });
    if (response.status === 200) {
      console.log(response.data.message);
      return { success: true, data: response.data };
    }
  } catch (error) {
    return error.response.data.message;
  }
};

//export const register = async (credentials) => {
//  try {
//    const res = await fetch(
//      "https://backend.adoptaunpeludo.com/api/auth/register"
//    );
//  } catch (error) {
//    console.error("Error en el inicio de sesión:", error);
//    throw error;
//  }
//};

export const logout = async () => {
  try {
    const response = await deleteData('api/auth/logout');
    console.log({ response });
    if (response.status === 200) {
      console.log(response.data.message);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.log(error.response.data.message);
    return { success: true };
  }
};

export const fetchAuthStatus = async () => {
  try {
    const response = await fetchData('users/me');
    console.log({ response });
    if (response.status === 200) {
      console.log(response.data.message);
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.log(error.response.data.message);
    return { success: true };
  }
};
