export const mapUserChatHistory = (history, username) =>
  history.map((message) => ({
    text: message.text,
    isSender: username === message.username,
  }));
