import { Avatar } from '@nextui-org/react';
import { IconUserFilled } from '@tabler/icons-react';
import { BUCKET_URL } from '../../../../config/config';

const UserMessage = ({ text, isSender, avatar, user = '', isRead, date }) => {
  console.log(date);

  return (
    <div
      className={
        isSender
          ? 'sm:col-start-6 col-start-1 col-end-13 p-3 rounded-lg'
          : 'col-start-1 sm:col-end-9 col-end-12 p-3 rounded-lg'
      }
    >
      <div
        className={
          isSender
            ? 'flex items-center justify-start flex-row-reverse '
            : 'flex flex-row items-start'
        }
      >
        <Avatar
          showFallback
          src={`${BUCKET_URL}/${avatar}`}
          fallback={<IconUserFilled />}
          isBordered
          color="primary"
          className={`${isSender ? 'hidden' : ''} min-w-10`}
        />
        <div
          className={
            isSender
              ? 'relative mr-3 text-medium bg-tertiary py-2 px-4 rounded-xl text-white shadow-xl flex flex-col'
              : 'relative ml-3 text-medium bg-primary bg-opacity-25 pt-3 pb-2 px-4 shadow-xl rounded-xl flex flex-col'
          }
        >
          <p className="font-poppins text-xs font-semibold">
            {!isSender ? user : ''}
          </p>
          <p className="break-all">{text} </p>
          <div className="flex gap-1">
            <span className="text-sm opacity-40">
              {new Date(date).toLocaleTimeString()}
            </span>
            {isSender &&
              (isRead ? (
                <span className="text-[10px] text-primary">
                  &#x2713;&#x2713;
                </span>
              ) : (
                <span className="text-[10px] text-primary"> &#x2713;</span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
