import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import PropTypes from "prop-types";

import { HeartIcon } from "@assets/svg";
import { UnderlineVector} from "../../assets/svg/UnderlineVector"
import { useState } from "react";
import {
  UilMapMarker,
  UilVenus,
  UilMars,
  UilSchedule,
} from "@iconscout/react-unicons";

export const PetCard = ({ animal }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Card>
      {/* Header */}
      <CardHeader  className="relative p-0 overflow-hidden">
        <Image
          //! Mocked Url
          src="https://s3-alpha-sig.figma.com/img/9053/de43/cc5c8aef9e705befe6c91c5768a661e8?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ls1JgnoqYvdQNjw-Hlqvl99TciVtlEXPeRzFZRdXm4NwR9jnbJPGyrNGnh00tBcOkxO6nMn2Uvpfp-DKxkAvSBiwvPMv~z48Gm4SI8mGarr2c0L5zQDMl~Sd-0gEbpFZsHeu1639b7D~O5ZYHvFKdC9nvCFMfTSf51NtmP54-caWDlgfLoSrlSxTrtlHvo2d675VRdZ~k--~ni516gLCwFJW-YsYvU7Gx-zT13w4gf8DZdizfCV5d6gdBletJByBVSAaZYYBiLhaCzm4hVn28NNNK2Vw0pY9j-~fcNpt0RHOXlQ2NcxltkAbQMxkwNnufv0c~ZIbr2RZGAK0FKYa6g__"
          alt="Nera"
          className="w-full h-full object-cover"
        />
        {/* Etiqueta absolutamente posicionada para 'gato' */}
        <div id="tomate" className="absolute z-10 bottom-0 left-0 right-0 w-full">
          <UnderlineVector/>
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="flex flex-row overflow-visible py-2 ">
        <div>
          <h3 className="flex w-full justify-center items-center text-2xl ">
            {" "}
            {animal.name}
          </h3>
          <p>Age: {animal.age}</p>
        </div>
        <p>
          {animal.gender === "male" ? (
            <UilMars color="#3E73C7" />
          ) : (
            <UilVenus color="#3E73C7" />
          )}
        </p>
        <UilMapMarker color="#3E73C7" />
        <UilSchedule color="#3E73C7" />
      </CardBody>

      <Divider />

      {/* Footer */}
      <CardFooter className="mx-2 py-3 flex w-full flex-row justify-between items-center">
        <HeartIcon
          onClick={toggleLike}
          className={liked ? "[&>path]:stroke-transparent" : ""}
          // TODO: Change reference color
          fill={liked ? "#A5C73D" : "none"}
        ></HeartIcon>
        <Button color="primary">Ver</Button>
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
  }),
};
