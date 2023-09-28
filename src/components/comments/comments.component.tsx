import { ChangeEvent, useEffect, useState } from "react";
import { Comment as CommentSpinner } from "react-loader-spinner";
import { InputWithTitleWrapper, Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsSignedIn } from "../../features/account/accountSlice";
import {
  addComment,
  getComments,
  selectComments,
} from "../../features/comments/commentsSlice";
import { SVG_PATH } from "../../svg-components/svg-icon/svg-icon.component";
import CustomButton, { ButtonType } from "../button/button.component";
import SingleComment from "../comment/comment.component";
import { CommentTextArea, CommentsBox } from "./comments.styles";

interface CommentsProps {
  problemId: string;
}

const Comments = ({ problemId }: CommentsProps) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const isSignedIn = useAppSelector(selectIsSignedIn);

  const [newComment, setNewComment] = useState("");
  const [isPending, setIsPending] = useState(false);
  const canBeSend = !!newComment.length && !isPending;

  const handleCommentTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };
  const handleSendClicked = async () => {
    if (canBeSend) {
      try {
        setIsPending(true);
        await dispatch(
          addComment({ newComment: newComment, problemId: problemId })
        ).unwrap();
        setNewComment("");
        await dispatch(getComments(problemId));
      } finally {
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      dispatch(getComments(problemId));
    }
  }, [isSignedIn]);

  return (
    <CommentsBox>
      {comments.map((c, index) => (
        <SingleComment comment={c} key={index} />
      ))}
      <InputWithTitleWrapper style={{ position: "relative" }}>
        <Title>New Comment: </Title>
        <CommentTextArea
          onChange={handleCommentTextChange}
          placeholder="Type your comment here"
          maxLength={200}
          rows={3}
        />
        {isPending && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <CommentSpinner
              visible={true}
              height="5em"
              width="5em"
              ariaLabel="comment-loading"
              wrapperClass="comment-wrapper"
              color="#fff"
              backgroundColor="#0984e3"
            />
          </div>
        )}
        <CustomButton
          onClick={handleSendClicked}
          disabled={!canBeSend}
          buttonType={ButtonType.ROUND_BUTTON}
          size="2.5em"
          svgElement={{
            svgPath: SVG_PATH.SEND_MESSAGE,
            style: {
              position: "relative",
              left: "5%",
            },
            size: "60%",
          }}
          style={{
            position: "absolute",
            right: ".2em",
            bottom: ".2em",
          }}
        />
      </InputWithTitleWrapper>
    </CommentsBox>
  );
};

export default Comments;
