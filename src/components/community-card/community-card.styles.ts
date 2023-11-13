import styled from "styled-components";

export const CardBox = styled.div`
  position: relative;
  border-radius: 0.5em;
  padding: 0.5em;
  background-color: #0984e3;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
  cursor: pointer;
  &:hover {
    filter: saturate(2);
    h3 {
      opacity: 1;
    }
  }
  &:active {
    transform: translateY(0.3em);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 8px;
  }
`;

export const Label = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  background-color: grey;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;
