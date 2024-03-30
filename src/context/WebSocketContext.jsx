import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { WB_SERVER } from '../config/config';

const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState(null);

  const ws = useRef(null);
  const reconnectInterval = useRef(null);

  useEffect(() => {
    const connectToSocketServer = async () => {
      const socket = new WebSocket(WB_SERVER);

      socket.onopen = () => {
        clearInterval(reconnectInterval.current);
        setIsReady(true);
        console.log('Connected to ws server');
        const pingInterval = setInterval(() => {
          if (socket.readyState === socket.OPEN) {
            socket.send(JSON.stringify({ type: 'ping' }));
          }
        }, 58000);

        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          const { type } = message;

          switch (type) {
            case 'pong':
              clearInterval(pingInterval);
              break;
          }
        };

        socket.onclose = () => {
          setIsReady(false);
          console.log('Disconnected from ws server');
          clearInterval(pingInterval);
          reconnectInterval.current = setInterval(() => {
            console.log('Attempting to reconnect to ws server...');
            connectToSocketServer();
          }, getRandomReconnectDelay());
        };
      };

      socket.onmessage = (event) => setMessage(event.data);

      ws.current = socket;

      return () => {
        clearInterval(reconnectInterval.current);
      };
    };
    connectToSocketServer();
  }, []);

  return (
    <WebSocketContext.Provider value={{ isReady, message, socket: ws.current }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const getRandomReconnectDelay = () => {
  return Math.floor(Math.random() * 10000) + 5000;
};

const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);

  if (context === undefined)
    return 'WebSocketContext was used outside of WebSocketContextProvider';

  return context;
};

export { WebSocketContextProvider, useWebSocketContext };
