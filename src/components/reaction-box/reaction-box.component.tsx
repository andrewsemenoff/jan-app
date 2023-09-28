import { useEffect, useState } from "react";
import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import {
  NumberWrapper,
  ReactionContainer,
} from "./reaction-box.style.component";

export enum REACTION {
  LIKE = "like",
  DISLIKE = "dislike",
  NEUTRAL = "neutral",
}

interface ReactionBoxProps {
  currentUserReaction: REACTION;
  reactions: {
    likes: number;
    dislikes: number;
  };
  handleClickLike: () => void;
  handleClickDislike: () => void;
}

const ReactionBox = ({
  reactions: { likes, dislikes },
  currentUserReaction,
  handleClickLike,
  handleClickDislike,
}: ReactionBoxProps) => {
  const [reaction, setReaction] = useState(currentUserReaction);
  const [totalReactions, setTotalReactions] = useState({
    likes: likes,
    dislikes: dislikes,
  });

  useEffect(() => {
    setTotalReactions({ likes, dislikes });
  }, [likes, dislikes]);
  useEffect(() => {
    setReaction(currentUserReaction);
  }, [currentUserReaction]);

  let temp = 0;
  useEffect(() => {
    console.log(
      `ReactionBox rendered ${temp++} times; likes: ${likes} dislikes: ${dislikes} currentUserReaction: ${currentUserReaction}`
    );
  });

  const handleReactionClick = (reaction: REACTION) => {
    setReaction((state) => {
      if (state !== reaction) {
        return reaction;
      } else return REACTION.NEUTRAL;
    });
  };

  const handleLikeClicked = () => {
    handleReactionClick(REACTION.LIKE);
    handleClickLike();
  };
  const handleDislikeClicked = () => {
    handleReactionClick(REACTION.DISLIKE);
    handleClickDislike();
  };

  const likesColor = reaction === REACTION.LIKE ? "#054a7f" : "#93cefb";
  const dislikesColor = reaction === REACTION.DISLIKE ? "#e23408" : "#f8c6b9";
  return (
    <ReactionContainer>
      <SvgIcon
        onClick={handleLikeClicked}
        svgPath={SVG_PATH.THUMB_UP}
        fashion={Fashion.ANIMATED}
        fill={likesColor}
      />
      <NumberWrapper color={likesColor}>{totalReactions.likes}</NumberWrapper>
      <SvgIcon
        onClick={handleDislikeClicked}
        svgPath={SVG_PATH.THUMB_DOWN}
        fashion={Fashion.ANIMATED}
        fill={dislikesColor}
      />
      <NumberWrapper color={dislikesColor}>
        {totalReactions.dislikes}
      </NumberWrapper>
    </ReactionContainer>
  );
};

export default ReactionBox;
