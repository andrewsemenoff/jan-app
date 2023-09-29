import { CSSProperties, HTMLAttributes, StyleHTMLAttributes, useEffect, useState } from "react";
import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import {
  NumberWrapper,
  ReactionContainer,
} from "./reaction-box.style.component";
import { actionAuthorInfo } from "../../features/problems/problemsSlice";
import { useAppSelector } from "../../app/hooks";
import { selectUserId } from "../../features/account/accountSlice";

const myLikeDefaultColor = "#054a7f";
const likeDefaultColor = "#93cefb";
const myDislikeDefaultColor = "#e23408";
const dislikeDefaultColor = "#f8c6b9";

export enum REACTION {
  LIKE = "like",
  DISLIKE = "dislike",
  NEUTRAL = "neutral",
}

interface ReactionBoxProps {
  style?: CSSProperties
  colors?: {
    myLikeColor: string;
    likeColor: string;
    myDislikeColor: string;
    dislikeColor: string;
  };
  reactions: {
    totalDislikes: number;
    totalLikes: number;
    likes: actionAuthorInfo[];
    dislikes: actionAuthorInfo[];
  };
  handleClickLike: () => void;
  handleClickDislike: () => void;
}

const ReactionBox = ({
  style,
  colors,
  reactions: { totalDislikes, totalLikes, likes, dislikes },
  handleClickLike,
  handleClickDislike,
}: ReactionBoxProps) => {
  const userId = useAppSelector(selectUserId);
  const isLikedByCurrentUser = likes.some((like) => like.profileId === userId);
  const isDislikedByCurrentUser = dislikes.some(
    (like) => like.profileId === userId
  );

  const currentUserReaction = isLikedByCurrentUser
    ? REACTION.LIKE
    : isDislikedByCurrentUser
    ? REACTION.DISLIKE
    : REACTION.NEUTRAL;

  const handleLikeClicked = () => {
    handleClickLike();
  };
  const handleDislikeClicked = () => {
    handleClickDislike();
  };

  const likesColor =
    currentUserReaction === REACTION.LIKE
      ? colors?.myLikeColor ?? myLikeDefaultColor
      : colors?.likeColor ?? likeDefaultColor;
  const dislikesColor =
    currentUserReaction === REACTION.DISLIKE
      ? colors?.myDislikeColor ?? myDislikeDefaultColor
      : colors?.dislikeColor ?? dislikeDefaultColor;
  return (
    <ReactionContainer style={{...style}}>
      <SvgIcon
        onClick={handleLikeClicked}
        svgPath={SVG_PATH.THUMB_UP}
        fashion={Fashion.ANIMATED}
        fill={likesColor}
      />
      <NumberWrapper color={likesColor}>{totalLikes}</NumberWrapper>
      <SvgIcon
        onClick={handleDislikeClicked}
        svgPath={SVG_PATH.THUMB_DOWN}
        fashion={Fashion.ANIMATED}
        fill={dislikesColor}
      />
      <NumberWrapper color={dislikesColor}>{totalDislikes}</NumberWrapper>
    </ReactionContainer>
  );
};

export default ReactionBox;
