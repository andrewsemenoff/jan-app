import { ChangeEvent, ReactNode, CSSProperties } from "react";
import { Title } from "../../App.style";
import { CustomInput, Wrapper } from "./input-field.style";

interface InputFieldProps {
  fieldName: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "password" | "email" | "text";
  children?: ReactNode;
  wrapperStyle?: CSSProperties;
}
const InputField = ({
  fieldName,
  value,
  onChange,
  type,
  wrapperStyle,
  children,
}: InputFieldProps) => {
  return (
    <Wrapper style={wrapperStyle}>
      <Title style={{ color: "white" }}>{fieldName}:</Title>
      <CustomInput
        value={value}
        onChange={onChange}
        type={type}
      />
      {children}
    </Wrapper>
  );
};

export default InputField;
