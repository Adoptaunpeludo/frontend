import PropTypes from "prop-types";
import { Divider } from "@nextui-org/react";

export const TitleSection = ({ title }) => {
  return (
    <div className="my-8">
      <Divider />
      <h1 className="flex justify-center m-5 w-full font-lobster">{title}</h1>
      <Divider />
    </div>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
};
