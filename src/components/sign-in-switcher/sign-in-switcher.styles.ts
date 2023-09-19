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

interface OvalProps {
  $isSignedIn: boolean;
}

export const Oval = styled.div<OvalProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ $isSignedIn }) =>
    $isSignedIn ? "#a4d72e" : "#d3d3d3"};
  width: 5.8em;
  height: 1.5em;
  border-radius: 1em;
`;
interface CustomAvatarProps {
  $isSignedIn: boolean;
}
interface SwitcherTextProps {
  $isSignedIn: boolean;
}

export const CustomAvatar = styled.div<CustomAvatarProps>`
  left: 0.1em;
  position: absolute;
  z-index: 2;
  width: 1.3em;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${({ $isSignedIn = false }) =>
    $isSignedIn ? "#709220" : "#0984e3"};
  cursor: pointer;
  transition: all ease-in-out 0.5s;
  transform: translateX(
    ${({ $isSignedIn = false }) => ($isSignedIn ? "4.3em" : "0%")}
  );
  &:hover {
    filter: brightness(1.4);
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
  color: ${({ $isSignedIn = false }) => ($isSignedIn ? "white" : "#0984e3")};
  font-size: 1em;
  font-family: "Ubuntu", sans-serif;
  transition: all ease-in-out 0.5s;
  transform: translateX(
    ${({ $isSignedIn = false }) => ($isSignedIn ? "0%" : "1.2em")}
  );
  animation: ${fadeIn} 0.3s ease;
`;
