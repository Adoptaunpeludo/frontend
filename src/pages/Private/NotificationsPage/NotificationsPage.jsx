import {
  Tabs,
  Tab,
  Card,
  CardBody,
  //CardHeader,
  Button,
  Badge,
} from '@nextui-org/react';
import { TitleSection } from '../../../components';
import { IconArrowRight, IconTrash } from '@tabler/icons-react';

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
  let tabs = [
    {
      id: 'leidas',
      label: 'Leídas',
      count: '5', // Suponiendo un conteo dinámico
      content: [
        'Tu solicitud de adopción ha sido aprobada.',
        'Has recibido una respuesta a tu mensaje en el chat de la protectora.',
        'Tu cita para conocer a Max, el perro, ha sido confirmada para el 24 de marzo a las 15:00.',
      ],
    },
    {
      id: 'sinleer',
      label: 'Sin Leer',
      count: '99+', // Suponiendo un conteo dinámico
      content: [
        'Recordatorio: Tienes una cita mañana en la clínica veterinaria a las 10:00.',
        'Nueva actualización: ¡Hay nuevos animales disponibles para adopción!',
        'Alerta: Tu suscripción mensual está a punto de expirar.',
      ],
    },
  ];

  return (
    <main className="bg-default-100 flex-grow">
      <TitleSection title="Notificaciones" id="notifications" />
      <div className="flex w-full flex-col p-3">
        <Tabs aria-label="Dynamic tabs" items={tabs}>
          {(item) => (
            <Tab
              key={item.id}
              title={<TabTitle label={item.label} count={item.count} />}
              className=" mt-2 "
            >
              {item.content.map((text, index) => (
                <Card key={index} className="mx-2 mb-2">
                  <CardBody className="flex flex-row justify-between items-center">
                    <p className="text-lg">{text}</p>
                    <div>
                      <Button
                        isIconOnly
                        variant="solid"
                        color="primary"
                        size="sm"
                        name="read"
                        className="mx-1"
                        //type="submit"
                      >
                        <IconArrowRight />
                      </Button>
                      <Button
                        isIconOnly
                        variant="solid"
                        color="danger"
                        size="sm"
                        name="intent"
                        className="mx-1"
                        type="submit"
                      >
                        <IconTrash />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Tab>
          )}
        </Tabs>
      </div>
    </main>
  );
};

export default NotificationsPage;
