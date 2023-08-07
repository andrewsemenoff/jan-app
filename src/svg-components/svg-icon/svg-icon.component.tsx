import { AnimatedSvg } from "./svg-icon.styles";
import { BELL, THUMB_DOWN, THUMB_UP } from "./svg-paths";

export interface SvgIconProps {
  svgPath: SVG_PATH;
  fashion?: Fashion;
  size?: string;
  color?: string;
  colorOnHover?: string;
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
}

const getSvgPath = (path: SVG_PATH) =>
  ({
    [SVG_PATH.THUMB_UP]: THUMB_UP,
    [SVG_PATH.THUMB_DOWN]: THUMB_DOWN,
    [SVG_PATH.BELL]: BELL,
  }[path]);

const SvgIcon = ({
  svgPath,
  fashion = Fashion.STATIC,
  size = "1.5em",
  color = "grey",
  colorOnHover = "#0984e3",
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
    fill: color,
    cursor: "pointer",
  };

  switch (fashion) {
    case Fashion.ANIMATED:
      return (
        <AnimatedSvg
          colorOnHover={colorOnHover}
          onMouseEnter={handleOnHover}
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
