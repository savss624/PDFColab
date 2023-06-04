import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "/node_modules/react-pdf/dist/esm/Page/AnnotationLayer.css";

import { usePDFViewerStore } from "@utils/stores/pdfviewerStore.js";

import { LoadingIcon } from "@assets/icons.js";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfReader = () => {
  const { pdfUrl, pdfName } = usePDFViewerStore();
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      className="relative flex flex-col w-full"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="overflow-scroll w-full"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            width={window.innerWidth * 0.72}
            className="p-2"
          />
        ))}
      </Document>
      {!numPages && (
        <div className="absolute w-full h-full bg-base-100 flex flex-col items-center justify-center">
          <LoadingIcon />
          <span className="text-md">Loading PDF...</span>
        </div>
      )}
      {numPages && (
        <span className="absolute text-lg font-bold inset-6 text-base-100 h-min w-min whitespace-nowrap">
          {pdfName}.pdf
        </span>
      )}
    </div>
  );
};

export default PdfReader;
