import styled from "styled-components";

export const GridWrapper = styled.div`
  padding: 1em 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  gap: 1em;
`;
