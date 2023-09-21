import styled from "styled-components";

interface SolutionBoxProps {
  $isYourSolution: boolean;
}
export const SolutionBox = styled.div<SolutionBoxProps>`
  align-self: ${({ $isYourSolution }) =>
    $isYourSolution ? "self-end" : "self-start"};
  width: 90%;
  height: fit-content;
  background-color: ${({ $isYourSolution }) =>
    $isYourSolution ? "lightgreen" : "grey"};
  border-radius: 0.5em;
  padding: 0.5em;
`;
