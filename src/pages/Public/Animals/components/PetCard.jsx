import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from '@nextui-org/react';

import {
  UilMapMarker,
  UilMars,
  UilPlay,
  UilSchedule,
  UilVenus,
} from '@iconscout/react-unicons';

import { IconHome } from '@tabler/icons-react';
import { HeartIcon, PetSize, UnderlineVector } from '../../../../assets/svg';
import { BUCKET_URL, FALLBACK_IMAGE_CARD } from '../../../../config/config';
import {
  ageDataField,
  isNullDataField,
} from '../../../../utils/asideDataFields';
import { buttonStyleConfig } from '../../../../utils/configFormFields';
import { animalSizeEnum, genderEnum } from '../../../../utils/enumData';
import { useUser } from '../../../Private/useUser';
export const PetCard = ({ animal, isLogged }) => {
  const { data: user } = useUser();

  const isOnline =
    user?.username === animal.shelter.username ? true : animal.shelter.isOnline;

  return (
    <Card className="max-w-72">
      {/* Header */}
      <CardHeader className="relative p-0 overflow-hidden">
        <Image
          src={`${BUCKET_URL}/${animal.images[0]}`}
          alt={animal.name}
          className="w-80 object-cover h-52 aspect-square"
          fallbackSrc={`${FALLBACK_IMAGE_CARD}`}
        />

        <div className="absolute z-10 bottom-0 left-0 right-0 w-full">
          <UnderlineVector />
        </div>
        {/* Avatar */}
        <div className="absolute z-30 bottom-6 left-56  w-full ">
          <Avatar
            isBordered
            color={`${
              isLogged ? (isOnline ? 'success' : 'danger') : 'default'
            }`}
            className="w-10 h-10 bg-white"
            src={`${BUCKET_URL}/${animal.shelter.avatar}`}
            showFallback
            fallback={<IconHome className="w-10 h-10 stroke-gray-600" />}
          />
        </div>
      </CardHeader>

      {/* Body */}

      <CardBody className="flex flex-column overflow-visible py-2 gap-y-2  h-48">
        <section className=" break-all line-clamp-1 h-10">
          <h3 className="flex w-full font-lobster justify-center items-center text-4xl capitalize">
            {animal.name}
          </h3>
        </section>
        <section className="h-16">
          {/* description */}
          <p className="line-clamp-3 ">
            {animal.description !== '' && animal.description !== undefined
              ? animal.description
              : `Peludo ${animal.name}`}
          </p>
        </section>

        <section className="flex justify-between   ">
          <article className="flex justify-start gap-1 items-center">
            {/* Size */}
            <PetSize />
            <span className="truncate max-w-16">
              {isNullDataField(animal.size, animalSizeEnum)}
            </span>
          </article>
          <article className="flex justify-start gap-0 items-center">
            {/* Gender */}
            {animal.gender === 'male' ? (
              <>
                <UilMars className="fill-tertiary" />
                <span className="truncate max-w-16">
                  {isNullDataField(animal.gender, genderEnum)}
                </span>
              </>
            ) : (
              <>
                <UilVenus className="fill-tertiary" />
                <span>{isNullDataField(animal.gender, genderEnum)}</span>
              </>
            )}
          </article>
          <article className="flex justify-start items-center gap-1">
            <UilSchedule className="fill-tertiary" />
            <span className="truncate max-w-14">
              {ageDataField(animal.age)}
            </span>
          </article>
        </section>
        <section className="flex justify-start ">
          <article className="flex justify-start gap-1 items-center">
            <UilMapMarker className="fill-tertiary" />
            <span>{animal.city}</span>
          </article>
        </section>
      </CardBody>

      <Divider />

      {/* Footer */}
      <CardFooter className=" px-5 flex w-full flex-row justify-between items-center border-t-1 border-primary h-14">
        <HeartIcon
          numFavs={animal.numFavs}
          id={animal.id}
          userFavs={animal.userFavs}
          data={user}
        />

        <Button
          href={`/animals/${animal.type}s/${animal.slug}`}
          as={Link}
          color="primary"
          className={buttonStyleConfig}
        >
          Ver
          <UilPlay />
        </Button>
      </CardFooter>
    </Card>
  );
};
