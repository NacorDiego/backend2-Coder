import { Request, Response } from 'express';
import { Server, Socket } from 'socket.io';

// Configura el manejo de conexiones de socket
export const configureChat = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    // Escucha eventos de chat
    socket.on('chat message', (msg: string) => {
      console.log('Mensaje recibido:', msg);
      // Aquí puedes guardar el mensaje en una estructura de datos (por ejemplo, un array)
      // messages.push(msg);
      io.emit('chat message', msg); // Envía el mensaje a todos los clientes conectados
    });
  });
};

export const showChat = async (req: Request, res: Response) => {
  res.render('chat', { title: 'Chat' });
};
