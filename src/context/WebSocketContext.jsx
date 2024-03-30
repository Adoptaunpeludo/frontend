import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { WB_SERVER } from '../config/config';
// import { useQueryClient } from '@tanstack/react-query';
// import { useNotificationsContext } from './NotificationsContext';
// import { useAdoptionChatContext } from './AdoptionChatContext';

const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState(null);
  // const { setNotifications } = useNotificationsContext();
  // const { setChatMessages, room } = useAdoptionChatContext();
  // const queryClient = useQueryClient();

  const ws = useRef(null);

  useEffect(() => {
    const connectToSocketServer = async () => {
      const socket = new WebSocket(WB_SERVER);

      socket.onopen = () => {
        setIsReady(true);
        console.log('Connected to ws server');
        const pingInterval = setInterval(() => {
          if (socket.readyState === socket.OPEN) {
            socket.send(JSON.stringify({ type: 'ping' }));
          }
        }, 58000);

        // if (socket.readyState === socket.OPEN && user)
        //   socket.send(
        //     JSON.stringify({
        //       type: 'user-authentication',
        //       token: user?.wsToken,
        //     })
        //   );

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
          // setTimeout(() => {
          //   connectToSocketServer();
          //   //* TODO: Random number
          // }, 10000);
        };
      };

      socket.onmessage = (event) => setMessage(event.data);

      ws.current = socket;
    };
    connectToSocketServer();
  }, []);

  return (
    <WebSocketContext.Provider value={{ isReady, message, socket: ws.current }}>
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
