import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";

import {
  UilMapMarker,
  UilVenus,
  UilMars,
  UilSchedule,
  UilPlay,
} from "@iconscout/react-unicons";

import PropTypes from "prop-types";
import { HeartIcon, UnderlineVector } from "@assets/svg/";
import { MinimalLogo } from "@assets/logos/";

import { useState } from "react";

export const PetCard = ({ animal }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Card className="max-w-80">
      {/* Header */}
      <CardHeader className="relative p-0 overflow-hidden">
        <Image
          //! TODO: Change Mocked Url
          src="https://s3-alpha-sig.figma.com/img/9053/de43/cc5c8aef9e705befe6c91c5768a661e8?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ls1JgnoqYvdQNjw-Hlqvl99TciVtlEXPeRzFZRdXm4NwR9jnbJPGyrNGnh00tBcOkxO6nMn2Uvpfp-DKxkAvSBiwvPMv~z48Gm4SI8mGarr2c0L5zQDMl~Sd-0gEbpFZsHeu1639b7D~O5ZYHvFKdC9nvCFMfTSf51NtmP54-caWDlgfLoSrlSxTrtlHvo2d675VRdZ~k--~ni516gLCwFJW-YsYvU7Gx-zT13w4gf8DZdizfCV5d6gdBletJByBVSAaZYYBiLhaCzm4hVn28NNNK2Vw0pY9j-~fcNpt0RHOXlQ2NcxltkAbQMxkwNnufv0c~ZIbr2RZGAK0FKYa6g__"
          alt="Nera"
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
          <div>
            {/* Gender */}
            {animal.gender === "male" ? (
              <div className="flex flex-row">
                <UilMars color="#3E73C7" />
                <span>{animal.gender}</span>
              </div>
            ) : (
              <div className="flex flex-row">
                <UilVenus color="#3E73C7" />
                <span>{animal.gender}</span>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-center">
            <UilMapMarker color="#3E73C7" />
            {/* TODO: Conect to clobal state */}
            <span>City</span>
          </div>
          <div className="flex flex-row justify-center">
            <UilSchedule color="#3E73C7" />
            <span>{animal.age}</span>
          </div>
        </div>
      </CardBody>

      <Divider />

      {/* Footer */}
      <CardFooter className=" px-5 flex w-full flex-row justify-between items-center">
        <HeartIcon
          onClick={toggleLike}
          className={liked ? "[&>path]:stroke-transparent" : ""}
          // TODO: Change reference color and connect to global state
          fill={liked ? "#A5C73D" : "none"}
        ></HeartIcon>
        <Button color="primary">
          <span className="font-bold">Ver</span>
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
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.oneOf(["male", "female", "unknown"]).isRequired,
    cityId: PropTypes.number.isRequired,
  }),
};
