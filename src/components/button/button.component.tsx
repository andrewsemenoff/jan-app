import { ButtonHTMLAttributes } from "react";
import { BasicButton, InvertedButton, RoundButton } from "./button.styles";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  buttonType: ButtonType;
  size?: string;
}

export enum ButtonType {
  INVERTED,
  BASE,
  ROUND_BUTTON,
}

const CustomButton = ({ buttonType, children, size, disabled, ...props }: CustomButtonProps) => {
  switch (buttonType) {
    case ButtonType.BASE:
      return <BasicButton {...props}  $disabled={disabled} >{children}</BasicButton>;
    case ButtonType.INVERTED:
      return <InvertedButton {...props} $disabled={disabled} >{children}</InvertedButton>;
    case ButtonType.ROUND_BUTTON:
      return <RoundButton {...props} $disabled={disabled}  size={size}>{children}</RoundButton>;
    default:
      return <InvertedButton {...props} $disabled={disabled} >{children}</InvertedButton>;
  }
};

export default CustomButton;
