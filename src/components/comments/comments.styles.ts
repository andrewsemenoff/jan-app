import styled from "styled-components";
import { textArea } from "../../App.style";

export const CommentTextArea = styled.textarea`
  ${textArea};
  min-height: 3em;
  max-height: 5em;
`;

export const CommentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-radius: 0.5em;
  padding: 1em;
  background-color: #f0efef;
`;
