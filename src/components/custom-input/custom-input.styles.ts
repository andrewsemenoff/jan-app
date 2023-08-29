import styled, { css } from "styled-components";

interface BaseInputProps {
  value?: string;
  $withIcon?: boolean;
}
const withSpaceForIcon = css`
  padding: 0.5em 2em 0.5em 0.5em;
`;
const withoutSpaceForIcon = css`
  padding: 0.5em;
`;
export const CustomInput = styled.input<BaseInputProps>`
  width: 100%;
  height: 2em;
  border-radius: 0.3em;
  background-color: ${({ value }) => (value?.length ? "white" : "lightgrey")};
  outline: none;
  border: 0.05em solid white;
  ${({ $withIcon }) => ($withIcon ? withSpaceForIcon : withoutSpaceForIcon)}
  &:hover {
    border: 0.1em solid #032845;
    background-color: white;
    ${({ $withIcon }) => ($withIcon ? withSpaceForIcon : withoutSpaceForIcon)}
  }
  &:focus {
    border: 0.1em solid #032845;
    background-color: white;
    ${({ $withIcon }) => ($withIcon ? withSpaceForIcon : withoutSpaceForIcon)}
  }
`;
