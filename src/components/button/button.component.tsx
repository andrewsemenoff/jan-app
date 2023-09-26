import { ButtonHTMLAttributes } from "react";
import SvgIcon, {
  SvgIconProps
} from "../../svg-components/svg-icon/svg-icon.component";
import { BasicButton, InvertedButton, RoundButton } from "./button.styles";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: ButtonType;
  size?: string;
  svgElement?: SvgIconProps;
}

export enum ButtonType {
  INVERTED,
  BASE,
  ROUND_BUTTON,
}

const CustomButton = ({
  buttonType,
  children,
  size,
  disabled,
  svgElement,
  ...props
}: CustomButtonProps) => {
  const svgEl = svgElement && <SvgIcon {...svgElement} />;
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
