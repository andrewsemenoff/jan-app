import { useNavigate } from "react-router-dom";
import { Title, TitleSection } from "../../App.style";
import { getMockProblems } from "../../assets/mock_data";
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";
import Paginator from "../../components/paginator/paginator.component";
import ProblemItem from "../../components/problem-item/problem-item.component";
import { ListWrapper, TitlesWrapper } from "./ProblemList.styles";
import usePagination from "../../hooks/usePagination";

const ProblemsList = () => {
  const mockProblems = getMockProblems(102);
  const navigate = useNavigate();
  const {
    totalPages,
    currentPage,
    firstIndex,
    lastIndex,
    nextPage,
    prevPage,
    setPage,
  } = usePagination(mockProblems.length, 8);

  const problemsOnCurrentPage = mockProblems.slice(firstIndex, lastIndex);
  return (
    <>
      <TitleSection>
        <TitlesWrapper>
          <Title>Recent Problems</Title>
          <Title>Award</Title>
          <Title>Date</Title>
          <CustomButton
            fashion={ButtonType.BASE}
            onClick={() => navigate("problem-proposal")}
          >
            Propose a problem
          </CustomButton>
        </TitlesWrapper>
      </TitleSection>
      <ListWrapper>
        {problemsOnCurrentPage &&
          problemsOnCurrentPage.map((problem, index) => (
            <ProblemItem problem={problem} key={index} />
          ))}
      </ListWrapper>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        handleClickNext={nextPage}
        handleClickPrev={prevPage}
      />
    </>
  );
};

export default ProblemsList;
