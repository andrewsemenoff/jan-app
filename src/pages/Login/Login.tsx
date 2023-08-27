import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { SmallText, Title } from "../../App.style";
import AutocompleteField from "../../components/autocomplete-field/autocomplete-field.component";
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";
import EyeToggler from "../../components/eye-toggler/eye-toggler.component";
import InputField from "../../components/input-field/input-field.component";
import SelectField from "../../components/select-field/select-field.component";
import { FormBox, LoginPageWrapper, StyledLink } from "./Login.styles";

const scientificInterests = [
  "Physics",
  "Chemistry",
  "Biology",
  "Astronomy",
  "Computer Science",
  "Mathematics",
  "Engineering",
  "Environmental Science",
  "Psychology",
  "Medicine",
  "Geology",
  "Social Sciences",
  "Political Science",
  "Economics",
  "Linguistics",
  "Anthropology",
  "History",
  "Artificial Intelligence",
  "Robotics",
  "Neuroscience",
];
const educationLevels = [
  "Primary School",
  "Middle School",
  "High School",
  "Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Other",
];

const Login = () => {
  const [emailForLogIn, setEmailForLogIn] = useState("");
  const [passwordForLogIn, setPasswordForLogIn] = useState("");
  const [isPassForLoginVisible, setIsPassForLoginVisible] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isPassConfirmationVisible, setIsPassConfirmationVisible] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [educationLevel, setEducationLevel] = useState<string[]>([]);

  const handlePasswordForLoginChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordForLogIn(e.target.value);
  const handleEmailForLoginChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmailForLogIn(e.target.value);
  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDisplayName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);
  const handleInterestsChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    setInterests(newValue);
  };
  const handleEducationLevelChange = (
    e: SelectChangeEvent<string[] | string>
  ) => {
    const {
      target: { value },
    } = e;
    setEducationLevel(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <LoginPageWrapper>
      <FormBox>
        <Title style={{ textAlign: "center" }}>Log In</Title>
        <InputField
          fieldName="Email"
          value={emailForLogIn}
          onChange={handleEmailForLoginChange}
          type="email"
        />
        <InputField
          fieldName="Password"
          value={passwordForLogIn}
          onChange={handlePasswordForLoginChange}
          type={isPassForLoginVisible ? "text" : "password"}
          wrapperStyle={{ position: "relative" }}
          >
            <EyeToggler
            handleEyeClick={(state) => {
              setIsPassForLoginVisible(state);
            }}
          />
          </InputField>
        <CustomButton
          buttonType={ButtonType.INVERTED}
          style={{ border: "none" }}
        >
          Log in
        </CustomButton>
        <SmallText>
          Forgot your password?
          <StyledLink to={"/"}>restore password</StyledLink>
        </SmallText>
      </FormBox>
      <FormBox>
        <Title style={{ textAlign: "center" }}>Sign Up</Title>
        <InputField
          fieldName="Display name"
          value={displayName}
          onChange={handleDisplayNameChange}
        />
        <InputField
          fieldName="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <SelectField
          fieldName="Highest education level"
          items={educationLevels}
          selectedItems={educationLevel}
          handleSelectChange={handleEducationLevelChange}
        />
        <AutocompleteField
          selectedItems={interests}
          items={scientificInterests}
          fieldName="Scientific interests"
          handleChange={handleInterestsChange}
        />
        <InputField
          fieldName="Password"
          value={password}
          onChange={handlePasswordChange}
          type={isPassVisible ? "text" : "password"}
          wrapperStyle={{ position: "relative" }}
        >
          <EyeToggler
            handleEyeClick={(state) => {
              setIsPassVisible(state);
            }}
          />
        </InputField>
        <InputField
          value={passwordConfirmation}
          fieldName="Confirm password"
          onChange={handlePasswordConfirmationChange}
          type={isPassConfirmationVisible ? "text" : "password"}
          wrapperStyle={{ position: "relative" }}
        >
          <EyeToggler
            handleEyeClick={(state) => {
              setIsPassConfirmationVisible(state);
            }}
          />
        </InputField>
        <CustomButton
          buttonType={ButtonType.INVERTED}
          style={{ border: "none" }}
        >
          Sign up
        </CustomButton>
      </FormBox>
    </LoginPageWrapper>
  );
};

export default Login;
