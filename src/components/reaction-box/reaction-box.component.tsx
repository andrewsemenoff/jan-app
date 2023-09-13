import { useState } from "react";
import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import {
  NumberWrapper,
  ReactionContainer,
} from "./reaction-box.style.component";
interface ReactionBoxProps {
  reactions: { likes: number; dislikes: number };
}
enum REACTION {
  LIKE,
  DISLIKE,
  NEUTRAL,
}

const ReactionBox = ({ reactions: { likes, dislikes } }: ReactionBoxProps) => {
  const [personalReaction, setPersonalReaction] = useState(REACTION.NEUTRAL);
  const [totalProblemReactions, setTotalProblemReactions] = useState({
    likes: likes,
    dislikes: dislikes,
  });
  const changeTotalProblemReactions = (
    newReaction: REACTION,
    currentReaction: REACTION
  ) => {
    if (newReaction === REACTION.LIKE) {
      switch (currentReaction) {
        case REACTION.LIKE:
          setTotalProblemReactions((state) => ({
            ...state,
            likes: state.likes - 1,
          }));
          return;
        case REACTION.NEUTRAL:
          setTotalProblemReactions((state) => ({
            ...state,
            likes: state.likes + 1,
          }));
          return;
        case REACTION.DISLIKE:
          setTotalProblemReactions(({ likes, dislikes }) => ({
            dislikes: dislikes - 1,
            likes: likes + 1,
          }));
          return;
      }
    } else if (newReaction === REACTION.DISLIKE) {
      switch (currentReaction) {
        case REACTION.DISLIKE:
          setTotalProblemReactions((state) => ({
            ...state,
            dislikes: state.dislikes - 1,
          }));
          return;
        case REACTION.NEUTRAL:
          setTotalProblemReactions((state) => ({
            ...state,
            dislikes: state.dislikes + 1,
          }));
          return;
        case REACTION.LIKE:
          setTotalProblemReactions(({ likes, dislikes }) => ({
            likes: likes - 1,
            dislikes: dislikes + 1,
          }));
          return;
      }
    } else return;
  };

  const handleReactionClick = (reaction: REACTION) => {
    setPersonalReaction((state) => {
      if (state !== reaction) {
        return reaction;
      } else return REACTION.NEUTRAL;
    });
    changeTotalProblemReactions(reaction, personalReaction);
  };
  const likesColor = personalReaction === REACTION.LIKE ? "#054a7f" : "#93cefb";
  const dislikesColor =
    personalReaction === REACTION.DISLIKE ? "#e23408" : "#f8c6b9";
  return (
    <ReactionContainer>
      <SvgIcon
        onClick={() => handleReactionClick(REACTION.LIKE)}
        svgPath={SVG_PATH.THUMB_UP}
        fashion={Fashion.ANIMATED}
        fill={likesColor}
      />
      <NumberWrapper color={likesColor}>
        {totalProblemReactions.likes}
      </NumberWrapper>
      <SvgIcon
        onClick={() => handleReactionClick(REACTION.DISLIKE)}
        svgPath={SVG_PATH.THUMB_DOWN}
        fashion={Fashion.ANIMATED}
        fill={dislikesColor}
      />
      <NumberWrapper color={dislikesColor}>
        {totalProblemReactions.dislikes}
      </NumberWrapper>
    </ReactionContainer>
  );
};

export default ReactionBox;
