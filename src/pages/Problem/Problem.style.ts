import styled from "styled-components";
import { MainSection, TitleSection, textArea } from "../../App.style";

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  column-gap: 2em;
  flex-wrap: wrap;
`;
export const TitleSectionForProblemPage = styled(TitleSection)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
  padding-right: 25%;
`;

export const MainSectionForProblemPage = styled(MainSection)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3em;
`;

export const LeftBox = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2em;
`;
export const RightBox = styled.div`
  position: sticky;
  bottom: 1em;
  padding-left: 2em;
  width: 25%;
  display: flex;
  flex-direction: column;
`;
export const DetailedText = styled.div``;

export const CommentTextArea = styled.textarea`
  ${textArea};
  min-height: 3em;
  max-height: 5em;
`;
export const SolutionTextArea = styled.textarea`
  ${textArea}
  min-height: 6em;
`;
export const HorizontalContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2em;
`;

export const SponsorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 2em;
`;
