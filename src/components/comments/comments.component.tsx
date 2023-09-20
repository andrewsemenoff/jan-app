import { ChangeEvent, useState } from "react";
import { InputWithTitleWrapper, Title } from "../../App.style";
import { useAppDispatch } from "../../app/hooks";
import { addComment } from "../../features/comments/commentsSlice";
import SvgIcon, {
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import CustomButton, { ButtonType } from "../button/button.component";
import { CommentTextArea, CommentsBox } from "./comments.styles";

interface CommentsProps{
  problemId: string,
}

const Comments = ({problemId}: CommentsProps) => {

  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState("");
  const canBeSend = !!newComment.length;
  const handleCommentTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };
  const handleSendClicked = () => {
    dispatch(addComment({newComment: newComment, problemId: problemId}));
  };
  return (
    <CommentsBox>
      <InputWithTitleWrapper style={{ position: "relative" }}>
        <Title>New Comment: </Title>
        <CommentTextArea
          onChange={handleCommentTextChange}
          placeholder="Type your comment here"
          maxLength={200}
          rows={3}
        />
        <CustomButton
          onClick={handleSendClicked}
          disabled={!canBeSend}
          buttonType={ButtonType.ROUND_BUTTON}
          size="2.5em"
          style={{
            position: "absolute",
            right: ".2em",
            bottom: ".2em",
            backgroundColor: canBeSend ? "#0984e3" : "grey",
          }}
        >
          <SvgIcon
            svgPath={SVG_PATH.SEND_MESSAGE}
            style={{
              position: "relative",
              left: "5%",
              cursor: canBeSend ? "pointer" : "not-allowed",
            }}
            fill="white"
            size="60%"
          />
        </CustomButton>
      </InputWithTitleWrapper>
    </CommentsBox>
  );
};

export default Comments;
