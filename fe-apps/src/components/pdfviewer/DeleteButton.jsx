import React, { useState } from "react";

import useDashboardStore from "@utils/stores/dashboardStore.js";
import { usePDFViewerStore } from "@utils/stores/pdfviewerStore.js";

import { DeleteIcon } from "@assets/svgs.js";

const DeleteButton = () => {
  const { deletePDF } = useDashboardStore();
  const { pdfId } = usePDFViewerStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-outline rounded-md w-1/5"
        onClick={() => setShowDeleteModal(true)}
      >
        <DeleteIcon />
      </button>
      <dialog
        className={`modal h-screen w-screen ${showDeleteModal && "modal-open"}`}
      >
        <form method="dialog" className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setShowDeleteModal(false)}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this PDF?
          </h3>
          <div className="modal-action justify-end items-center">
            <button
              className="btn"
              onClick={() => {
                deletePDF(pdfId);
                setShowDeleteModal();
              }}
            >
              Yes
            </button>
            <button className="btn" onClick={() => setShowDeleteModal()}>
              No
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default DeleteButton;
