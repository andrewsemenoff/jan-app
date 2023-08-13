import styled, { css } from "styled-components";
import { MainSection, TitleSection } from "../../App.style";

const textArea = css`
  resize: vertical;
  border-radius: 0.3em;
  padding: 1em;
  outline: none;
  border: 0.05em solid grey;
  box-sizing: border-box;
  &:hover {
    border: 0.1em solid grey;
    padding: 1em;
  }
  &:focus {
    border: 0.1em solid #0984e3;
    padding: 1em;
  }
`;
export const TitleTextArea = styled.textarea`
  ${textArea}
  height: 6em;
`;
export const DescriptionTextArea = styled.textarea`
  height: 10em;
  ${textArea}
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
export const FormWithTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  /* gap: .5em; */
`;

export const CommunityBox = styled.div`
  background-color: #0984e3;
  font-size: .8em;
  width: min-content;
  color: white;
  text-align: center;
  border-radius: 5em;
  padding: .5em;
  margin: 1em 0;
`;
