import PropTypes from "prop-types";
import { Divider } from "@nextui-org/react";

export const TitleSection = ({ title }) => {
  return (
    <>
      <Divider />
      <h1 className="flex justify-center m-10 w-full font-lobster">{title}</h1>
      <Divider />
    </>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
};
