import React, { useEffect, useState } from "react";

import { useCommentsStore } from "@utils/stores/pdfviewerStore.js";

import { LoadingIcon, SendIcon } from "@assets/icons.js";

import CommentContainer from "@components/pdfviewer/CommentContainer.jsx";

const CommentSection = (props) => {
  const { commentsMap, isCommentsLoading, fetchComments, addComment } =
    useCommentsStore();
  const [comment, setComment] = useState("");

  const parentCommentId = "";
  const comments = commentsMap[parentCommentId];

  useEffect(() => {
    fetchComments(parentCommentId);
  }, [fetchComments]);

  return (
    <div className="h-full w-full flex flex-col overflow-auto">
      <span className="text-xl font-semibold my-4">Comments</span>
      <div className="h-full flex flex-col justify-between overflow-auto">
        {isCommentsLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <LoadingIcon />
            <span className="text-md">Loading Comments...</span>
          </div>
        )}
        {!isCommentsLoading && comments.length === 0 && (
          <span className="text-center text-gray-500 h-full flex flex-col justify-end">
            No comments yet. Be the first to comment!
          </span>
        )}
        <CommentContainer
          comments={comments}
          user={props.user}
          uploadedBy={props.uploadedBy}
          parentCommentId={parentCommentId}
        />
        <form
          className="flex flex-row justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            addComment({
              comment: comment,
              ...props.user,
              parentCommentId: "",
              setComment: setComment,
            });
          }}
        >
          <input
            className="w-full input input-bordered rounded-md my-6"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button className="btn btn-outline" type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
