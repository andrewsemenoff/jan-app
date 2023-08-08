import styled, { css } from "styled-components";

const base = css`
  color: #aad2f1;
  background-color: #0984e3;
  border: none;
  &:hover {
    color: white;
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 6px, rgba(0, 0, 0, 0.23) 0px 1px 6px;
  }
`;
const inverted = css`
  color: #0984e3;
  border: 0.1em solid #0984e3;
  &:hover {
    color: black;
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 6px, rgba(0, 0, 0, 0.23) 0px 1px 6px;
  }
`;

interface BaseButtonProps {
  buttonType: string;
}

export enum ButtonType {
  INVERTED = "inverted",
  BASE = "base",
}

export const CustomButton = styled.button<BaseButtonProps>`
  ${({ buttonType }) => {
    switch (buttonType) {
      case ButtonType.BASE:
        return base;
      case ButtonType.INVERTED:
        return inverted;
      default:
        return base;
    }
  }}

  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5em;

  min-width: fit-content;
  padding: 0.7em 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  font-family: "Ubuntu", sans-serif;
  font-size: 1em;

  border-radius: 0.5em;
  cursor: pointer;
  transition: all .1s ease, color .5s ease;
`;
