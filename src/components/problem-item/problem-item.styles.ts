import styled, { css } from "styled-components";

export const ItemBox = styled.div`
  user-select: none;
  display: grid;
  grid-template-columns: 8fr 1fr 2fr 3fr 3fr;
  height: 4em;
  align-items: center;
  background-color: white;
  &:hover {
    background-color: #e9f4fc;
  }
`;

export const TitleContainer = styled.div`
  padding-right: 2em;
`;

export const label = css`
  font-size: 0.8em;
  padding: 0.5em;
  color: grey;
  border-radius: 5em;
  cursor: pointer;
  text-align: center;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;

export const forDynamicLabel = css<{ $offset?: number; $index?: number }>`
  position: absolute;
  z-index: ${(props) => props.$index};
  transform: translateX(${({ $offset }) => $offset + "em"});
  &:hover {
    z-index: 100;
  }
`;

interface CommunityLabelProps {
  $offset?: number;
  $index?: number;
  $isDynamic?: boolean;
}
export const CommunityLabel = styled.div<CommunityLabelProps>`
  width: max-content;

  background-color: #8cc4f3;
  ${label};
  ${({ $isDynamic }) => $isDynamic && forDynamicLabel}
`;

export const CommunitiesDeck = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const VotesAndSolutionsLabel = styled.div`
  justify-self: center;
  width: 70%;
  background-color: #fce8e4;
  ${label};
`;

export const AuthorAndDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
