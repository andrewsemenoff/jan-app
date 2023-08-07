import styled from "styled-components";

export const Circle = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 100%;
  border-radius: 50%;
  background-color: white;
  z-index: 2 ;
`;
export const RoundPhoto = styled.div<{ src: string; alt?: string }>`
z-index: 3;
  width: 90%;
  position: absolute;
  left: 5%;
  bottom: 5%;
  padding-bottom: 90%;
  border-radius: 50%;
  background-color: grey;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 130%;
  background-repeat: no-repeat;
  background-position: center;
`;
