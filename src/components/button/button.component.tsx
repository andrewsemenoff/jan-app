import { ReactNode } from "react";
import { BasicButton, InvertedButton } from "./button.styles";

interface CustomButtonProps {
  fashion: string;
  children: ReactNode;
}

export enum ButtonType {
  INVERTED = "inverted",
  BASE = "base",
}

const CustomButton = ({ fashion, children }: CustomButtonProps) => {
  switch (fashion) {
    case ButtonType.BASE:
      return <BasicButton>{children}</BasicButton>;
    case ButtonType.INVERTED:
      return <InvertedButton>{children}</InvertedButton>;
    default:
      return <InvertedButton>{children}</InvertedButton>;
  }
};

export default CustomButton;
