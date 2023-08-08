import styled, { keyframes } from "styled-components";

const rotateslide = keyframes`   
  0% {
    transform: translate(0, 0);
  }
 
  50% {
    transform: translate(.2em, .2em);
  }
  100% {
    transform: translate(0, 0);
  }
`;

export const StyledPath = styled.path`

&:hover {
      animation: ${rotateslide} 1s linear infinite;
  }
  
`;
