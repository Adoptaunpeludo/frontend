import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";

import {
  UilMapMarker,
  UilVenus,
  UilMars,
  UilSchedule,
  UilPlay,
} from "@iconscout/react-unicons";

import PropTypes from "prop-types";
import { HeartIcon, UnderlineVector, PetSize } from "../../assets/svg";
import { MinimalLogo } from "../../assets/logos";

export const PetCard = ({ animal }) => {
  console.log({ animal });
  return (
    <Card className="max-w-80">
      {/* Header */}
      <CardHeader className="relative p-0 overflow-hidden">
        <Image
          src={`${import.meta.env.VITE_ANIMALS_IMAGES_BASE_URL}/${
            animal.images[0]
          }`}
          alt={animal.name}
          className="w-80 h-full object-cover"
        />

        {/* Etiqueta absolutamente posicionada para 'gato' */}
        <div className="absolute z-10 bottom-0 left-0 right-0 w-full">
          <UnderlineVector />
        </div>

        <div className="absolute z-10 bottom-0 left-1/2 -translate-x-10 w-full back">
          <MinimalLogo />
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="flex flex-column overflow-visible py-2 ">
        <h3 className="flex w-full font-lobster justify-center items-center text-4xl ">
          {animal.name}
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          imperdiet nulla ipsum. Cras et suscipit ligula. Nunc molestie ultrices
          eros, eu vulputate enim hendrerit a.
        </p>
        {/* Icons */}
        <div className="flex flex-row justify-center gap-3">
          {/* Size */}
          <div className="flex flex-row justify-center items-center">
            <PetSize></PetSize>
            <span className="m-1">{animal.size}</span>
          </div>

          <div>
            {/* Gender */}
            {animal.gender === "male" ? (
              <div className="flex flex-row justify-center items-center">
                <UilMars color="#3E73C7" />
                <span>{animal.gender}</span>
              </div>
            ) : (
              <div className="flex flex-row justify-center items-center">
                <UilVenus color="#3E73C7" />
                <span>{animal.gender}</span>
              </div>
            )}
          </div>
          {/* City */}
          <div className="flex flex-row justify-center items-center">
            <UilMapMarker color="#3E73C7" />
            <span>{animal.city}</span>
          </div>
          {/* Age */}
          <div className="flex flex-row justify-center items-center">
            <UilSchedule color="#3E73C7" />
            <span>{animal.age}</span>
          </div>
        </div>
      </CardBody>

      <Divider />

      {/* Footer */}
      <CardFooter className=" px-5 flex w-full flex-row justify-between items-center">
        <HeartIcon />

        <Button
          href={`/${animal.type}s/${animal.slug}`}
          as={Link}
          color="primary"
        >
          <span className=" z-10 black font-bold">Ver</span>
          <UilPlay />
        </Button>
      </CardFooter>
    </Card>
  );
};

PetCard.propTypes = {
  animal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.oneOf(["male", "female", "unknown"]).isRequired,
    cityId: PropTypes.number.isRequired,
  }),
};
