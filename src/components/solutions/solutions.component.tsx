import { ChangeEvent, useEffect, useState } from "react";
import { InputWithTitleWrapper, Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addSolution,
  getSolutions,
  selectSolutions,
} from "../../features/solutions/solutionsSlice";
import SvgIcon, {
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import CustomButton, { ButtonType } from "../button/button.component";
import SingleSolution from "../solution/solution.component";
import { SolutionTextArea, SolutionsBox } from "./solutions.styles";

interface SolutionsProps {
  problemId: string;
}
const Solutions = ({ problemId }: SolutionsProps) => {
  const dispatch = useAppDispatch();
  const solutions = useAppSelector(selectSolutions);
  const [solutionText, setSolutionText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const canBeSend = !!solutionText.length && !isPending;

  useEffect(() => {
    dispatch(getSolutions({ problemId }));
  }, []);

  const handleSolutionTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSolutionText(e.target.value);
  };
  const handleSendClicked = async () => {
    if (canBeSend) {
      try {
        setIsPending(true);
        await dispatch(
          addSolution({ problemId: problemId, details: solutionText })
        ).unwrap();
        setSolutionText("");
      } catch (err: any) {
        console.log("error during addSolution");
      } finally {
        setIsPending(false);
      }
    }
  };
  return (
    <SolutionsBox>
      {
        solutions.map((s,index)=><SingleSolution solution={s} key={index}/>)
      }
      <InputWithTitleWrapper style={{ position: "relative" }}>
        <Title>Propose your solution:</Title>
        <SolutionTextArea
          onChange={handleSolutionTextChange}
          value={solutionText}
          placeholder="Type your solution"
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
    </SolutionsBox>
  );
};

export default Solutions;
