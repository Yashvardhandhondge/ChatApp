import { useEffect } from 'react';

const useWebSocket = (roomId: number) => {
  // const ws = new WebSocket('ws://20.2.210.226:3001'); 
  // const ws = new WebSocket('https://chatapp-8ock.onrender.com')
  const ws = new WebSocket('ws://localhost:3001')

  const sendMessage = (message: string) => {
    ws.send(message);
  };

  useEffect(() => {
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'joinRoom', roomId }));
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

  return { sendMessage };
};

export { useWebSocket };
