import { io, Socket } from 'socket.io-client';

if (!import.meta.env.VITE_SERVER_API_URL) {
  throw new Error('VITE_SERVER_API_URL is not defined');
}

const URL = import.meta.env.VITE_SERVER_API_URL;

export const socket: Socket = io(URL, {
  withCredentials: true,
  transports: ['websocket'],
});
