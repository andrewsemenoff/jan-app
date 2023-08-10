import { useNavigate } from "react-router-dom";
import { Title } from "../../App.style";
import { getMockProblems } from "../../assets/mock_data";
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";
import Paginator from "../../components/paginator/paginator.component";
import ProblemItem from "../../components/problem-item/problem-item.component";
import usePagination from "../../hooks/usePagination";
import { ListWrapper, MainSectionForProblemList, TitleSectionForProblemList } from "./ProblemList.styles";

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
  } = usePagination(mockProblems.length, 6);

  const problemsOnCurrentPage = mockProblems.slice(firstIndex, lastIndex);
  return (
    <>
      <TitleSectionForProblemList>
        <Title>Recent Problems</Title>
        <Title>Award</Title>
        <Title>Date</Title>
        <CustomButton
          fashion={ButtonType.BASE}
          onClick={() => navigate("problem-proposal")}
        >
          Propose a problem
        </CustomButton>
      </TitleSectionForProblemList>
      <MainSectionForProblemList>
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
      </MainSectionForProblemList>
    </>
  );
};

export default ProblemsList;
