import { useNavigate } from "react-router-dom";
import { Title, TitleSection } from "../../App.style";
import { getMockProblems } from "../../assets/mock_data";
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";
import ProblemItem from "../../components/problem-item/problem-item.component";
import { ListWrapper, TitlesWrapper } from "./ProblemList.styles";

const ProblemsList = () => {
  const mockProblems = getMockProblems();
  const navigate = useNavigate();
  return (
    <>
      <TitleSection>
        <TitlesWrapper>
          <Title>Recent Problems</Title>
          <Title>Award</Title>
          <Title>Date</Title>
          <CustomButton fashion={ButtonType.BASE} onClick={(()=>navigate('problem-proposal'))}>
            Propose a problem
          </CustomButton>
        </TitlesWrapper>
      </TitleSection>
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
