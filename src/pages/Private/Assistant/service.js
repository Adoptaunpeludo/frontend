import { postData } from '../../../api/client';

export const getChatHistory = async (username) => {
  try {
    const { data } = await postData(
      `http://localhost:3777/api/chat/create-chat/${username}`
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function* chatStreamGenerator(payload, endpoint) {
  try {
    const res = await fetch(`http://localhost:3777/api/${endpoint}`, {
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
