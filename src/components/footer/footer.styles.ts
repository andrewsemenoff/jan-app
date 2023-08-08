import styled from "styled-components";
import { Title } from "../../App.style";

export const FooterBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0984e3;
  height: 15vh;
  padding: 0 10%;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
`;

export const WhiteTitle = styled(Title)`
  color: white;
`;
export const WhiteText = styled.div`
  color: white;
`;
