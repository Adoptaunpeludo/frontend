import {
  Badge,
  Button,
  Card,
  CardBody,
  Chip,
  Skeleton,
  Tab,
  Tabs,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TitleSection } from '../../../components';

import TrashCan from '../Assistant/components/TrashCan';

import { deleteNotification, readNotification } from './service';
import { useUser } from '../useUser';
import { useNotifications } from '../useNotifications';

const TabTitle = ({ label, count }) => {
  return (
    <div className="flex align-middle">
      <Badge
        content={count}
        placement="top-right"
        className="text-primary"
        size="lg"
        classNames={{ badge: 'bg-primaryScale-700 ', string: '' }}
        isInvisible={count === 0}
      >
        <span className="truncate pr-5">{label}</span>
      </Badge>
    </div>
  );
};

const notificationsPerType = (notifications = [], type) => {
  const selectedNotifications = notifications
    .filter((notification) => notification.type === type)
    .map((notification) => ({
      message: notification.message,
      link: notification.link,
      id: notification.id,
      isRead: notification.isRead,
    }));

  const unread = selectedNotifications.filter(
    (notification) => !notification.isRead
  ).length;

  return { selectedNotifications, unread };
};

const NotificationsPage = () => {
  const { data: userNotifications, isFetching } = useNotifications();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user } = useUser();
  // if (isFetching) return;

  let tabs = [
    {
      id: 'animal-changed',
      label: 'Cambios en peludo',
      count: notificationsPerType(
        userNotifications.notifications,
        'animal-changed'
      ).unread,
      content: notificationsPerType(
        userNotifications.notifications,
        'animal-changed'
      ).selectedNotifications,
    },
    {
      id: 'new-chat',
      label: 'Nuevo chat',
      count: notificationsPerType(userNotifications.notifications, 'new-chat')
        .unread,
      content: notificationsPerType(userNotifications.notifications, 'new-chat')
        .selectedNotifications,
    },
    {
      id: 'chat-message',
      label: 'Nuevo mensaje de chat',
      count: notificationsPerType(
        userNotifications.notifications,
        'chat-message'
      ).unread,
      content: notificationsPerType(
        userNotifications.notifications,
        'chat-message'
      ).selectedNotifications,
    },
  ];

  const handleReadNotification = async (link, id, isRead) => {
    try {
      if (!isRead) {
        await readNotification(id);
        queryClient.invalidateQueries({
          queryKey: ['user-notifications'],
        });
        navigate(link);
      } else {
        navigate(link);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleReadAllNotifications = async () => {
    try {
      await readNotification('all');
      queryClient.invalidateQueries({
        queryKey: ['user-notifications'],
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
      queryClient.invalidateQueries({
        queryKey: ['user-notifications'],
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <main className="bg-default-100 flex-grow ">
      <section
        id="notifications"
        className="max-w-screen-xl w-full flex  flex-col justify-center  h-full  py-12  mx-auto gap-5"
      >
        <TitleSection title={user.username} />
        <Button
          onClick={handleReadAllNotifications}
          isDisabled={userNotifications.unread === 0}
        >
          Marcar como leidas
        </Button>
        <div className="flex w-full flex-col ">
          <Skeleton isLoaded={!isFetching}>
            <Tabs
              aria-label="Dynamic tabs"
              color="primary"
              items={tabs}
              size="lg"
              radius="none"
              variant="underlined"
              classNames={{
                base: 'max-w-screen-xl w-full flex flex-start gap-5  ',
                tabList:
                  'max-w-screen-xl w-full flex   align-middle max-sm:flex-col',
                cursor: 'w-full ',
                tab: 'max-w-fit  h-full  pb-3',
                tabContent: 'group-data-[selected=true]:text-foreground  ',
                panel: 'bg-transparent',
              }}
              fullWidth
            >
              {(item) => (
                <Tab
                  key={item.id}
                  title={<TabTitle label={item.label} count={item.count} />}
                  className=" mt-2 "
                >
                  {item.content.map((notification) => (
                    <Card
                      key={notification.id}
                      classNames={{
                        base: '',
                        header: '',
                        body: '',
                        footer: '',
                      }}
                      className={`mx-2 mb-2 ${
                        !notification.isRead
                          ? 'bg-default-300'
                          : 'bg-default-200'
                      } rounded-none border-b-1 border-primary py-5`}
                      radius="none"
                    >
                      <div>
                        <Button
                          isIconOnly
                          aria-label="trash"
                          className="bg-terciary z-50"
                          color="danger"
                          onClick={() =>
                            handleDeleteNotification(notification.id)
                          }
                        >
                          <TrashCan />
                        </Button>
                        <Button
                          onClick={() =>
                            handleReadNotification(
                              notification.link,
                              notification.id,
                              notification.isRead
                            )
                          }
                          radius="none"
                          className={`py-5 ${
                            !notification.isRead
                              ? 'bg-default-300'
                              : 'bg-default-200'
                          }`}
                        >
                          <CardBody className="flex flex-row flex-start align-middle gap-1 ">
                            <span className="text-lg truncate">
                              {notification.message}
                            </span>
                            {!notification.isRead ? (
                              <Chip
                                color="secondary"
                                size="sm"
                                variant="dot"
                                className="border-default-300"
                              />
                            ) : (
                              ''
                            )}
                          </CardBody>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </Tab>
              )}
            </Tabs>
          </Skeleton>
        </div>
      </section>
    </main>
  );
};

export default NotificationsPage;
