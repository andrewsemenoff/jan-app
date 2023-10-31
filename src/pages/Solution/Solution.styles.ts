import styled from "styled-components";
import { textArea } from "../../App.style";

export const SolutionTextArea = styled.textarea`
  ${textArea};
  width: 100%;
  min-height: 3em;
  max-height: fit-content;
`;
export const ButtonsBar = styled.div`
  display: flex;
  gap: 0.3em;
  position: absolute;
  right: 1em;
  bottom: .5em;
`;