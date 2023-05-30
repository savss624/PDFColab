import React from "react";

import LogoButton from "@components/common/LogoButton.jsx";

const Header = () => {
  return (
    <div>
      <div className="h-[7rem] max-h-40 bg-primary flex flex-row items-center justify-between">
        <div className="mx-[6rem]">
          <LogoButton />
        </div>
        <div className="mx-12 flex flex-row">
          <a
            href="/about-us"
            className="text-[1rem] 2xl:text-[1.2rem] font-semibold text-secondary mx-12"
          >
            About Us
          </a>
          <a
            href="/contact-us"
            className="text-[1rem] 2xl:text-[1.2rem] font-semibold text-secondary mx-12"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
