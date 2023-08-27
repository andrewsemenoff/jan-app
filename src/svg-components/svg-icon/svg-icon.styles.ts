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
  $fillOnHover: string
}
export const AnimatedSvg = styled.svg<AnimatedSvgProps>`
  transition: fill ease 1s;
  transition: transform ease 0.2;
  &:hover{
    transform: scale(1.3);
    fill: ${({$fillOnHover})=>$fillOnHover}
  }
  &:active {
    animation: ${flash} 1s ease-out;
  }
`;
