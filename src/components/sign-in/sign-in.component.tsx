import { ChangeEvent, useState } from "react";
import { SmallText, Title } from "../../App.style";
import CustomButton, { ButtonType } from "../button/button.component";
import { CustomInput } from "../custom-input/custom-input.styles";
import EyeToggler from "../eye-toggler/eye-toggler.component";
import Field from "../field/field.component";
import { SignInForm, StyledLink } from "./sign-in.styles";
import { useAppDispatch } from "../../app/hooks";
import { STATUS, getUser, signIn } from "../../features/account/accountSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { fakeFetch } from "../../assets/mock_data";

const SignIn = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState(STATUS.IDLE);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const canSubmit =
    [email, password].every(Boolean) && requestStatus === STATUS.IDLE;

  const onLoginClicked = async () => {
    if (canSubmit) {
      try {
        setRequestStatus(STATUS.PENDING);
        const res = await dispatch(signIn({ email, password })).unwrap();

        await fakeFetch("", 2000); //REFACTOR if there is a method that inform if the new generated token is valid or not for all services 
        dispatch(getUser()).unwrap;
        if (res) {
          localStorage.setItem("token", res);
        }
        setEmail("");
        setPassword("");
        state?.from ? navigate(state.from) : navigate("/profile");
      } catch (error: any) {
        console.log(`failed to sign in. Error: ${error.message} ${error.code}`);
      } finally {
        setRequestStatus(STATUS.IDLE);
      }
    }
  };

  return (
    <SignInForm>
      <Title style={{ textAlign: "center" }}>Sign In</Title>
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
      <CustomButton
        disabled={!canSubmit}
        buttonType={ButtonType.INVERTED}
        style={{ border: "none" }}
        onClick={onLoginClicked}
      >
        Sign in
      </CustomButton>
      <SmallText style={{ textAlign: "center" }}>
        Forgot your password?
        <br />
        <StyledLink to={"/restorepassword"}>restore password</StyledLink>
      </SmallText>
    </SignInForm>
  );
};

export default SignIn;
