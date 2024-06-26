import { Avatar } from '@nextui-org/react';
import { IconUserFilled } from '@tabler/icons-react';

import { BUCKET_URL } from '../../../../config/config';
import { useUser } from '../../useUser';

const UserMessage = ({ text }) => {
  const { data: user } = useUser();
  return (
    <div className="sm:col-start-6 col-start-1 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <Avatar
          showFallback
          src={`${BUCKET_URL}/${user?.avatar}`}
          fallback={<IconUserFilled />}
        />
        <div className="relative mr-3 text-medium bg-tertiary py-2 px-4 rounded-xl text-white shadow-xl">
          {text}
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
