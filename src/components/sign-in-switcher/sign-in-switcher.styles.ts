import styled, { css, keyframes } from "styled-components";

const whenSwitchedOn = css`
  left: auto;
  right: 0.1em;
`;
const whenSwitchedOff = css`
  right: auto;
  left: 0.1em;
`;

const fadeIn = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Oval = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: grey;
  width: 5.8em;
  height: 1.5em;
  border-radius: 1em;
`;
interface CustomAvatarProps {
  isSignedIn: boolean;
}
interface SwitcherTextProps {
  isSignedIn: boolean;
}

export const CustomAvatar = styled.div<CustomAvatarProps>`
  left: 0.1em;
  position: absolute;
  z-index: 2;
  width: 1.3em;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: #0984e3;
  cursor: pointer;
  transition: all ease-in-out 0.5s;
  transform: translateX(
    ${({ isSignedIn = false }) => (isSignedIn ? "4.3em" : "0%")}
  );
  &:hover {
    filter: brightness(1.5);
  }
`;

export const SwitcherText = styled.div<SwitcherTextProps>`
  position: absolute;
  user-select: none;
  z-index: 1;
  margin: 0 0.2em;
  width: 4em;
  opacity: 1;
  text-align: center;
  color: #b0c7d8;
  font-size: 1em;
  font-family: "Ubuntu", sans-serif;
  transition: all ease-in-out 0.5s;
  transform: translateX(
    ${({ isSignedIn = false }) => (!isSignedIn ? "1.2em" : "0%")}
  );
  animation: ${fadeIn} 0.3s ease;
`;
