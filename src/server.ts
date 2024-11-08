import { Socket } from "socket.io";
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('message', (msg: string) => {
        console.log('Received message:', msg);
        socket.emit('message', `Server received: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.emit('message', 'Welcome to the Socket.IO server!');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
