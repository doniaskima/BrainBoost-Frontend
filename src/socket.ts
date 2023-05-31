import { io, Socket } from 'socket.io-client';

const BASE_URL = 'http://localhost:3000';  

export const socket: Socket = io(BASE_URL);
