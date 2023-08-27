import styled from "styled-components";
import { MainSection, TitleSection, textArea } from "../../App.style";


export const TitleTextArea = styled.textarea`
  ${textArea}
  height: 6em;
`;
export const DescriptionTextArea = styled.textarea`
  ${textArea}
  height: 10em;
`;
export const TitleSectionForProblemProposal = styled(TitleSection)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  margin-bottom: 2em;
`;

export const MainSectionForProblemProposal = styled(MainSection)`
  display: grid;
  grid-template-columns: 50% 50%;
`;

export const FormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-right: 3em;
`;


export const PreviewWrapper = styled.div`
  height: fit-content;
  overflow-x: auto;
`;

export const CommunitySelectorWrapper = styled.div`
  display: flex;
  flex-wrap:wrap;
  gap: 2em;
`;

export const CommunitiesListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7em, 1fr));
  row-gap: .5em;
  margin: .2em 0;
`;

