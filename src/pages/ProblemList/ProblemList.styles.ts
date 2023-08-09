import styled from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.05em;
  background-color: grey;
  border-bottom: 0.05em solid grey;
  margin-bottom: 2em;
`;

export const TitlesWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 2fr;
  align-items: end;
`;
