import styled, { keyframes } from "styled-components";

const jelly = keyframes`
      0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.15);
  }
  20% {
    transform: scale(0.95);
  }
  30% {
    transform: scale(1.1);
  }
  40% {
    transform: scale(0.98);
  }
  50% {
    transform: scale(1.05);
  }
  60% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
`;

export const AnimatedSvg = styled.svg`
  transition: all ease 0.2s;
  cursor: pointer;
  &:hover {
    animation: ${jelly} 2s;
  }
`;
