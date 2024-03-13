import { Image } from "@nextui-org/react";

export const Banner = ({ src }) => {
  return (
    <div className="w-full h-80 overflow-hidden relative flex items-center">
      <Image className="min-w-full min-h-full object-cover  " src={src}></Image>
    </div>
  );
};
