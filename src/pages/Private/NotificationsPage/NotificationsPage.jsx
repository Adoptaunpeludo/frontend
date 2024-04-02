import {
  Tabs,
  Tab,
  Card,
  CardBody,
  //CardHeader,
  Badge,
  Button,
  Skeleton,
} from '@nextui-org/react';
import { TitleSection } from '../../../components';
import { useNotifications } from '../useNotifications';
import { useNavigate } from 'react-router-dom';
import { readNotification } from './service';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const TabTitle = ({ label, count }) => {
  return (
    <div>
      <Badge
        content={count}
        size="lg"
        color="primary"
        className="flex top-0 right-0"
      >
        <p className="m-1 text-lg">{label}</p>
      </Badge>
    </div>
  );
};

const NotificationsPage = () => {
  const { data: userNotifications, isFetching } = useNotifications();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // if (isFetching) return;

  const unreadMessages = userNotifications.notifications
    .filter((notification) => notification.isRead === false)
    .map((notification) => ({
      message: notification.message,
      link: notification.link,
      id: notification.id,
      isRead: notification.isRead,
    }));
  const readMessages = userNotifications.notifications
    .filter((notification) => notification.isRead === true)
    .map((notification) => ({
      message: notification.message,
      link: notification.link,
      id: notification.id,
      isRead: notification.isRead,
    }));

  let tabs = [
    {
      id: 'sinleer',
      label: 'Sin Leer',
      count: userNotifications.unread,
      content: unreadMessages,
    },
    {
      id: 'leidas',
      label: 'Leídas',
      count: userNotifications.read,
      content: readMessages,
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

  return (
    <main className="bg-default-100 flex-grow">
      <TitleSection title="Notificaciones" id="notifications" />
      <div className="flex w-full flex-col p-3">
        <Skeleton isLoaded={!isFetching}>
          <Tabs aria-label="Dynamic tabs" items={tabs}>
            {(item) => (
              <Tab
                key={item.id}
                title={<TabTitle label={item.label} count={item.count} />}
                className=" mt-2 "
              >
                {item.content.map((notification) => (
                  <Card className="mx-2 mb-2" key={notification.id}>
                    <Button
                      onClick={() =>
                        handleReadNotification(
                          notification.link,
                          notification.id,
                          notification.isRead
                        )
                      }
                    >
                      <CardBody className="flex flex-row justify-between items-center">
                        <p className="text-lg">{notification.message}</p>
                      </CardBody>
                    </Button>
                  </Card>
                ))}
              </Tab>
            )}
          </Tabs>
        </Skeleton>
      </div>
    </main>
  );
};

export default NotificationsPage;
