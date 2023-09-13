import { useNavigate } from "react-router-dom";
import { useEffect} from 'react';
import { Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";
import Paginator from "../../components/paginator/paginator.component";
import ProblemItem from "../../components/problem-item/problem-item.component";
import { getProblems, selectAllProblems } from "../../features/problems/problemsSlice";
import usePagination from "../../hooks/usePagination";
import {
  ListWrapper,
  MainSectionForProblemList,
  TitleSectionForProblemList,
} from "./ProblemList.styles";

const ProblemsList = () => {
  // const mockProblems = getMockProblems(100);
  const allProblems = useAppSelector(selectAllProblems);

  const navigate = useNavigate();
  const {
    totalPages,
    currentPage,
    firstIndex,
    lastIndex,
    nextPage,
    prevPage,
    // setPage,
  } = usePagination(allProblems.length, 6);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProblems());
  }, [])
  

  const problemsOnCurrentPage = allProblems.slice(firstIndex, lastIndex);
  return (
    <>
      <TitleSectionForProblemList>
        <Title>Recent Problems</Title>
        <Title>Award</Title>
        <Title style={{ textAlign: "center" }}>Date</Title>
        <Title style={{ textAlign: "center" }}>Rating</Title>
        <CustomButton
          buttonType={ButtonType.BASE}
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
