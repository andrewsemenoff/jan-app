import { useEffect, useState } from "react";
import { Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { STATUS, selectUserId } from "../../features/account/accountSlice";
import {
  Comment,
  dislikeComment,
  getComments,
  likeComment,
} from "../../features/comments/commentsSlice";
import ReactionBox from "../reaction-box/reaction-box.component";
import { CommentBox } from "./comment.styles";
import {
  getOneProblem,
  likeProblem,
} from "../../features/problems/problemsSlice";
import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import CommentMenu from "../comment-menu/comment-menu.component";

interface CommentProps {
  comment: Comment;
}
const SingleComment = ({ comment }: CommentProps) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const { author, dateCreated, details, authorId, reactions, id, problemId } =
    comment;
  const isOwnComment = userId === authorId;
  const [reactionRequestStatus, setReactionRequestStatus] = useState(
    STATUS.IDLE
  );

  const handleClickLike = async () => {
    if (reactionRequestStatus === STATUS.IDLE) {
      setReactionRequestStatus(STATUS.PENDING);
      await dispatch(likeComment({ commentId: id, problemId }));
      await dispatch(getComments(problemId));
      setReactionRequestStatus(STATUS.IDLE);
    }
  };
  const handleClickDislike = async () => {
    if (reactionRequestStatus === STATUS.IDLE) {
      setReactionRequestStatus(STATUS.PENDING);
      const res = await dispatch(
        dislikeComment({ commentId: id, problemId })
      ).unwrap();
      if (res === 200) {
        await dispatch(getComments(problemId));
      }

      setReactionRequestStatus(STATUS.IDLE);
    }
  };

  return (
    <CommentBox $isOwnComment={isOwnComment}>
      <Title>{details}</Title>
      <h3>created at {dateCreated}</h3>
      <h3>by {author}</h3>
      <div style={{ display: "flex", justifyContent: "end", gap: "1em" }}>
        <ReactionBox
          style={{ fontSize: ".8em" }}
          colors={{
            myLikeColor: "black",
            likeColor: "grey",
            myDislikeColor: "black",
            dislikeColor: "grey",
          }}
          reactions={{ ...reactions }}
          handleClickDislike={handleClickDislike}
          handleClickLike={handleClickLike}
        />
        {isOwnComment && <CommentMenu commentId={id} problemId={problemId} />}
      </div>
    </CommentBox>
  );
};

export default SingleComment;
