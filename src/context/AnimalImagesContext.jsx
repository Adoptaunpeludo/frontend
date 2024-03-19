import { createContext, useContext, useState } from 'react';

const AnimalImagesContext = createContext();

const AnimalImagesContextProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  return (
    <AnimalImagesContext.Provider value={{ images, setImages }}>
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
