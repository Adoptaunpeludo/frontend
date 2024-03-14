import { postData, deleteData } from '../../api/client';

export const login = async (credentials) => {
  try {
    const response = await postData('/auth/login', credentials);
    return { data: response.data };
  } catch (error) {
    return error.response.data.message;
  }
};

export const register = async (credentials) => {
  try {
    const { data } = await postData('/auth/register', credentials);
    return data;
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await postData(`/auth/verify-email/${token}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const logout = async () => {
  try {
    await deleteData('/auth/logout');
  } catch (error) {
    console.log(error.response.data.message);
  }
};

// export const fetchAuthStatus = async () => {
//   try {
//     const response = await fetchData('users/me');
//     console.log({ response });
//     if (response.status === 200) {
//       console.log(response.data.message);
//       return { success: true, data: response.data };
//     }
//   } catch (error) {
//     console.log(error.response.data.message);
//     return { success: true };
//   }
// };
