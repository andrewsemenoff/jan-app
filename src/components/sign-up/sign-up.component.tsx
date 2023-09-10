import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  STATUS,
  getEductionLevels,
  selectEductionLevels,
  signUp,
} from "../../features/account/accountSlice";
import {
  getCommunitiesNames,
  selectCommunitiesNames,
} from "../../features/communities/communitiesSlice";
import useEmailValidation from "../../hooks/useEmailValidation";
import usePassValidation from "../../hooks/usePassValidation";
import AutocompleteField from "../autocomplete-field/autocomplete-field.component";
import CustomButton, { ButtonType } from "../button/button.component";
import { CustomInput } from "../custom-input/custom-input.styles";
import EyeToggler from "../eye-toggler/eye-toggler.component";
import Field from "../field/field.component";
import { Tooltip } from "../field/field.style";
import SelectField from "../select-field/select-field.component";
import { DoubleInputWrapper, SignUpForm } from "./sign-up.styles";
import { useNavigate } from "react-router-dom";

const minLengthOfPass = 5;
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const scientificInterests = useAppSelector(selectCommunitiesNames);
  const educationLevels = useAppSelector(selectEductionLevels);
  useEffect(() => {
    dispatch(getEductionLevels());
    dispatch(getCommunitiesNames());
  }, []);

  const { isMailValid, checkIsMailValid } = useEmailValidation();
  const { isPassValid, checkIsPassValid } = usePassValidation(minLengthOfPass);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isPassConfirmationVisible, setIsPassConfirmationVisible] =
    useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [educationLevel, setEducationLevel] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [requestStatus, setRequestStatus] = useState(STATUS.IDLE);
  const isPassConfirmed = password === passwordConfirmation;
  const canSubmit = true;
  // [email, password, passwordConfirmation].every(Boolean) &&
  // isMailValid &&
  // isPassValid &&
  // isPassConfirmed &&
  // STATUS.IDLE === requestStatus;

  const handleCountyChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCountry(e.target.value);
  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCity(e.target.value);
  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDisplayName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    checkIsMailValid(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    checkIsPassValid(e.target.value);
  };
  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);
  const handleInterestsChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    setInterests(newValue);
  };
  const handleEducationLevelChange = (e: SelectChangeEvent<string>) => {
    setEducationLevel(e.target.value);
  };
  const handleSignUpClicked = async () => {
    if (canSubmit) {
      try {
        await dispatch(
          signUp({
            username: displayName,
            email,
            educationLevel,
            communities: interests,
            location: { country, city },
            password,
          })
        ).unwrap();
        setRequestStatus(STATUS.PENDING);
        navigate("/profile");
      } catch (error: any) {
      } finally {
        setRequestStatus(STATUS.IDLE);
      }
    }
  };
  return (
    <SignUpForm>
      <Title style={{ textAlign: "center" }}>Sign Up</Title>
      <Field fieldName="Display name">
        <CustomInput value={displayName} onChange={handleDisplayNameChange} />
      </Field>
      <Field fieldName="Email">
        <CustomInput
          value={email}
          onChange={handleEmailChange}
          style={{
            color: `${isMailValid ? "black" : "red"}`,
            caretColor: "black",
          }}
        />
        <Tooltip
          $isShown={!isMailValid}
        >{`Please enter a valid email address.`}</Tooltip>
      </Field>
      <Field fieldName="Highest education level">
        <SelectField
          items={educationLevels}
          selectedItem={educationLevel}
          handleSelectChange={handleEducationLevelChange}
        />
      </Field>
      <Field fieldName="Scientific interests">
        <AutocompleteField
          selectedItems={interests}
          items={scientificInterests}
          handleChange={handleInterestsChange}
        />
      </Field>
      <Field fieldName="Location">
        <DoubleInputWrapper>
          <CustomInput
            value={country}
            placeholder="country"
            onChange={handleCountyChange}
          />
          <CustomInput
            value={city}
            placeholder="city"
            onChange={handleCityChange}
          />
        </DoubleInputWrapper>
      </Field>
      <Field fieldName="Password">
        <CustomInput
          value={password}
          onChange={handlePasswordChange}
          type={isPassVisible ? "text" : "password"}
          $withIcon
          style={{
            color: `${isPassValid ? "black" : "red"}`,
            caretColor: "black",
          }}
        />
        <EyeToggler
          handleEyeClick={(state) => {
            setIsPassVisible(state);
          }}
        />
        <Tooltip $isShown={!isPassValid}>
          {`Password must contain at least ${minLengthOfPass} characters, including 1 lowercase
          letter, 1 uppercase letter, 1 digit, and 1 special character
          (!@#$%^&*)`}
        </Tooltip>
      </Field>
      <Field fieldName="Confirm password">
        <CustomInput
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          type={isPassConfirmationVisible ? "text" : "password"}
          $withIcon
          style={{
            color: `${isPassConfirmed ? "black" : "red"}`,
            caretColor: "black",
          }}
        />
        <EyeToggler
          handleEyeClick={(state) => {
            setIsPassConfirmationVisible(state);
          }}
        />
        <Tooltip
          $isShown={!isPassConfirmed}
        >{`Please confirm your password. It should match the password you entered above.`}</Tooltip>
      </Field>
      <CustomButton
        onClick={handleSignUpClicked}
        disabled={!canSubmit}
        buttonType={ButtonType.INVERTED}
        style={{ border: "none" }}
      >
        Sign up
      </CustomButton>
    </SignUpForm>
  );
};

export default SignUp;
