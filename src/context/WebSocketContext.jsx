import { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connectToSocketServer = () => {
      const socket = new WebSocket('ws://localhost:3070');

      socket.onopen = () => {
        console.log('Connected');
      };

      socket.onclose = () => {
        console.log('Disconnected');
        setTimeout(() => {
          connectToSocketServer();
          //* TODO: Random number
        }, 1500);
      };

      setSocket(socket);
    };
    connectToSocketServer();
  }, []);

  return (
    <WebSocketContext.Provider
      value={{ socket, notifications, setNotifications }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);

  if (context === undefined)
    return 'WebSocketContext was used outside of WebSocketContextProvider';

  return context;
};

export { WebSocketContextProvider, useWebSocketContext };
