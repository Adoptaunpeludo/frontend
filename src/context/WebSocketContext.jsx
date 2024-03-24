import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { WB_SERVER } from '../config/config';
import { useQueryClient } from '@tanstack/react-query';

const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children, user }) => {
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState(null);
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
          socket.send(JSON.stringify({ token: user.wsToken }));

        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);

          if (message.type === 'pong') {
            clearInterval(pingInterval);
          }

          if (message.type === 'animal-changed') {
            queryClient.invalidateQueries({
              queryKey: ['animals'],
            });
          }

          if (message.type === 'user-connected') {
            const { username } = message;
            queryClient.invalidateQueries([
              {
                queryKey: ['shelters'],
              },
              {
                queryKey: ['shelters-details', username],
              },
            ]);
          }

          if (message.type === 'user-disconnected') {
            const { username } = message;
            queryClient.invalidateQueries([
              {
                queryKey: ['shelters'],
              },
              {
                queryKey: ['shelters-details', username],
              },
            ]);
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
