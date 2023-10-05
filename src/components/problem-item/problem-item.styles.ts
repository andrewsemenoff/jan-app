import styled, { css } from "styled-components";
import { SmallText } from "../../App.style";

export const ItemBox = styled.div`
  grid-template-columns: minmax(9em, 1fr) 5em 7.5em 9em minmax(12em, 20em);
  padding: 0.2em 0;
  gap: 1em;
  user-select: none;
  display: grid;
  row-gap: 0.5em;
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

export const CommunitiesListBox = styled.div`
  padding: 0 0.3em;
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  margin-bottom: .35em;
`;

export const VotesAndSolutionsLabel = styled.div`
  display: flex;
  gap: 0.5em;
  justify-self: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: lightgray;
  padding: 0.3em;
  border-radius: 0.5em;
  overflow: hidden;
`;
export const Spot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  font-size: 0.8em;
  align-items: center;
  color: white;
  width: 2em;
  min-width: max-content;
  height: 3em;
  border-radius: 50%;
  background-color: #0984e3;
  padding: 0.2em;
`;

export const AuthorAndDateWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;
export const TimeWrapper = styled(SmallText)`
  white-space: nowrap;
`;
