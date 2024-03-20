import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from '@nextui-org/react';

import { UilMapMarker, UilPlay } from '@iconscout/react-unicons';

import { IconHome } from '@tabler/icons-react';
import { UnderlineVector } from '../assets/svg';
import { BUCKET_URL } from '../config/config';

export const ShelterCard = ({ shelter }) => {
  return (
    <Card className="max-w-72">
      {/* Header */}
      <CardHeader className="relative p-0 overflow-hidden">
        <Image
          src={`${BUCKET_URL}/${shelter.images[1]}`}
          alt={shelter.username}
          className="w-80 h-full object-cover min-h-[320px]"
        />

        {/* Etiqueta absolutamente posicionada para 'gato' */}
        <div className="absolute z-10 bottom-0 left-0 right-0 w-full">
          <UnderlineVector />
        </div>

        <div className="absolute z-10 bottom-2 left-1/2 -translate-x-10 w-full back">
          <Avatar
            isBordered
            color={shelter.isOnline ? 'success' : 'danger'}
            className="w-24 h-24"
            src={`${BUCKET_URL}/${shelter.images[0]}`}
            showFallback
            fallback={<IconHome className="w-10 h-10" />}
          />
        </div>
      </CardHeader>

      {/* Body */}

      <CardBody className="flex flex-column overflow-visible py-2 content-between">
        <h3 className="flex w-full font-lobster justify-center items-center text-3xl capitalize">
          {shelter.username}
        </h3>
        <p className="my-3 flex-1">
          {shelter.description !== ''
            ? shelter.description
            : `Protectora ${shelter.username}`}
        </p>
        {/* Icons */}
        <div className="flex justify-start items-baseline gap-1">
          <UilMapMarker className="fill-tertiary" />
          <span className="capitalize">
            {shelter.city !== undefined
              ? shelter.city
              : 'ubicación desconocida'}
          </span>
        </div>
      </CardBody>

      {/* Footer */}
      <CardFooter className=" flex w-full justify-center items-center border-t-1 border-primary">
        <Button
          href={`/shelters/${shelter.slug}`}
          as={Link}
          color="primary"
          size="sm"
          className="w-40"
        >
          <span className=" z-10 black font-semibold text-lg font-poppins">
            Ver
          </span>
          <UilPlay />
        </Button>
      </CardFooter>
    </Card>
  );
};
