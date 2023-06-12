import React from "react";

import { useCommentsStore } from "@utils/stores/pdfviewerStore.js";

import CommentBox from "@components/pdfviewer/CommentBox.jsx";

const CommentContainer = (props) => {
  const { paginationPossibleMap, fetchComments, isMoreCommentsLoading } =
    useCommentsStore();
  return (
    <div className="flex flex-col items-center overflow-auto hide-scrollbar">
      {props.comments.map((comment) => (
        <CommentBox
          key={comment.id}
          comment={comment}
          user={props.user}
          uploadedBy={props.uploadedBy}
          parentCommentId={props.parentCommentId}
        />
      ))}
      {paginationPossibleMap[props.parentCommentId] && (
        <button
          className={`btn btn-secondary btn-xs my-4 ${
            isMoreCommentsLoading && "btn-disabled"
          }`}
          onClick={() => fetchComments(props.parentCommentId)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CommentContainer;
