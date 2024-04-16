import { userChatsQuery } from '../Shelters/useUserChats';
import { userQuery } from '../useUser';
import { receiverDataQuery } from './useReceiverData';
import { chatHistoryQuery } from './useUserChatHistory';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const { chat } = params;
      const parts = chat.split('-');
      const shelter = parts.at(0);
      const adopter = parts.at(-1);
      const sender = await queryClient.ensureQueryData(userQuery);
      const username = sender?.role === 'shelter' ? adopter : shelter;

      const receiver = await queryClient.ensureQueryData(
        receiverDataQuery(username)
      );

      const history = await queryClient.ensureQueryData(
        chatHistoryQuery(params.chat)
      );

      const chats = await queryClient.ensureQueryData(
        userChatsQuery(sender.username)
      );

      return { history, receiver, chats, sender };
    } catch (error) {
      console.log(error);

      throw error;
    }
  };
