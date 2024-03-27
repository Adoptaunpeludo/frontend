import { postData } from '../../../api/client';
import { ASSISTANT_SERVER } from '../../../config/config';

export const getChatHistory = async (token) => {
  try {
    const { data } = await postData(`${ASSISTANT_SERVER}/create-chat/${token}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function* chatStreamGenerator(payload) {
  try {
    const res = await fetch(`${ASSISTANT_SERVER}/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
