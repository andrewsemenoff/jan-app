import { ReactNode, CSSProperties } from "react";
import { BasicButton, InvertedButton, RoundButton } from "./button.styles";

interface CustomButtonProps {
  buttonType: ButtonType;
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  size?: string;
  disabled?: boolean
}

export enum ButtonType {
  INVERTED,
  BASE,
  ROUND_BUTTON,
}

const CustomButton = ({ buttonType, children, onClick, style, size, disabled }: CustomButtonProps) => {
  switch (buttonType) {
    case ButtonType.BASE:
      return <BasicButton $disabled={disabled} onClick={onClick} style={style}>{children}</BasicButton>;
    case ButtonType.INVERTED:
      return <InvertedButton $disabled={disabled} onClick={onClick} style={style}>{children}</InvertedButton>;
    case ButtonType.ROUND_BUTTON:
      return <RoundButton $disabled={disabled} onClick={onClick} style={style} size={size}>{children}</RoundButton>;
    default:
      return <InvertedButton $disabled={disabled} onClick={onClick} style={style}>{children}</InvertedButton>;
  }
};

export default CustomButton;
