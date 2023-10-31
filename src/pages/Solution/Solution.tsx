import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CustomButton, { ButtonType } from "../../components/button/button.component";
import ReactionBox from "../../components/reaction-box/reaction-box.component";
import { STATUS } from "../../features/account/accountSlice";
import {
  dislikeSolution,
  editSolution,
  getSolutions,
  likeSolution,
  selectSolutions,
} from "../../features/solutions/solutionsSlice";
import { ButtonsBar, SolutionTextArea } from "./Solution.styles";
import { Fashion, SVG_PATH } from "../../svg-components/svg-icon/svg-icon.component";

const Solution = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { solution_id } = useParams();
  const solution = useAppSelector(selectSolutions).find(
    (s) => s.id === solution_id
  );
  const [isEditMode, setIsEditMode] = useState(true);
  const [text, setText] = useState(solution?.details??'');
  const [editRequestStatus, setEditRequestStatus] = useState(STATUS.IDLE);
  const [reactionRequestStatus, setReactionRequestStatus] = useState(
    STATUS.IDLE
  );
  
  const canSaveChanges = editRequestStatus === STATUS.IDLE && solution?.details !== text;

  const handleClickLike = async (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (reactionRequestStatus === STATUS.IDLE && solution) {
      setReactionRequestStatus(STATUS.PENDING);
      await dispatch(
        likeSolution({
          solutionId: solution?.id,
          problemId: solution?.problemId,
        })
      );
      await dispatch(getSolutions(solution?.problemId));
      setReactionRequestStatus(STATUS.IDLE);
    }
  };
  const handleClickDislike = async (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (reactionRequestStatus === STATUS.IDLE && solution) {
      setReactionRequestStatus(STATUS.PENDING);
      const res = await dispatch(
        dislikeSolution({
          solutionId: solution.id,
          problemId: solution.problemId,
        })
      ).unwrap();
      if (res === 200) {
        await dispatch(getSolutions(solution?.problemId));
      }
      setReactionRequestStatus(STATUS.IDLE);
    }
  };
  const handleSolutionTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleSaveChanges = async () => {
    if (canSaveChanges&& solution) {
      setEditRequestStatus(STATUS.PENDING)
      const status = await dispatch(
        editSolution({ solutionId: solution.id, editedSolution: text, problemId: solution.problemId })
      ).unwrap();
      if (status === 200) {
        navigate(`/problem/${solution.problemId}`)
      }
      setEditRequestStatus(STATUS.IDLE)
      setIsEditMode(false);
    }
  };
  const handleCancelChanges = () => {
    setIsEditMode(false);
    if(solution) navigate(`/problem/${solution.problemId}`)
  };

  return (
    solution && (
      <div>
        <ReactionBox
          reactions={solution?.reactions}
          handleClickDislike={handleClickDislike}
          handleClickLike={handleClickLike}
        />
        {isEditMode ? (
          <div style={{ position: "relative" }}>
            <SolutionTextArea
              value={text}
              onChange={handleSolutionTextChange}
            />
            <ButtonsBar>
              <CustomButton
                background="#087808"
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
                style={{ backgroundColor: "black" }}
                svgFill="grey"
                svgFillOnHover="white"
                onClick={handleCancelChanges}
                title="cancel"
                size="1.5em"
                buttonType={ButtonType.ROUND_SMALL_BUTTON}
                svgElement={{
                  fashion: Fashion.STATIC,
                  svgPath: SVG_PATH.CROSS,
                  size: ".8em",
                }}
              />
            </ButtonsBar>
          </div>
        ) : (
          <h3>{solution?.details}</h3>
        )}
      </div>
    )
  );
};

export default Solution;
