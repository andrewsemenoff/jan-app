import styled, { keyframes } from "styled-components";

interface AnimatedSvg {}

export const flash = keyframes`
  0%, 100% {
    opacity: orange;
  }
  50% {
    fill: white; 
  }
`;

interface AnimatedSvgProps {
  "data-fillonhover": string;
}
export const AnimatedSvg = styled.svg<AnimatedSvgProps>`
  transition: fill ease 1s;
  transition: transform ease 0.2;
  &:hover {
    transform: scale(1.3);
    fill: ${({ "data-fillonhover": fillOnHover }) => fillOnHover};
  }
  &:active {
    animation: ${flash} 1s ease-out;
  }
`;
interface StaticSvgProps {
  'data-fillonhover': string;
}
export const StaticSvg = styled.svg<StaticSvgProps>`
  transition: fill ease .2s;
  &:hover {
    fill: ${({ "data-fillonhover": fillOnHover }) => fillOnHover ?? "white"};
  }
`;
