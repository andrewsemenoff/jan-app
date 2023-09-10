import styled from "styled-components";

export const ProfilePageWrapper = styled.div`
  display: flex;
  padding: 3em 0;
  flex-wrap: wrap;
  gap: 2em;
`;
export const ProfileCard = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #0984e3;
  gap: 2em;
  border-radius: 0.5em;
  padding: 1em;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;
export const MainInfo = styled.div`
flex: 1 0 5em ;
  width:12em ;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const AdditionalInfo = styled.div`
  flex: 1 1 12em;
  max-width: 30em;
  min-width: 12em;
`;
