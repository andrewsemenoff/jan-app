import styled from "styled-components";
import { Link } from "react-router-dom";
import { Subtitle } from "../../App.style";

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0984e3;
  height: 10vh;
  padding: 0 10%;
`;
export const LogoMottoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
`;
export const Motto = styled(Subtitle)`
  color: white;
`;
export const HeaderLink = styled(Link)`
  color: white;
  font-size: 1em;
  font-family: "Ubuntu", sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
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
