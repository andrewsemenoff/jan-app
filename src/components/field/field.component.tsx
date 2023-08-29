import { CSSProperties, ReactNode } from "react";
import { FieldTitle, Wrapper } from "./field.style";

interface FieldProps {
  fieldName?: string;
  children?: ReactNode;
  wrapperStyle?: CSSProperties;
}
const Field = ({ fieldName, children }: FieldProps) => {
  return (
    <Wrapper>
      <FieldTitle style={{ color: "white" }}>{fieldName}</FieldTitle>
      <div style={{ position: "relative", width: "17em", minWidth: "5em" }}>
        {children}
      </div>
    </Wrapper>
  );
};

export default Field;
