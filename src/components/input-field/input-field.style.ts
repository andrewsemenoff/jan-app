import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
`;
interface BaseInputProps {
  value: string;
}

export const baseInput = css<BaseInputProps>`
  width: 16em;
  height: 2em;
  border-radius: 0.3em;
  padding: 0 .9em;
  background-color: ${({ value }) => (value?.length ? "white" : "lightgrey")};
  outline: none;
  border: 0.05em solid white;
  &:hover {
    border: 0.1em solid #032845;
    background-color: white;
    padding: 0.9em;
  }
  &:focus {
    border: 0.1em solid #032845;
    background-color: white;
    padding: 0.9em;
  }
`;

export const CustomInput = styled.input<BaseInputProps>`
  ${baseInput}
`;
