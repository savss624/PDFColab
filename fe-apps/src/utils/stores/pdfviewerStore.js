import React from "react";
import { create } from "zustand";
import toast from "react-hot-toast";

import { context } from "@utils/constants.js";
import { validateEmail } from "@utils/utils.js";

const usePDFViewerStore = create((set, get) => ({
  authToken: context.authToken,
  pdfId: context.pdfId,
  pdfUrl: null,
  pdfName: context.pdfName,
  uploadedBy: context.uploadedBy || { name: "", email: "" },
  fetchPDF: () => {
    fetch(`/api/pdfviewer/getpdf/${get().pdfId}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${get().authToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.blob();
        }
        throw new Error("Something went wrong");
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        set({ pdfUrl: url });
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  },
  isPdfShared: context.isPdfShared,
  sharedToUser: context.sharedToUser || {},
  fetchSharedPDF: () => {
    fetch(`/api/pdfviewer/getsharedpdf/${context.sharedId}/`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.blob();
        }
        throw new Error("Something went wrong");
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        set({ pdfUrl: url });
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  },
  sharedViewers: [],
  fetchSharedViewers: () => {
    fetch(`/api/pdfviewer/getsharedviewers?pdf_id=${get().pdfId}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${get().authToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        set({ sharedViewers: data.viewers });
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  },
  revokeAccess: (id) => {
    fetch(`/api/pdfviewer/revokeaccess/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${get().authToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        set({
          sharedViewers: get().sharedViewers.filter(
            (viewer) => viewer.id !== id
          ),
        });
        toast.success("Access Revoked Successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  },
}));

const useShareStore = create((set, get) => ({
  authToken: context.authToken,
  pdfId: context.pdfId,
  pdfName: context.pdfName,
  email: "",
  setEmail: (email) => {
    set({ email: email });
  },
  name: "",
  setName: (name) => {
    set({ name: name });
  },
  isAuthenticatedUser: false,
  isExternalUser: false,
  checkUserAvailability: (email) => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    fetch(`/api/user/check?email=${email.toLowerCase()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${get().authToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        if (data.message === "User is not available") {
          toast.error(
            "User not found. Please enter name for the external user"
          );
          set({
            name: "",
            isExternalUser: true,
            isAuthenticatedUser: false,
          });
        } else {
          set({
            name: data.name,
            isExternalUser: false,
            isAuthenticatedUser: true,
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  },
  isInvitationSent: false,
  link: "",
  inviteUser: () => {
    toast.promise(
      new Promise((resolve, reject) => {
        fetch("/api/pdfviewer/inviteviewer/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${get().authToken}`,
          },
          body: JSON.stringify({
            pdfId: get().pdfId,
            email: get().email.toLowerCase(),
            name: get().name,
          }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Something went wrong");
          })
          .then((data) => {
            set({
              isInvitationSent: true,
              link: `${window.location.origin}/pdfviewer/shared/${data.sharedId}`,
            });
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      }),
      {
        loading: "Sending Invitation...",
        success: "Invitation Sent Successfully",
        error: <b>Something went wrong</b>,
      }
    );
  },
  reset: () => {
    set({
      email: "",
      name: "",
      isAuthenticatedUser: false,
      isExternalUser: false,
      isInvitationSent: false,
      link: "",
    });
  },
}));

const useCommentsStore = create((set, get) => ({
  authToken: context.authToken,
  pdfId: context.pdfId,
  commentsMap: { "": [] },
  paginationPossibleMap: { "": false },
  isCommentsLoading: false,
  isMoreCommentsLoading: false,
  fetchComments: (parentCommentId) => {
    let url = `/api/pdfviewer/getcomments?pdf_id=${get().pdfId}`;
    if (parentCommentId !== "") {
      url += `&parent_comment_id=${parentCommentId}`;
    }
    if (
      get().commentsMap[parentCommentId] &&
      get().commentsMap[parentCommentId].length > 0
    ) {
      url += `&last_comment_id=${
        get().commentsMap[parentCommentId][
          get().commentsMap[parentCommentId].length - 1
        ].id
      }`;
      set({ isMoreCommentsLoading: true });
    } else if (parentCommentId === "") {
      set({ isCommentsLoading: true });
    }
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        const comments = get().commentsMap[parentCommentId] || [];
        set({
          isCommentsLoading: false,
          commentsMap: {
            ...get().commentsMap,
            [parentCommentId]: [
              ...comments,
              ...data.comments.map((comment) => ({
                id: comment.id,
                email: comment.commented_by.email,
                name: comment.commented_by.name,
                comment: comment.comment_text,
              })),
            ],
          },
          paginationPossibleMap: {
            ...get().paginationPossibleMap,
            [parentCommentId]: data.has_more,
          },
          isMoreCommentsLoading: false,
        });
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
        set({ isCommentsLoading: false, isMoreCommentsLoading: false });
      });
  },
  addComment: ({ comment, email, parentCommentId, setComment }) => {
    if (comment === "") {
      toast.error("Please enter a comment");
      return;
    } else {
      fetch("/api/pdfviewer/addcomment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfId: get().pdfId,
          email: email.toLowerCase(),
          comment: comment,
          parentCommentId: parentCommentId,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          if (!get().commentsMap[parentCommentId]) {
            get().fetchComments(parentCommentId);
          } else {
            set({
              commentsMap: {
                ...get().commentsMap,
                [parentCommentId]: [
                  {
                    id: data.id,
                    email: data.commented_by.email,
                    name: data.commented_by.name,
                    comment: data.comment_text,
                  },
                  ...get().commentsMap[parentCommentId],
                ],
              },
            });
          }
          setComment("");
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
        });
    }
  },
  deleteComment: (id, parentCommentId) => {
    fetch(`/api/pdfviewer/deletecomment/${id}/`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        set({
          commentsMap: {
            ...get().commentsMap,
            [parentCommentId]: get().commentsMap[parentCommentId].filter(
              (comment) => comment.id !== id
            ),
            [id]: [],
          },
        });
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  },
}));

export { usePDFViewerStore, useShareStore, useCommentsStore };
