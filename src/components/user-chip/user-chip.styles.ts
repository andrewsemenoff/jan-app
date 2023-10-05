import styled from "styled-components";
import { SmallText } from "../../App.style";

export const ChipWrapper = styled.div`
  display: flex;
  gap: 0.3em;
  align-items: center;
  height: 2em;
  width: 7.5em;
  background-color: #6bbcfa;
  border-radius: 1em;
  padding: 0.2em;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.5) 0px 3px 6px;
  &:active {
    transform: translateY(0.16em);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
  }
  &:hover {
    background-color: #0984e3;
    color: white;
  }
  &:hover :nth-child(2) {
    color: white;
  }
  &:hover :nth-child(1) {
    color: #0984e3;
  }
`;

export const Label = styled(SmallText)`
  white-space: nowrap;
  overflow: hidden;      
  text-overflow: ellipsis;
`;
