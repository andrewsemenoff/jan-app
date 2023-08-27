import { CSSProperties } from "react";
import { AnimatedSvg } from "./svg-icon.styles";
import {
  ARROW_BACK,
  ARROW_FORWARD,
  BELL,
  EYE,
  SEND_MESSAGE,
  THUMB_DOWN,
  THUMB_UP,
} from "./svg-paths";

export interface SvgIconProps {
  svgPath: SVG_PATH;
  fashion?: Fashion;
  size?: string;
  fill?: string;
  fillOnHover?: string;
  style?: CSSProperties;
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
  SEND_MESSAGE,
  EYE,
}

const getSvgPath = (path: SVG_PATH) =>
  ({
    [SVG_PATH.THUMB_UP]: THUMB_UP,
    [SVG_PATH.THUMB_DOWN]: THUMB_DOWN,
    [SVG_PATH.BELL]: BELL,
    [SVG_PATH.ARROW_FORWARD]: ARROW_FORWARD,
    [SVG_PATH.ARROW_BACK]: ARROW_BACK,
    [SVG_PATH.SEND_MESSAGE]: SEND_MESSAGE,
    [SVG_PATH.EYE]: EYE,
  }[path]);

const SvgIcon = ({
  svgPath,
  fashion = Fashion.STATIC,
  size = "1.5em",
  fill = "grey",
  fillOnHover = fill,
  style,
  handleOnHover,
  handelOnClick,
}: SvgIconProps) => {
  const { path, viewBox } = getSvgPath(svgPath);

  const svgAttributes = {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: viewBox,
    fill: fill,
    $fillOnHover: fillOnHover,
    cursor: "pointer",
    style: style,
  };

  switch (fashion) {
    case Fashion.ANIMATED:
      return (
        <AnimatedSvg onClick={handelOnClick} {...svgAttributes}>
          {path}
        </AnimatedSvg>
      );
    case Fashion.STATIC:
      return <svg {...svgAttributes}>{path}</svg>;
  }
};

export default SvgIcon;
