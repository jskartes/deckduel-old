import sendRequest from "./send-request";

export const initiateChat = async withUser => {
  try {
    const chat = await sendRequest('/api/chats/initiate', 'POST', withUser);
    return chat;
  } catch (error) {
    throw new Error(error);
  }
}

export const saveMessageToChat = async (chat, messageContent) => {
  try {
    const message = await sendRequest(
      '/api/chats/save-message',
      'POST',
      {chat, messageContent}
    );
    return message;
  } catch (error) {
    throw new Error(error);
  }
}
