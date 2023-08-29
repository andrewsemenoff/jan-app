import styled from "styled-components";
import { FormBox } from "../../App.style";
import { Link } from "react-router-dom";

export const SignInForm = styled(FormBox)`
  width: 15em;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  color: white;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;