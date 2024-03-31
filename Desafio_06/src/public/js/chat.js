const socket = io();

// Escuchar eventos de chat
socket.on('chat_message', msg => {
  const messageElement = document.createElement('');
  messageElement.textContent = msg;
  document.getElementById('chat-messages').appendChild(messageElement);
});

// Manejar envío de mensajes desde el formulario
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('chat_message', message); // Enviar mensaje al servidor
  messageInput.value = '';
});
