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
