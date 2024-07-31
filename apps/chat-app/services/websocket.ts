import { useEffect } from 'react';

const useWebSocket = (roomId: number) => {
  const ws = new WebSocket('ws://localhost:3001'); // Update URL if needed

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