import Message from '@models/chat.model';

export const createMessage = async (dataMessage: any) => {
  const { user, message } = dataMessage;

  const newMessage = new Message({
    user,
    message,
  });

  try {
    const messageSaved = await newMessage.save();

    return { status: 201, data: messageSaved };
  } catch (error: any) {
    console.log(error.message);
    throw new Error(`Error al agregar el mensaje: ${error.message}`);
  }
};
