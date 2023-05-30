import React, { useEffect } from "react";
import "@styles/tailwind.css";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

import { useInitStore } from "@utils/stateManagement.js";

const Init = (props) => {
  const { platform, handleWindowResize, theme, initialThemeLoaded, loadTheme } =
    useInitStore();

  useEffect(() => {
    loadTheme();

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize, theme, loadTheme]);

  return (
    <CookiesProvider>
      <div
        className={`h-screen hide-scrollbar overflow-y-scroll bg-primary font-poppins ${
          initialThemeLoaded && "transition-colors duration-300"
        }`}
      >
        {platform === "desktop" && <props.DApp />}
        {platform === "mobile" && <props.MApp />}
        <Toaster />
      </div>
    </CookiesProvider>
  );
};

export default Init;
