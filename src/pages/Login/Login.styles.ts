import { Link } from "react-router-dom";
import styled from "styled-components";


export const LoginPageWrapper = styled.div`
  display: flex;
  padding: 3em 0;
  flex-wrap: wrap;
  gap: 2em;
`;
export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: fit-content;
  background-color: #0984e3;
  border-radius: 0.3em;
  padding: 1em;
`;

export const StyledLink = styled(Link)`
  margin-left: 1em;
  color: white;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
