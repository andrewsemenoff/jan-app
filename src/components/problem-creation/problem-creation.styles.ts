import styled from "styled-components";
import { TitleSection, textArea } from "../../App.style";

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export const ButtonsBar = styled.div`
  padding: 2em 0;
  display: flex;
  justify-content: center;
  gap: 1em;
`;

export const TitleSectionForProblemProposal = styled(TitleSection)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  margin-bottom: 2em;
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

export const CommunitiesListBox = styled.div`
  display: flex;
  gap: 0.5em;
  margin: 0.2em 0;
  flex-wrap: wrap;
`;
export const DescriptionTextArea = styled.textarea`
  ${textArea}
  height: 10em;
`;

export const TitleTextArea = styled.textarea`
  ${textArea}
  height: 6em;
`;
