import {
  deleteData,
  fetchData,
  postData,
  setAuthorizationHeader,
} from '../../../api/client';
import { ASSISTANT_SERVER } from '../../../config/config';

export const deleteChatHistory = async () => {
  try {
    const { data } = await deleteData(`${ASSISTANT_SERVER}/chat-history`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getChatHistory = async () => {
  try {
    const { data } = await fetchData(`${ASSISTANT_SERVER}/chat-history`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createChat = async (token) => {
  try {
    setAuthorizationHeader(token);
    const { data } = await postData(`${ASSISTANT_SERVER}/create-chat/`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function* chatStreamGenerator(payload, token) {
  try {
    const res = await fetch(`${ASSISTANT_SERVER}/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();

      throw new Error(data.message);
    }

    const reader = res.body?.getReader();

    if (!reader) {
      console.log('Error generando reader');
      return null;
    }

    const decoder = new TextDecoder();

    let text = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
