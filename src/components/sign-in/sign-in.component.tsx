import { ChangeEvent, useState } from "react";
import { SmallText, Title } from "../../App.style";
import CustomButton, { ButtonType } from "../button/button.component";
import { CustomInput } from "../custom-input/custom-input.styles";
import EyeToggler from "../eye-toggler/eye-toggler.component";
import Field from "../field/field.component";
import { SignInForm, StyledLink } from "./sign-in.styles";
import { useAppDispatch } from "../../app/hooks";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  return (
    <SignInForm>
      <Title style={{ textAlign: "center" }}>Log In</Title>
      <Field fieldName="Email">
        <CustomInput type="email" value={email} onChange={handleEmailChange} />
      </Field>
      <Field fieldName="Password">
        <CustomInput
          type={isPassVisible ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          $withIcon
        />
        <EyeToggler
          handleEyeClick={(state) => {
            setIsPassVisible(state);
          }}
        />
      </Field>
      <CustomButton buttonType={ButtonType.INVERTED} style={{ border: "none" }}>
        Log in
      </CustomButton>
      <SmallText style={{ textAlign: "center" }}>
        Forgot your password?
        <br />
        <StyledLink to={"/"}>restore password</StyledLink>
      </SmallText>
    </SignInForm>
  );
};

export default SignIn;
