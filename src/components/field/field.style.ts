import styled from "styled-components";
import { Title } from "../../App.style";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1em;
  row-gap: .5em;
  flex-wrap: wrap;
`;
export const FieldTitle = styled(Title)`
  display: flex;
  min-width: 12em;
`;
