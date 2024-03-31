import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { WB_SERVER } from '../config/config';

const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);

  const ws = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(WB_SERVER);

    socket.onopen = () => {
      console.log('Connected to ws server');
      setIsReady(true);
    };
    socket.onmessage = (event) => setVal(event.data);
    socket.onclose = () => {
      console.log('Disconnected from ws server');
      setIsReady(false);
    };

    ws.current = socket;

    return () => {
      console.log('Disconnected from ws server');
      socket.close();
    };
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
