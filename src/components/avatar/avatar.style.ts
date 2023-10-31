import styled from "styled-components";
export const RoundPhoto = styled.div<{ src: string; alt?: string }>`
  aspect-ratio: 1/1;
  border: 0.2em solid white;
  z-index: 3;
  border-radius: 50%;
  background-color: grey;
  background-image: ${({ src }) => `url(${src})`};
  background-size: 130%;
  background-repeat: no-repeat;
  background-position: center;
`;
