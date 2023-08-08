import styled from "styled-components";

export const ItemBox = styled.div`
  padding: 0 10%;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 4em;
  column-gap: 2em;
  &:hover{
    background-color: #e9f4fc;
  }
`;

export const TitleContainer=styled.div`
width: 30%;
`