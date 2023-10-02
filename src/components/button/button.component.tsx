import { ButtonHTMLAttributes } from "react";
import SvgIcon, {
  SvgIconProps
} from "../../svg-components/svg-icon/svg-icon.component";
import { BasicButton, InvertedButton, RoundButton, RoundSmallButton } from "./button.styles";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: ButtonType;
  size?: string;
  svgElement?: SvgIconProps;
  background?: string;
  svgFill?: string;
  svgFillOnHover?: string;
}

export enum ButtonType {
  INVERTED,
  BASE,
  ROUND_BUTTON,
  ROUND_SMALL_BUTTON,
}

const CustomButton = ({
  buttonType,
  children,
  size,
  disabled,
  svgElement,
  background,
  svgFill,
  svgFillOnHover,
  ...props
}: CustomButtonProps) => {
  
  const svgEl = svgElement && <SvgIcon {...svgElement}/>;
  switch (buttonType) {
    case ButtonType.BASE:
      return (
        <BasicButton {...props} $disabled={disabled}>
          {svgEl}
          {children}
        </BasicButton>
      );
    case ButtonType.INVERTED:
      return (
        <InvertedButton {...props} $disabled={disabled}>
          {svgEl}
          {children}
        </InvertedButton>
      );
    case ButtonType.ROUND_BUTTON:
      return (
        <RoundButton {...props} $disabled={disabled} size={size}>
          {svgEl}
          {children}
        </RoundButton>
      );
    case ButtonType.ROUND_SMALL_BUTTON:
      return (
        <RoundSmallButton {...props} $disabled={disabled} size={size} $svgFill={svgFill} $svgFillOnHover={svgFillOnHover} $background={background}>
          {svgEl}
          {children}
        </RoundSmallButton>
      );
    default:
      return (
        <InvertedButton {...props} $disabled={disabled}>
          {svgEl}
          {children}
        </InvertedButton>
      );
  }
};

export default CustomButton;
