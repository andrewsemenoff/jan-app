import styled from "styled-components";

const BaseForButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
height: 2em;
  min-width: fit-content;
  padding: 0.7em 1em;
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
  border: none;
  &:hover {
    color: white;
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 6px, rgba(0, 0, 0, 0.23) 0px 1px 6px;
  }
`;
export const InvertedButton = styled(BaseForButton)`
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
