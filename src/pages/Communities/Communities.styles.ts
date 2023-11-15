import styled from "styled-components";

export const GridWrapper = styled.div`
  padding: 1em 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  gap: 1em;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

export const SortBar = styled.div`
display: flex;
flex-wrap: wrap;
  position: sticky;
  z-index: 110;
  margin-top: 1em;
  display: flex;
  gap: 1em;
  background-color: grey;
  padding: 1em;
  border-radius: 0.5em;
  opacity: 0.9;
  min-width: 8em;
`;
export const Divider = styled.div`
  text-align: center;
  padding: 0.2em;
  aspect-ratio: 1/1;
  background-color: grey;
  border-radius: 50%;
  font-size: 2em;
  margin: 0 auto;
  grid-column: 1 / -1;
  color: white;
`;
