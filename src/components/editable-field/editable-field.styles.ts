import styled from "styled-components";

export const Wrapper = styled.div`
  min-width: 10em;
  max-width: 25em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const FieldTitle = styled.div`
  flex: 1 1 5em;
  font-size: 1em;
`;
export const ValueWithEditToolBar = styled.div`
  flex: 1 1 10em;
  display: flex;
  justify-content: space-between;
`;

export const FieldValue = styled.input`
  width: 80%;
  font-size: 1.2em;
  border: none;
  outline: none;
  background: none;
  color: white;
  font-style: italic;
`;

export const EditToolsBar = styled.div`
  width: 2.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
