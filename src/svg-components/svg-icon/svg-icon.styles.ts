import styled, { keyframes } from "styled-components";

interface AnimatedSvg {}

export const flash = keyframes`
  0%, 100% {
    opacity: orange;
  }
  50% {
    fill: white; /* Orange color for the flashing effect */
  }
`;

interface AnimatedSvgProps{
  $fill_on_hover: string
}
export const AnimatedSvg = styled.svg<AnimatedSvgProps>`
  transition: fill ease 1s;
  transition: transform ease 0.2;
  &:hover{
    transform: scale(1.3);
    fill: ${({$fill_on_hover})=>$fill_on_hover}
  }
  &:active {
    animation: ${flash} 1s ease-out;
  }
`;
