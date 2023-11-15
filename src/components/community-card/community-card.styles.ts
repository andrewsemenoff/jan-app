import styled from "styled-components";

export const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.5em;
  padding: 0.5em;
  background-color: #0984e3;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;

  cursor: pointer;
  &:hover {
    filter: saturate(2);
  }
  &:active {
    transform: translateY(0.3em);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 8px;
  }
`;

export const DescriptionBox = styled.h5`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RelativeBox = styled.div`
  position: relative;
`;

export const Label = styled.h5`
  pointer-events: none;
  top: -1.6em;
  left: 0.8em;
  z-index: 100;
  position: absolute;
  white-space: nowrap;
  background-color: grey;
  border-radius: 0.3em;
  padding: 0 0.3em;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;
export const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-right: 1em solid transparent;
  border-top: 1em solid gray;
`;

export const StatBox = styled.div`
  display: flex;
  gap: 2em;
  justify-content: center;
`;

export const StatItem = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6em;
  aspect-ratio: 1/1;
  background-color: lightgray;
  border-radius: 50%;
  &:hover {
    filter: invert();
  }
  &:hover ~ ${Label} {
    opacity: 1;
  }
`;
