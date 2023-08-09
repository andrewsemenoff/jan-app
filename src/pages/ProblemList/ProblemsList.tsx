import { Title } from "../../App.style";
import { getMockProblems } from "../../assets/mock_data";
import CustomButton, { ButtonType } from "../../components/button/button.component";
import ProblemItem from "../../components/problem-item/problem-item.component";
import { ListWrapper } from "./ProblemList.styles";

const ProblemsList = () => {
  const mockProblems = getMockProblems();
  return (
    <>
      <Title>ProblemsList</Title>
      <CustomButton fashion={ButtonType.BASE}>
        Propose a problem
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

