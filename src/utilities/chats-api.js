import sendRequest from "./send-request";

export const initiateChat = async withUser => {
  try {
    const chat = await sendRequest('/api/chats/initiate', 'POST', withUser);
    return chat;
  } catch (error) {
    throw new Error(error);
  }
}

export const sendMessage = async message => {
  try {
    sendRequest('/api/chats/send', 'POST', message);
  } catch (error) {
    throw new Error(error);
  }
}
