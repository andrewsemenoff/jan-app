import { Subtitle } from "../../App.style";
import { getMockProblems } from "../../assets/mock_data";
import { ButtonType, CustomButton } from "../../components/button/button.styles";
import ProblemItem from "../../components/problem-item/problem-item.component";
import { ListWrapper } from "./ProblemList.styles";

const ProblemsList = () => {
  const mockProblems = getMockProblems();
  return (
    <ListWrapper>
      <Subtitle>ProblemsList</Subtitle>
      {mockProblems &&
        mockProblems.map((problem, index) => (
          <ProblemItem problem={problem} key={index} />
        ))}
      <CustomButton buttonType={ButtonType.INVERTED}>
        propose a problem
      </CustomButton>
    </ListWrapper>
  );
};

export default ProblemsList;
