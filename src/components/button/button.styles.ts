import styled, { css } from "styled-components";

const disabled = css`
  background-color: gray;
  color: lightgray;
  cursor: not-allowed;

  &:hover {
    background-color: gray;
    color: lightgray;
    transform: translate(0, 0);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
  svg {
    fill: lightgrey;
  }
  &:hover svg {
    fill: lightgrey;
    cursor: not-allowed;
  }
`;
const svgStyleForBasicBtn = css`
  svg {
    fill: #aad2f1;
  }
  &:hover svg {
    fill: white;
  }
`;

const svgStyleForInvertedBtn = css`
  svg {
    fill: #0984e3;
  }
  &:hover svg {
    fill: black;
  }
`;

interface BaseForButtonProps {
  $disabled?: boolean;
}
const BaseForButton = styled.button<BaseForButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  height: 2em;
  width: fit-content;
  padding: 0.8em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  font-family: "Ubuntu", sans-serif;
  font-size: 1em;

  border-radius: 0.5em;
  cursor: pointer;
  transition: all 0.1s ease;
`;

export const BasicButton = styled(BaseForButton)`
  color: #aad2f1;
  background-color: #0984e3;
  border: 0.1em solid transparent;

  &:hover {
    color: white;
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 6px, rgba(0, 0, 0, 0.23) 0px 1px 6px;
  }
  ${svgStyleForBasicBtn}
  ${({ $disabled }) => $disabled && disabled}
`;
export const InvertedButton = styled(BaseForButton)`
  color: #0984e3;
  border: 0.1em solid #0984e3;

  &:hover {
    color: black;
    border: 0.1em solid black;
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 6px, rgba(0, 0, 0, 0.23) 0px 1px 6px;
  }
  ${svgStyleForInvertedBtn}
  ${({ $disabled }) => $disabled && disabled}
`;

interface RoundButtonProps {
  size?: string;
}

export const RoundButton = styled(BasicButton)<RoundButtonProps>`
  border-radius: 50%;
  width: ${({ size }) => (size ? size : "3em")};
  height: ${({ size }) => (size ? size : "3em")};
  padding: 0.2em;
  margin: 0;
`;

interface RoundSmallButtonProps {
  size?: string;
  $background?: string;
  $svgFill?: string;
  $svgFillOnHover?: string;
  $disabled?: boolean;
}
export const RoundSmallButton = styled(BaseForButton)<RoundSmallButtonProps>`
  background-color: ${({ $background, $disabled }) =>
    $disabled ? "grey" : $background};
  border-radius: 50%;
  border: none;
  width: ${({ size }) => (size ? size : "3em")};
  height: ${({ size }) => (size ? size : "3em")};
  padding: 0.2em;
  margin: 0;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 6px, rgba(0, 0, 0, 0.23) 0px 1px 6px;
  }
  svg {
    fill: ${({ $svgFill, $disabled }) =>
      $disabled ? "lightgrey" : $svgFill ? $svgFill : "#0984e3"};
  }
  &:hover svg {
    fill: ${({ $svgFillOnHover, $disabled }) =>
      $disabled ? "lightgrey" : $svgFillOnHover ? $svgFillOnHover : "black"};
  }
  ${({ $disabled }) => $disabled && disabled}
`;
