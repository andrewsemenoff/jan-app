import { SVGProps } from "react";
import { AnimatedSvg } from "./svg-icon.styles";
import {
  ARROW_BACK,
  ARROW_FORWARD,
  BELL,
  EYE,
  SEND_MESSAGE,
  THUMB_DOWN,
  THUMB_UP,
  PENCIL,
  SAVE, 
  CANCEL
} from "./svg-paths";

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  svgPath: SVG_PATH;
  fashion?: Fashion;
  size?: string;
  fill?: string;
  fillOnHover?: string;
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
  PENCIL,
  SAVE,
  CANCEL
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
    [SVG_PATH.PENCIL]: PENCIL,
    [SVG_PATH.SAVE]: SAVE,
    [SVG_PATH.CANCEL]: CANCEL,
  }[path]);

const SvgIcon = ({
  svgPath,
  fashion = Fashion.STATIC,
  size = "1.5em",
  fill = "grey",
  fillOnHover = fill,
  style,
  ...other
}: SvgIconProps) => {
  const { path, viewBox } = getSvgPath(svgPath);

  const svgAttributes = {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: viewBox,
    fill: fill,
    $fill_on_hover: fillOnHover,
    cursor: "pointer",
    style: style,
  };

  switch (fashion) {
    case Fashion.ANIMATED:
      return (
        <AnimatedSvg {...svgAttributes} {...other}>
          {path}
        </AnimatedSvg>
      );
    case Fashion.STATIC:
      return <svg {...svgAttributes}>{path}</svg>;
  }
};

export default SvgIcon;
