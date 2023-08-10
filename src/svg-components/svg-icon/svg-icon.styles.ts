import styled from "styled-components";

interface AnimatedSvg {
}
export const AnimatedSvg = styled.svg`
  transition: fill ease 2s;
  transition: transform ease 0.2;

  &:hover {
    transform: scale(1.3);
  }
`;
