export const mapChatHistory = (history) => {
  return history.map((message) => {
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
