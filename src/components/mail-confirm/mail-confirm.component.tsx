import { useAppDispatch } from "../../app/hooks";
import { useState, ChangeEvent } from "react";
import { resetUserPassword } from "../../features/account/accountSlice";
import CustomButton, { ButtonType } from "../button/button.component";
import { CustomInput } from "../custom-input/custom-input.styles";
import Field from "../field/field.component";
import { ConfirmMailBox } from "./mail-confirm.styles";
import useEmailValidation from "../../hooks/useEmailValidation";
import { Tooltip } from "../field/field.style";

const MailConfirmation = () => {
  const { isMailValid, checkIsMailValid } = useEmailValidation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const handleGetEmailClicked = () => dispatch(resetUserPassword(email));
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    checkIsMailValid(e.target.value);
  };
  return (
    <ConfirmMailBox>
      For restoring password enter your email you've used for registration
      <Field fieldName="your Email">
        <CustomInput type="email" value={email} onChange={handleEmailChange} />
        <Tooltip
          $isShown={!isMailValid}
        >{`Please enter a valid email address`}</Tooltip>
      </Field>
      <CustomButton
        disabled={!isMailValid}
        style={{ width: "100%" }}
        onClick={handleGetEmailClicked}
        buttonType={ButtonType.INVERTED}
      >
        get email for restoring password
      </CustomButton>
    </ConfirmMailBox>
  );
};

export default MailConfirmation;
