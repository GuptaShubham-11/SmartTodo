import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export const setupServer = (server: HttpServer) => {
  if (!process.env.CLIENT_URL) {
    throw new Error('CLIENT_URL environment variable is not set');
  }

  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    // console.log('🟢 Socket connected:', socket.id);

    socket.on('join_board', (boardId: string) => {
      socket.join(boardId);
      // console.log(`🔁 Socket ${socket.id} joined board ${boardId}`);
    });

    socket.on('join_group', (groupId: string) => {
      socket.join(groupId);
      // console.log(`🔁 Socket ${socket.id} joined group ${groupId}`);
    });

    socket.on('leave_board', (boardId: string) => {
      socket.leave(boardId);
      // console.log(`🚪 Socket ${socket.id} left board ${boardId}`);
    });

    socket.on('leave_group', (groupId: string) => {
      socket.leave(groupId);
      // console.log(`🚪 Socket ${socket.id} left group ${groupId}`);
    });

    socket.on('disconnect', () => {
      // console.log('🔴 Socket disconnected:', socket.id);
    });
  });

  return io;
};
