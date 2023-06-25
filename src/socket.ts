import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

const BASE_URL = 'http://localhost:8080';  

export const socket: Socket = io(BASE_URL);

export const useSocket = create(() => ({
  socket: socket,
}));
