import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { STATUS, selectUserId } from "../../features/account/accountSlice";
import {
  Solution,
  dislikeSolution,
  getSolutions,
  likeSolution,
} from "../../features/solutions/solutionsSlice";
import ReactionBox from "../reaction-box/reaction-box.component";
import { SolutionPreviewBox } from "./solution.styles";

interface SolutionProps {
  solution: Solution;
}
const SingleSolution = ({ solution }: SolutionProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [reactionRequestStatus, setReactionRequestStatus] = useState(
    STATUS.IDLE
  );
  const userId = useAppSelector(selectUserId);
  const { id, author, dateCreated, dateEdited, details, reactions, problemId } = solution;

  const handleClickLike = async (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (reactionRequestStatus === STATUS.IDLE) {
      setReactionRequestStatus(STATUS.PENDING);
      await dispatch(likeSolution({ solutionId: id, problemId }));
      await dispatch(getSolutions(problemId));
      setReactionRequestStatus(STATUS.IDLE);
    }
  };
  const handleClickDislike = async (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (reactionRequestStatus === STATUS.IDLE) {
      setReactionRequestStatus(STATUS.PENDING);
      const res = await dispatch(
        dislikeSolution({ solutionId: id, problemId })
      ).unwrap();
      if (res === 200) {
        await dispatch(getSolutions(problemId));
      }
      setReactionRequestStatus(STATUS.IDLE);
    }
  };

  return (
    <SolutionPreviewBox onClick={() => navigate(`/solution/${id}`)}>
      <Title>{details}</Title>
      <h3>created at {dateCreated}</h3>
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
      </div>
    </SolutionPreviewBox>
  );
};

export default SingleSolution;
