import styled from "styled-components";
import { textArea } from "../../App.style";

export const SolutionTextArea = styled.textarea`
  ${textArea}
  min-height: 6em;
`;


export const SolutionsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-radius: 0.5em;
  padding: 1em;
  background-color: lightgray;
`;
