import React from "react";
import { createRoot } from "react-dom/client";
import Init from "@components/common/Init.jsx";
import NotImplemented from "@components/common/NotImplemented.jsx";

const DApp = () => {
  return <div className="relative h-full"></div>;
};

const MApp = () => {
  return <NotImplemented />;
};

const root = createRoot(document.getElementById("root"));
root.render(<Init DApp={DApp} MApp={MApp} />);
