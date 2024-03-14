import { AxiosError } from 'axios';

export const handleAuthError = (error) => {
  if (error instanceof AxiosError) {
    const { message } = error.response.data;

    if (message.startsWith('Email')) {
      const email = message.split(' ').at(1);
      return `El email: ${email} ya existe, prueba con otro email`;
    }

    if (message.startsWith('Username')) {
      const username = message.split(' ').at(1);
      return `El username: ${username} ya existe, prueba con otro username`;
    }

    return message;
  }
};
