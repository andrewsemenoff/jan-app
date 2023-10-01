import styled from "styled-components";

interface CommentBoxProps {
  $isOwnComment: boolean;
}
export const CommentBox = styled.div<CommentBoxProps>`
  align-self: ${({ $isOwnComment }) =>
    $isOwnComment ? "self-end" : "self-start"};
  width: 90%;
  height: fit-content;
  background-color: ${({ $isOwnComment }) =>
    $isOwnComment ? "#6bbcfa" : "#b5defd"};
  border-radius: 0.5em;
  padding: 0.5em;
`;

export const EditTextArea = styled.textarea`
  box-sizing: border-box;
  resize: vertical;
  border-radius: 0.3em;
  padding: 1em;
  outline: none;
  border: 0.05em solid grey;
  width: 100%;
`;

export const ButtonsBar = styled.div`
  display: flex;
  gap: 0.3em;
  position: absolute;
  right: 1em;
  bottom: .5em;
`;
