import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { WB_SERVER } from '../config/config';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationsContext } from './NotificationsContext';
import { useAdoptionChatContext } from './AdoptionChatContext';

const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children, user }) => {
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState(null);
  const { setNotifications } = useNotificationsContext();
  const { setChatMessages, room } = useAdoptionChatContext();
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

        if (socket.readyState === socket.OPEN && user)
          socket.send(
            JSON.stringify({
              type: 'user-authentication',
              token: user?.wsToken,
            })
          );

        if (socket.readyState === socket.OPEN && room) {
          socket?.send(
            JSON.stringify({
              type: 'join-chat-room',
              username: user.username,
              room,
              role: user.role,
            })
          );
        }

        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          const { type, ...data } = message;

          switch (type) {
            case 'pong':
              clearInterval(pingInterval);
              break;
            case 'chat-message':
              setChatMessages((prev) => [
                ...prev,
                { text: data.message, isSender: false },
              ]);
              break;
            case 'chat-created':
              queryClient.invalidateQueries({
                queryKey: ['user-chats', data.shelterUsername],
              });
              break;
            case 'animal-changed':
              setNotifications((notifications) => [...notifications, data]);
              queryClient.invalidateQueries({
                queryKey: ['animals'],
              });
              queryClient.invalidateQueries({
                queryKey: ['animal-details', data.animalSlug],
              });
              break;
            case 'user-connected':
              queryClient.invalidateQueries({
                queryKey: ['shelters'],
              });
              queryClient.invalidateQueries({
                queryKey: ['shelter-details', message.username],
              });
              queryClient.invalidateQueries({
                queryKey: ['animals'],
              });
              queryClient.invalidateQueries({
                queryKey: ['animal-details'],
              });
              break;
            case 'user-disconnected':
              queryClient.invalidateQueries({
                queryKey: ['shelters'],
              });
              queryClient.invalidateQueries({
                queryKey: ['shelter-details', message.username],
              });
              queryClient.invalidateQueries({
                queryKey: ['animals'],
              });
              queryClient.invalidateQueries({
                queryKey: ['animal-details'],
              });
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
  }, [queryClient, user, setNotifications, setChatMessages, room]);

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
