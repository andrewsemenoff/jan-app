import { ChangeEvent, useEffect, useState } from "react";
import { Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { STATUS, selectUserId } from "../../features/account/accountSlice";
import {
  Comment,
  dislikeComment,
  editComment,
  getComments,
  likeComment,
} from "../../features/comments/commentsSlice";
import { Fashion, SVG_PATH } from "../../svg-components/svg-icon/svg-icon.component";
import { getLocalDateDistance } from "../../utils/timeHandling";
import CustomButton, { ButtonType } from "../button/button.component";
import CommentMenu from "../comment-menu/comment-menu.component";
import ReactionBox from "../reaction-box/reaction-box.component";
import { ButtonsBar, CommentBox, EditTextArea } from "./comment.styles";

interface CommentProps {
  comment: Comment;
}
const SingleComment = ({ comment }: CommentProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const {
    author,
    dateCreated,
    dateEdited,
    details,
    authorId,
    reactions,
    id,
    problemId,
  } = comment;
  const [editedValue, setEditedValue] = useState(details);
  useEffect(() => setEditedValue(details), [details]);
  const isOwnComment = userId === authorId;
  const [reactionRequestStatus, setReactionRequestStatus] = useState(
    STATUS.IDLE
  );

  const createdTimeAgo = getLocalDateDistance(dateCreated);

  const [editRequestStatus, setEditRequestStatus] = useState(STATUS.IDLE);
  const canSaveChanges =
    editRequestStatus === STATUS.IDLE && details !== editedValue;
  const switchOnEditMode = () => {
    setIsEditMode(true);
  };

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
  const handleCommentTextEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedValue(e.target.value);
  };
 
  const handleSaveChanges = async () => {
    if (canSaveChanges) {
      setEditRequestStatus(STATUS.PENDING)
      const status = await dispatch(
        editComment({ commentId: id, editedComment: editedValue })
      ).unwrap();
      if (status === 200) {
        await dispatch(getComments(problemId));
      }
      setEditRequestStatus(STATUS.IDLE)
      setIsEditMode(false);
    }
  };
  const handleCancelChanges = () => {
    setEditedValue(details);
    setIsEditMode(false);
  };

  return (
    <CommentBox $isOwnComment={isOwnComment}>
      <Title>{details}</Title>
      {isEditMode && (
        <div style={{ position: "relative" }}>
          <EditTextArea value={editedValue} onChange={handleCommentTextEdit} />
          <ButtonsBar>
            <CustomButton
              background= "#087808"
              svgFill="#7fbd7f"
              svgFillOnHover="white"
              disabled={!canSaveChanges}
              onClick={handleSaveChanges}
              title="save"
              size="1.5em"
              buttonType={ButtonType.ROUND_SMALL_BUTTON}
              svgElement={{
                svgPath: SVG_PATH.CHECK_MARK,
              }}
            />
            <CustomButton
              style={{ backgroundColor: "black"}}
              svgFill="grey"
              svgFillOnHover="white"
              onClick={handleCancelChanges}
              title="cancel"
              size="1.5em"
              buttonType={ButtonType.ROUND_SMALL_BUTTON}
              svgElement={{
                fashion: Fashion.STATIC,
                svgPath: SVG_PATH.CROSS,
                size: '.8em'
              }}
            />
          </ButtonsBar>
        </div>
      )}

      <h3>{createdTimeAgo}</h3>
      {dateEdited && <h3>edited at {dateEdited}</h3>}
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
        {isOwnComment && (
          <CommentMenu
            handleClickEdit={switchOnEditMode}
            commentId={id}
            problemId={problemId}
          />
        )}
      </div>
    </CommentBox>
  );
};

export default SingleComment;
