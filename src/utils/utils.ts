import CryptoJS from 'crypto-js';
import axios from "axios";
import crypto from "crypto-js";

export const BASE_URL = "http://localhost:3002";

export const decryptMessage = (
  key: string,
  message: string,
  iv: string
): string => {
  const decrypted = CryptoJS.AES.decrypt(message, key, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
  });
  const result = decrypted.toString(CryptoJS.enc.Utf8);
  return result;
};


export function emailValidate(email: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}

 
export function scrollBottom(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}

export async function fetchChats(
  userId: string,
  recipientId: string,
  endPoint: string
) {
  const data = {
    userId: userId,
  };
  Object.assign(
    data,
    endPoint === "get_messages"
      ? { receiverId: recipientId }
      : { groupId: recipientId }
  );
  const {
    data: { messages: chats },
  } = await axios.post(`${BASE_URL}/messages/${endPoint}`, data);
  return chats;
}

export async function deleteSavedMessage(user: any, id: string) {
  const { data: response } = await axios.delete(
    `${BASE_URL}/users/delete_saved_message`,
    { data: { userId: user._id, messageId: id } }
  );
  return response;
}

export async function axiosDelete(endpoint: string, id: string) {
  const { data: response } = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
  return response;
}

 