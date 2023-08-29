import styled from "styled-components";
import { FormBox } from "../../App.style";

export const SignUpForm = styled(FormBox)`
  width: 32em;
`;
export const DoubleInputWrapper = styled.div`
  display: grid;
  min-width: 1em;
  max-width: 17em;
  grid-template-columns: repeat(auto-fit, minmax(8em, 5em));
  grid-template-rows: 1fr;
  grid-gap: 1em;
  justify-content: space-between;
`;
