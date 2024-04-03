import { createContext, useCallback, useContext, useState } from 'react';

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [bioModal, setBioModal] = useState({});
  const [shelterModal, setShelterModal] = useState({});
  const [updatePasswordModal, setUpdatePasswordModal] = useState({});

  const saveBioModal = useCallback((formModal) => {
    setBioModal(formModal);
  }, []);

  const saveShelterModal = useCallback((formModal) => {
    setShelterModal(formModal);
  }, []);

  const saveUpdatePasswordModal = useCallback((formModal) => {
    setUpdatePasswordModal(formModal);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        bioModal,
        shelterModal,
        updatePasswordModal,
        saveBioModal,
        saveShelterModal,
        saveUpdatePasswordModal,
      }}
    >
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
