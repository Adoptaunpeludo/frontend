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
        // Configurar intervalo de ping en el cliente
        const pingInterval = setInterval(() => {
          if (socket.readyState === socket.OPEN) {
            socket.send(JSON.stringify({ type: 'ping' }));
          }
        }, 30000); // Enviar un ping cada 30 segundos

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          // Si recibimos un mensaje de pong, podemos restablecer el temporizador
          if (data.type === 'pong') {
            clearInterval(pingInterval);
          } else {
            // Manejar otros tipos de mensajes recibidos
          }
        };

        socket.onclose = () => {
          console.log('Disconnected');
          clearInterval(pingInterval);
          setTimeout(() => {
            connectToSocketServer();
            //* TODO: Random number
          }, 1500);
        };
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
