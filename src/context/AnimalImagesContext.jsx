import { createContext, useContext, useState } from 'react';

const AnimalImagesContext = createContext();

const AnimalImagesContextProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const resetImages = () => {
    setImages([]);
  };

  return (
    <AnimalImagesContext.Provider value={{ images, setImages, resetImages }}>
      {children}
    </AnimalImagesContext.Provider>
  );
};

const useAnimalImagesContext = () => {
  const context = useContext(AnimalImagesContext);

  if (context === undefined)
    return 'AnimalImagesContext was used outside of AnimalImagesContextProvider';

  return context;
};

export { AnimalImagesContextProvider, useAnimalImagesContext };
