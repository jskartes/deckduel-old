import sendRequest from "./send-request";

export const initiateChat = async withUser => {
  try {
    const chat = await sendRequest('/api/chats/initiate', 'POST', withUser);
    return chat;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
