import { createContext, useContext, useEffect, useState } from 'react';
import { WB_SERVER } from '../config/config';

const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connectToSocketServer = () => {
      const socket = new WebSocket(WB_SERVER);

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
