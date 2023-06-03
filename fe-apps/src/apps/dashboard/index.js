import React from "react";
import { createRoot } from "react-dom/client";
import Init from "@components/common/Init.jsx";

import Headers from "@components/common/Header.jsx";

import Body from "@components/dashboard/Body.jsx";

const App = () => {
  return (
    <div className="relative h-full overflow-hidden">
      <Headers />
      <Body />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<Init App={App} />);
