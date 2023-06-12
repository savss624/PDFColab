import React, { useState } from "react";

import { useCommentsStore } from "@utils/stores/pdfviewerStore.js";

import { VerticalDotsIcon, SendIcon, LoadingIcon } from "@assets/icons.js";

import CommentContainer from "@components/pdfviewer/CommentContainer.jsx";

const CommentBox = (props) => {
  const { commentsMap, fetchComments, addComment, deleteComment } =
    useCommentsStore();
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [replyFieldOpen, setReplyFieldOpen] = useState(false);
  const [reply, setReply] = useState("");
  const comment = props.comment;

  return (
    <div
      className={`relative w-full bg-base-300 pt-4 pl-4 ${
        props.parentCommentId === "" && "pb-4"
      } rounded-md mt-2 flex flex-row justify-between items-start`}
    >
      <div className="w-full flex flex-col">
        <div className="text-xs text-secondary">
          {comment.name}
        </div>
        <div>{comment.comment}</div>
        <div className="flex flex-row">
          <button
            className="text-xs w-min text-primary mt-1"
            onClick={() => setReplyFieldOpen(!replyFieldOpen)}
          >
            Reply
          </button>
          <button
            className="text-xs w-min whitespace-nowrap text-primary mt-1 ml-4"
            onClick={() => {
              fetchComments(comment.id);
              setRepliesOpen(!repliesOpen);
            }}
          >
            See Replies
            {commentsMap[comment.id] && (
              <p className="inline"> ({commentsMap[comment.id].length})</p>
            )}
          </button>
        </div>
        {replyFieldOpen && (
          <form
            className="flex flex-row items-center m-2"
            onSubmit={(e) => {
              e.preventDefault();
              addComment({
                comment: reply,
                ...props.user,
                parentCommentId: comment.id,
                setComment: setReply,
              });
              setRepliesOpen(true);
            }}
          >
            <input
              className="w-full border-2 border-base-300 rounded-md p-2"
              placeholder="Reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button className="text-primary mx-2" type="submit">
              <SendIcon />
            </button>
          </form>
        )}
        {repliesOpen && !commentsMap[comment.id] && (
          <div className="flex flex-row items-center justify-center my-2">
            <LoadingIcon />
            <span className="text-sm">Loading Replies...</span>
          </div>
        )}
        {repliesOpen && commentsMap[comment.id] && (
          <CommentContainer
            comments={commentsMap[comment.id]}
            user={props.user}
            uploadedBy={props.uploadedBy}
            parentCommentId={comment.id}
          />
        )}
      </div>
      {(props.uploadedBy.email === props.user.email ||
        comment.email === props.user.email) && (
        <div className="dropdown dropdown-end absolute right-4 top-8">
          <label tabIndex={0}>
            <VerticalDotsIcon />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-base-100 rounded-box border"
          >
            <li>
              <button
                onClick={() => deleteComment(comment.id, props.parentCommentId)}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
