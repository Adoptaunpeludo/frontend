import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { WB_SERVER } from '../config/config';

const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);

  const ws = useRef(null);

  useEffect(() => {
    const connectToServer = () => {
      const socket = new WebSocket(WB_SERVER);
      let interval;
      socket.onopen = () => {
        console.log('Connected to ws server');
        setIsReady(true);

        interval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN)
            socket.send(JSON.stringify({ type: 'ping' }));
        }, 58000);
      };
      socket.onmessage = (event) => setVal(event.data);
      socket.onclose = () => {
        console.log('Disconnected from ws server');
        clearInterval(interval);
        setIsReady(false);
        const minReconnectDelay = 10000;
        const maxReconnectDelay = 30000;
        const reconnectDelay =
          Math.floor(
            Math.random() * (maxReconnectDelay - minReconnectDelay + 1)
          ) + minReconnectDelay;
        setTimeout(() => {
          console.log('Attempting to reconnect to ws server...');
          connectToServer();
        }, reconnectDelay);
      };

      ws.current = socket;

      return () => {
        console.log('Disconnected from ws server');
        clearInterval(interval);
        socket.close();
      };
    };
    connectToServer();
  }, []);

  return (
    <WebSocketContext.Provider
      value={{ isReady, val, send: ws.current?.send.bind(ws.current) }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// const getRandomReconnectDelay = () => {
//   return Math.floor(Math.random() * 10000) + 5000;
// };

const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);

  if (context === undefined)
    return 'WebSocketContext was used outside of WebSocketContextProvider';

  return context;
};

export { WebSocketContextProvider, useWebSocketContext };
