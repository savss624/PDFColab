import React from "react";

import RightArrowIcon from "@assets/icons/right-arrow.svg";

const Button = ({ title, onClick, showArrow }) => {
  return (
    <button
      className="relative w-full btn btn-glass btn-accent rounded-2xl text-[1rem] font-semibold text-[#FFFFFF]"
      onClick={onClick}
    >
      {title}
      {showArrow && (
        <img
          className="absolute right-4 w-[1.2rem]"
          src={RightArrowIcon}
          alt="rightArrowIcon"
        />
      )}
    </button>
  );
};

export default Button;
