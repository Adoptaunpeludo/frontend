0;
import { postData, deleteData } from '../../api/client';

export const login = async (credentials) => {
  try {
    const response = await postData('/auth/login', credentials);
    return { data: response.data };
  } catch (error) {
    console.log('Login error: ' + error);
    throw error;
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
    return response;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    await deleteData('/auth/logout');
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const resendValidationEmail = async (email) => {
  const response = await postData(`/auth/resend-validation-email/${email}`);
  return response;
};

export const ForgotPassword = async (email) => {
  const response = await postData('/auth/forgot-password/', { email });
  return response;
};

export const resetPassword = async ({ password, token }) => {
  const response = await postData(`/auth/reset-password/${token}`, {
    password,
  });
  return response;
};

export const googleAuthLogin = async (credential, clientId) => {
  const response = await postData('/auth/google-auth-login', {
    credential,
    clientId,
  });

  return response;
};
export const googleAuthRegister = async (credential, clientId, role) => {
  const response = await postData('/auth/google-auth-register', {
    credential,
    clientId,
    role,
  });

  return response;
};
