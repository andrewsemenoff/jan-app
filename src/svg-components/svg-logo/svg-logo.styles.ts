import styled from "styled-components";

export const AnimatedSvg = styled.svg`
  transition: all ease 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
