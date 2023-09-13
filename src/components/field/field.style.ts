import styled from "styled-components";
import { Title } from "../../App.style";

interface TooltipProps {
  $isShown: boolean;
}
export const Tooltip = styled.div<TooltipProps>`
  visibility: hidden;
  opacity: ${({ $isShown }) => ($isShown ? 1 : 0)};
  width: 100%;
  height: fit-content;
  background-color: #022e4f;
  color: #fff;
  text-align: center;
  border-radius: 0.5em;
  position: absolute;
  bottom: 125%;
  z-index: 10;
  padding: 0.5em;
  &::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -0.5em;
    border-width: 0.5em;
    border-style: solid;
    border-color: #022e4f transparent transparent transparent;
  }
`;
export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1em;
  row-gap: 0.5em;
  flex-wrap: wrap;
  &:hover {
    ${Tooltip} {
      visibility: visible;
    }
  }
`;
export const FieldTitle = styled(Title)`
  display: flex;
  min-width: 2em;
`;
