import { Request, Response } from 'express';
// import { Server, Socket } from 'socket.io';

const messages = [];

// Configura el manejo de conexiones de socket
// export const configureChat = (io: Server) => {
//   io.on('connection', (socket: Socket) => {
//     console.log('Nuevo cliente conectado:', socket.id);

//     // Escucha eventos de chat
//     socket.on('chat_message', (msg: string) => {
//       console.log('Mensaje recibido:', msg);
//       messages.push(msg);
//       io.emit('chat_message', msg); // Envía el mensaje a todos los clientes conectados
//     });
//   });
// };

export const showChat = (req: Request, res: Response) => {
  res.render('chat');
};
