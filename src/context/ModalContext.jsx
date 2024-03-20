import { createContext, useCallback, useContext, useState } from 'react';

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [modal, setModal] = useState({});

  const saveModal = useCallback((formModal) => {
    setModal(formModal);
  }, []);

  return (
    <ModalContext.Provider value={{ modal, setModal, saveModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined)
    return 'ModalContext was used outside of ModalContextProvider';

  return context;
};

export { ModalContextProvider, useModalContext };
