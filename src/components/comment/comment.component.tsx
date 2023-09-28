import { Title } from "../../App.style";
import { useAppSelector } from "../../app/hooks";
import { selectUserId } from "../../features/account/accountSlice";
import { Comment } from "../../features/comments/commentsSlice";
import { CommentBox } from "./comment.styles";

interface CommentProps {
    comment: Comment;
  }
  const SingleComment = ({ comment }: CommentProps) => {
    const userId = useAppSelector(selectUserId);
    const { author, dateCreated, details, authorId, reactions } = comment;
    const isOwnComment = userId === authorId;
    return (
      <CommentBox $isOwnComment = {isOwnComment}>
        <Title>{details}</Title>
        <h3>created at {dateCreated}</h3>
        <h3>by {author}</h3>
        <h4>
          likes:{reactions.totalLikes}; dislikes: {reactions.totalDislikes}
        </h4>
      </CommentBox>
    );
  };
  
  export default SingleComment;