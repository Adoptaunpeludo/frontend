import { createContext, useContext, useState } from 'react';

const OnlineUsersContext = createContext();

const OnlineUsersContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};

const useOnlineUsersContext = () => {
  const context = useContext(OnlineUsersContext);

  if (context === undefined)
    return 'NotificationsContext was used outside of NotificationsContextProvider';

  return context;
};

export { OnlineUsersContextProvider, useOnlineUsersContext };
