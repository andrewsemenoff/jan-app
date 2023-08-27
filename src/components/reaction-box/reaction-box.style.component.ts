import styled from "styled-components";

export const ReactionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: fit-content;
  gap: 0.5em;
`;

interface NumberWrapperProps {
  color: string;
}
export const NumberWrapper = styled.div<NumberWrapperProps>`
  transition: fill ease 1s;
  color: ${({ color }) => color};
`;
