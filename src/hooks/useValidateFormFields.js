import { useEffect, useState } from 'react';
import { validateField } from '../utils/validateField';

export const useValidateFormFields = (initialValues, isOpen) => {
  const [credentials, setCredentials] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
    setErrors({
      ...errors,
      [name]: validateField(name, value, credentials.newPassword),
    });
  };

  const isFormValid = Object.values(errors).every((error) => error === '');

  useEffect(() => {
    setErrors({});
  }, [isOpen]);

  return { credentials, errors, handleChange, isFormValid };
};
