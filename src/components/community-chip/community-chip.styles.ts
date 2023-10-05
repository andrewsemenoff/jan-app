import styled from "styled-components";

export const CommunityChipBox = styled.div`
  width: max-content;
  background-color: #6bbcfa;
  font-size: 0.8em;
  padding: 0.3em;
  color: white;
  border-radius: 5em;
  cursor: pointer;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 4px, rgba(0, 0, 0, 0.5) 0px 3px 4px;
  &:active {
    transform: translateY(0.16em);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
  }
`;