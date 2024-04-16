import { toast } from 'react-toastify';
import { userQuery } from '../useUser';
import { createChat } from './service';
import { chatHistoryQuery } from './useChatHistory';
import { redirect } from 'react-router-dom';

export const loader = (queryClient) => async () => {
  try {
    const user = await queryClient.ensureQueryData(userQuery);
    await createChat(user.wsToken);
    const history = await queryClient.ensureQueryData(
      chatHistoryQuery(user.username)
    );
    return history;
  } catch (error) {
    console.log(error);
    toast.info('El servicio de asistente no está disponible actualmente');
    return redirect('/');
  }
};
