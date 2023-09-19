import styled from "styled-components";
import { textArea } from "../../App.style";

export const CommentTextArea = styled.textarea`
  ${textArea};
  min-height: 3em;
  max-height: 5em;
`;

export const CommentsBox = styled.div`
  border-radius: 0.5em;
  padding: 1em;
  background-color: lightgray;
`;
