import sendRequest from "./send-request";

export const initiateChat = async withUser => {
  const res = await sendRequest('/api/chats/initiate', 'POST', withUser);
  if (res.ok) return res.json();
  throw new Error();
}
