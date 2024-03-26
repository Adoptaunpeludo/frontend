import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { WB_SERVER } from '../config/config';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationsContext } from './NotificationsContext';

const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children, user }) => {
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState(null);
  const { setNotifications } = useNotificationsContext();
  const queryClient = useQueryClient();

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

        if (socket.readyState !== 0)
          socket.send(JSON.stringify({ token: user?.wsToken }));

        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          const { type, ...data } = message;
          if (type === 'pong') {
            clearInterval(pingInterval);
          }

          if (type === 'animal-changed') {
            setNotifications((notifications) => [...notifications, data]);
            queryClient.invalidateQueries({
              queryKey: ['animals'],
            });
            queryClient.invalidateQueries({
              queryKey: ['animal-details', data.animalSlug],
            });
          }

          if (type.startsWith('user')) {
            const { username } = message;
            queryClient.invalidateQueries({
              queryKey: ['shelters'],
            });
            queryClient.invalidateQueries({
              queryKey: ['shelter-details', username],
            });
            queryClient.invalidateQueries({
              queryKey: ['animals'],
            });
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
  }, [queryClient, user]);

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
