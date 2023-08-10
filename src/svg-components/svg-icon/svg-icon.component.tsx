import { AnimatedSvg } from "./svg-icon.styles";
import {
  ARROW_BACK,
  ARROW_FORWARD,
  BELL,
  THUMB_DOWN,
  THUMB_UP,
} from "./svg-paths";
import { useState } from "react";

export interface SvgIconProps {
  svgPath: SVG_PATH;
  fashion?: Fashion;
  size?: string;
  fill?: string;
  fillOnHover?: string;
  handleOnHover?: () => void;
  handelOnClick?: () => void;
}
export enum Fashion {
  ANIMATED,
  STATIC,
}
export enum SVG_PATH {
  THUMB_UP,
  THUMB_DOWN,
  BELL,
  ARROW_FORWARD,
  ARROW_BACK,
}

const getSvgPath = (path: SVG_PATH) =>
  ({
    [SVG_PATH.THUMB_UP]: THUMB_UP,
    [SVG_PATH.THUMB_DOWN]: THUMB_DOWN,
    [SVG_PATH.BELL]: BELL,
    [SVG_PATH.ARROW_FORWARD]: ARROW_FORWARD,
    [SVG_PATH.ARROW_BACK]: ARROW_BACK,
  }[path]);

const SvgIcon = ({
  svgPath,
  fashion = Fashion.STATIC,
  size = "1.5em",
  fill = "grey",
  fillOnHover = "#0984e3",
  handleOnHover,
  handelOnClick,
}: SvgIconProps) => {
  const { path, viewBox } = getSvgPath(svgPath);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (handleOnHover) handleOnHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const svgAttributes = {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: viewBox,
    fill: isHovered ? fillOnHover : fill,
    cursor: "pointer",
  };

  switch (fashion) {
    case Fashion.ANIMATED:
      return (
        <AnimatedSvg
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handelOnClick}
          {...svgAttributes}
        >
          {path}
        </AnimatedSvg>
      );
    case Fashion.STATIC:
      return <svg {...svgAttributes}>{path}</svg>;
  }
};

export default SvgIcon;
