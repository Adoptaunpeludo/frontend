export const mapChatHistory = (history) => {
  if (!history?.messages) return [];

  return history.messages.map((message) => {
    if (message.type === 'AIMessage')
      return {
        isGpt: true,
        text: message.message,
      };

    return {
      isGpt: false,
      text: message.message,
    };
  });
};
