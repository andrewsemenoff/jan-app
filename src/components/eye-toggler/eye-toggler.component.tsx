import React, { useState } from "react";
import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";

interface EyeTogglerProps {
  handleEyeClick: (state: boolean) => void;
}

const EyeToggler = ({ handleEyeClick }: EyeTogglerProps) => {
  const [isShown, setIsShown] = useState(false);
  const handleOnClik = () => {
    setIsShown((state: boolean) => {
      handleEyeClick(!state);
      return !state;
    });
  };
  return (
    <SvgIcon
      handelOnClick={handleOnClik}
      svgPath={SVG_PATH.EYE}
      fashion={Fashion.ANIMATED}
      size="1.2em"
      fill={isShown ? "#0984e3" : "gray"}
      style={{ position: "absolute", right: 10, top: '.5em' ,  }}
    />
  );
};

export default EyeToggler;
