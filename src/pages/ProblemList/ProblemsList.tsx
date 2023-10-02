import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";
import Paginator from "../../components/paginator/paginator.component";
import ProblemItem from "../../components/problem-item/problem-item.component";
import {
  getProblems,
  selectAllProblems,
} from "../../features/problems/problemsSlice";
import usePagination from "../../hooks/usePagination";
import {
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
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
  }, []);

  const problemsOnCurrentPage = allProblems.slice(firstIndex, lastIndex);
  return (
    <>
      <TitleSectionForProblemList>
        <div style={{ display: "flex", gridArea: 'btn' }}>
          <CustomButton
            buttonType={ButtonType.BASE}
            onClick={() => navigate("/problem-proposal")}
            svgElement={{svgPath: SVG_PATH.ADD_PROBLEM, fill:"#aad2f1", size:"1em"}}
          > 
            propose
          </CustomButton>
        </div>
        <Title>Recent Problems</Title>
        <Title>Award</Title>
        <Title style={{ textAlign: "center" }}>Date</Title>
        <Title style={{ textAlign: "center" }}>Rating</Title>
        <Title style={{ textAlign: "center" }}>Communities</Title>
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
