import styled from "styled-components";

interface AnimatedSvg {
  colorOnHover: string;
}
export const AnimatedSvg = styled.svg<AnimatedSvg>`
  transition: fill ease 0.7s;
  transition: transform ease 0.2;

  &:hover {
    transform: scale(1.3);
    fill: ${({ colorOnHover }) => colorOnHover};
  }
`;
