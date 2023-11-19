import styled from "styled-components";
import { MainSection, TitleSection } from "../../App.style";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.05em;
  background-color: grey;
  border-bottom: 0.05em solid grey;
`;

export const TitleSectionForProblemList = styled(TitleSection)`
  display: grid;
  grid-template-areas:
    "btn btn btn btn btn"
    "a b c d e";
  grid-template-columns: minmax(9em, 1fr) 5em 7.5em 9em minmax(12em, 20em);
  column-gap: 1em;
  row-gap: 0.5em;
  grid-template-rows: 2fr 1fr;
  align-items: end;
`;

export const MainSectionForProblemList = styled(MainSection)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
