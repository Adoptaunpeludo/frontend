import { createContext, useContext, useState } from 'react';
import { validateField } from '../utils/validateField';

const FormErrorsContext = createContext();

export const useGetErrors = () => useContext(FormErrorsContext);

export const ErrorsProvider = ({ children }) => {
  const [errors, setErrors] = useState({});

  const validate = ({ name, value }) => {
    const newErrors = { ...errors, [name]: validateField(name, value) };
    setErrors(newErrors);
  };

  return (
    <FormErrorsContext.Provider value={{ validate, errors }}>
      {children}
    </FormErrorsContext.Provider>
  );
};
