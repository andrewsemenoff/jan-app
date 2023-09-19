import { useState, ChangeEvent } from "react";
import { InputWithTitleWrapper, Title } from "../../App.style";
import { SolutionTextArea, SolutionsBox } from "./solutions.styles";
import CustomButton, { ButtonType } from "../button/button.component";
import { useAppDispatch } from "../../app/hooks";
import { Solution, addSolution } from "../../features/solutions/solutionsSlice";
import SvgIcon, {
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";

interface SolutionsProps {
  solutions: Solution[];
  problemId: string;
}
const Solutions = ({ problemId, solutions }: SolutionsProps) => {
  const dispatch = useAppDispatch();
  const [solutionText, setSolutionText] = useState("");
  const canBeSend = !!solutionText.length;
  const handleSolutionTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSolutionText(e.target.value);
  };
  const handleSendClicked = async () => {
    await dispatch(
      addSolution({ problemId: problemId, details: solutionText })
    );
  };
  return (
    <SolutionsBox>
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
