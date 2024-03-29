import { createContext, useContext, useState } from 'react';

const AdoptionChatContext = createContext();

const AdoptionChatContextProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [room, setRoom] = useState('');
  return (
    <AdoptionChatContext.Provider
      value={{ chatMessages, setChatMessages, room, setRoom }}
    >
      {children}
    </AdoptionChatContext.Provider>
  );
};

const useAdoptionChatContext = () => {
  const context = useContext(AdoptionChatContext);

  if (context === undefined)
    return 'NotificationsContext was used outside of NotificationsContextProvider';

  return context;
};

export { AdoptionChatContextProvider, useAdoptionChatContext };
