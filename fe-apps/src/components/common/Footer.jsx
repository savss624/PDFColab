import React from "react";

import { socialMediaLinks } from "@utils/constants.js";

import LogoButton from "@components/common/LogoButton.jsx";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-evenly h-[28rem]">
        <div className="w-full max-w-[100rem] px-[8rem] items-start">
          <LogoButton />
        </div>
        <div className="w-full max-w-[100rem] flex flex-row items-start justify-between px-[8rem]">
          <span className="text-base-200 w-[20rem] font-medium">
            Revolutionizing your career potential through the transformative
            power of referrals.
          </span>
          <div className="flex flex-col items-start justify-between">
            <span className="text-secondary font-semibold mb-[1rem]">
              COMPANY
            </span>
            <a href="/about-us" className="text-base-200">
              About Us
            </a>
            <a href="/contact-us" className="text-base-200">
              Contact Us
            </a>
          </div>
          <div className="flex flex-col items-start justify-between">
            <span className="text-secondary font-semibold mb-[1rem]">
              DEVELOPERS
            </span>
            <a href="/" className="text-base-200">
              Projects
            </a>
          </div>
          <div className="flex flex-col items-start justify-between">
            <span className="text-secondary font-semibold mb-[1rem]">
              SOCIAL
            </span>
            {socialMediaLinks.map((socialMediaLink, index) => (
              <a
                key={index}
                className="text-base-200"
                target="_blank"
                href={socialMediaLink.link}
                rel="noopener noreferrer"
              >
                {socialMediaLink.name}
              </a>
            ))}
          </div>
        </div>
        <div className="w-[96%] h-[.05rem] bg-[#1F1F1F]" />
        <div className="w-full flex flex-row justify-between items-center px-[8rem]">
          <span className="text-base-200 font-medium">
            Copyright © 2023 PDFColab. All rights reserved.
          </span>
          <div className="w-[18rem] flex flex-row justify-between items-center">
            <a className="text-base-200 font-medium" href="/">
              Terms of Use
            </a>
            <a className="text-base-200 font-medium" href="/">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
