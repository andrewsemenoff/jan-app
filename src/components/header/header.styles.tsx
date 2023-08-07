import styled from "styled-components";
import {Link} from 'react-router-dom';

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0984e3;
  height: 10vh;
  padding: 0 10%;
`;

export const Motto = styled.div`
  color: white;
  font-size: 1em;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-style: italic;
`;
export const HeaderLink = styled(Link)`
  color: white;
  font-size: 1em;
  font-family: "Roboto", sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: .3s;
  &:hover{
    color: lightblue;
    transform: scale(1.1);
  }
`;
export const LinksContainer = styled.div`
  display: flex;
  gap: 2em;
  justify-content: space-between;
  min-width: fit-content;
  height: fit-content;
`;
