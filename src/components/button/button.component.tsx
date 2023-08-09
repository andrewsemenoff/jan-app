import { ReactNode } from "react";
import { BasicButton, InvertedButton } from "./button.styles";

interface CustomButtonProps {
  fashion: string;
  children: ReactNode;
  onClick: () => void;
}

export enum ButtonType {
  INVERTED = "inverted",
  BASE = "base",
}

const CustomButton = ({ fashion, children, onClick }: CustomButtonProps) => {
  switch (fashion) {
    case ButtonType.BASE:
      return <BasicButton onClick={onClick}>{children}</BasicButton>;
    case ButtonType.INVERTED:
      return <InvertedButton onClick={onClick}>{children}</InvertedButton>;
    default:
      return <InvertedButton onClick={onClick}>{children}</InvertedButton>;
  }
};

export default CustomButton;
