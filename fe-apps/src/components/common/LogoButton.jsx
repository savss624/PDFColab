import React from "react";

import Logo from "@assets/images/logo.png";

const LogoButton = () => {
  return (
    <a href="/">
      <img className="object-cover w-[16rem]" src={Logo} alt="Logo" />
    </a>
  );
};

export default LogoButton;
