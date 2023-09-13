import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { STATUS, editUserPassword } from "../../features/account/accountSlice";
import CustomButton, { ButtonType } from "../button/button.component";
import { CustomInput } from "../custom-input/custom-input.styles";
import EyeToggler from "../eye-toggler/eye-toggler.component";
import Field from "../field/field.component";
import { RestorePasswordBox } from "./restore-password-form.styles";

const RestorePasswordForm = () => {
  const [requestStatus, setRequestStatus] = useState(STATUS.IDLE);
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isPassConfirmationVisible, setIsPassConfirmationVisible] =
    useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const canSubmit = password === passwordConfirmation;

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);
  const handleOkButtonClicked = async () => {
    try {
      await dispatch(
        editUserPassword({
          newPassword: password,
          temporaryToken: token as string,
        })
      ).unwrap();
      setRequestStatus(STATUS.PENDING);
      navigate("/login");
    } catch (error: any) {
    } finally {
      setRequestStatus(STATUS.IDLE);
    }
  };
  return (
    <RestorePasswordBox>
      <Field fieldName="New Password">
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
      <Field fieldName="Confirm Password">
        <CustomInput
          type={isPassConfirmationVisible ? "text" : "password"}
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          $withIcon
        />
        <EyeToggler
          handleEyeClick={(state) => {
            setIsPassConfirmationVisible(state);
          }}
        />
      </Field>
      <CustomButton
        disabled={!canSubmit}
        onClick={handleOkButtonClicked}
        buttonType={ButtonType.INVERTED}
      >
        ok
      </CustomButton>
    </RestorePasswordBox>
  );
};

export default RestorePasswordForm;
