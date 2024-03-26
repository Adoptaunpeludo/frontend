export const getChatHistory = async (username) => {
  try {
    const response = await fetch(
      `localhost:3777/api/chat/create-chat/${username}`
    );

    if (!response.ok) {
      const data = await response.json();
      console.log({ data });
      throw data;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
