import { Title } from "../../App.style";
import { getMockProblems } from "../../assets/mock_data";
import {
  ButtonType,
  CustomButton,
} from "../../components/button/button.styles";
import ProblemItem from "../../components/problem-item/problem-item.component";
import { ListWrapper } from "./ProblemList.styles";

const ProblemsList = () => {
  const mockProblems = getMockProblems();
  return (
    <>
      <Title>ProblemsList</Title>
      <CustomButton buttonType={ButtonType.INVERTED}>
        propose a problem
      </CustomButton>
      <ListWrapper>
        {mockProblems &&
          mockProblems.map((problem, index) => (
            <ProblemItem problem={problem} key={index} />
          ))}
      </ListWrapper>
    </>
  );
};

export default ProblemsList;
