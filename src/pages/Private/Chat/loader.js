import { redirect } from 'react-router-dom';

import { receiverDataQuery } from './useReceiverData';
import { chatHistoryQuery } from './useUserChatHistory';
import { userChatsQuery } from '../Shelters/useUserChats';
import { userQuery } from '../useUser';

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
        userChatsQuery(sender?.username)
      );

      return { history, receiver, chats, sender };
    } catch (error) {
      console.log(error);
      if (error.response.status && error.response.status === 401) {
        return redirect('/login');
      }
      return error;
    }
  };
