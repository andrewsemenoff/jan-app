import { ChangeEvent, useState } from "react";
import { SmallText, Title } from "../../App.style";
import CustomButton, { ButtonType } from "../button/button.component";
import { CustomInput } from "../custom-input/custom-input.styles";
import EyeToggler from "../eye-toggler/eye-toggler.component";
import Field from "../field/field.component";
import { SignInForm, StyledLink } from "./sign-in.styles";
import { useAppDispatch } from "../../app/hooks";
import { STATUS, signIn } from "../../features/account/accountSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
        let timeout: any;
        const myPromise = new Promise((resolve) => {
          timeout = setTimeout(() => {
            console.log("interval");
            resolve(timeout);
          }, 1000);
        });
        await myPromise.then((timeout: any) => clearTimeout(timeout));
        console.log("kuku");

        await dispatch(signIn()).unwrap();
        setEmail("");
        setPassword("");
        navigate("/profile");
      } catch (e: any) {
        alert(`you failed to login, try again. Error: ${e.message} ${e.code}`);
      } finally {
        setRequestStatus(STATUS.IDLE);
      }
    }
  };

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
      <CustomButton
        disabled={!canSubmit}
        buttonType={ButtonType.INVERTED}
        style={{ border: "none" }}
        onClick={onLoginClicked}
      >
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
