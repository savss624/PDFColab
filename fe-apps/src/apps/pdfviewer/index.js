import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Init from "@components/common/Init.jsx";

import useAuthenticationStore from "@utils/stores/authenticationStore.js";
import { usePDFViewerStore } from "@utils/stores/pdfviewerStore.js";
import { context } from "@utils/constants.js";

import Header from "@components/common/Header.jsx";
import PdfReader from "@components/pdfviewer/PdfReader.jsx";
import ShareButton from "@components/pdfviewer/ShareButton.jsx";
import ViewersButton from "@components/pdfviewer/ViewersButton.jsx";
import DeleteButton from "@components/pdfviewer/DeleteButton.jsx";
import CommentSection from "@components/pdfviewer/CommentSection.jsx";

const App = () => {
  const { currentUser } = useAuthenticationStore();
  const { fetchPDF, uploadedBy, fetchSharedPDF, isPdfShared, sharedToUser } =
    usePDFViewerStore();

  const [user, setUser] = useState(isPdfShared ? sharedToUser : currentUser);
  useEffect(() => {
    setUser(isPdfShared ? sharedToUser : currentUser);
  }, [isPdfShared, sharedToUser, currentUser, user]);

  useEffect(() => {
    if (isPdfShared) fetchSharedPDF();
    else fetchPDF();
  }, [fetchPDF, fetchSharedPDF, isPdfShared]);

  return (
    <div className="h-full overflow-hidden">
      {!context.isPdfShared && <Header />}
      <div
        className={`h-full flex flex-row ${
          isPdfShared ? "max-h-full" : "max-h-[calc(100%-5rem)]"
        }`}
      >
        <PdfReader />
        <div className="h-full w-1/3 flex flex-col m-4 items-center">
          {context.isPdfShared && (
            <a href="/" className="my-4">
              <span className="text-4xl font-bold">PDFColab</span>
            </a>
          )}
          {!context.isPdfShared && (
            <div className="w-full flex flex-row justify-between items-center">
              <ShareButton />
              <ViewersButton />
              <DeleteButton />
            </div>
          )}
          <CommentSection user={user} uploadedBy={uploadedBy} />
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<Init App={App} />);
