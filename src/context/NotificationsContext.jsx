import { createContext, useContext, useState } from 'react';

const NotificationsContext = createContext();

const NotificationsContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);

  if (context === undefined)
    return 'NotificationsContext was used outside of NotificationsContextProvider';

  return context;
};

export { NotificationsContextProvider, useNotificationsContext };
