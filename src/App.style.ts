import styled, { css } from "styled-components";

export const LoaderBackground = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const textArea = css`
  resize: vertical;
  border-radius: 0.3em;
  padding: 1em;
  outline: none;
  border: 0.05em solid grey;
  box-sizing: border-box;
  &:hover {
    border: 0.1em solid grey;
    background-color: #e4f1fb;
    padding: 1em;
  }
  &:focus {
    border: 0.1em solid #0984e3;
    padding: 1em;
  }
`;

export const MainContentBox = styled.div`
  height: 75vh;
  padding: 0 9%;
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
`;
export const TitleSection = styled.div`
  /* background-color: green; */
  height: 15%;
  border-bottom: 0.05em solid grey;
  padding-bottom: 0.5em;
`;
export const MainSection = styled.div``;

export const SmallText = styled.div`
  font-size: 0.9em;
`;

export const Title = styled.div`
  user-select: none;
  font-weight: 700;
`;
export const InputWithTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  min-width: 10em;
  height: fit-content;
  border-radius: 0.3em;
  padding: 1em;
  background-color: #0984e3;
`;
