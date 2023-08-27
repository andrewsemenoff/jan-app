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
  grid-template-columns: 8fr 1fr 2fr 3fr 3fr;
  align-items: end;
`;

export const MainSectionForProblemList = styled(MainSection)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
