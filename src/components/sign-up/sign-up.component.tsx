import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { DoubleInputWrapper, SignUpForm } from "./sign-up.styles";
import { Title } from "../../App.style";
import Field from "../field/field.component";
import { CustomInput } from "../custom-input/custom-input.styles";
import SelectField from "../select-field/select-field.component";
import AutocompleteField from "../autocomplete-field/autocomplete-field.component";
import EyeToggler from "../eye-toggler/eye-toggler.component";
import CustomButton, { ButtonType } from "../button/button.component";

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

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isPassConfirmationVisible, setIsPassConfirmationVisible] =
    useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [educationLevel, setEducationLevel] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const handleCountyChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCountry(e.target.value);
  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCity(e.target.value);
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
    <SignUpForm>
      <Title style={{ textAlign: "center" }}>Sign Up</Title>
      <Field fieldName="Display name">
        <CustomInput value={displayName} onChange={handleDisplayNameChange} />
      </Field>
      <Field fieldName="Email">
        <CustomInput value={email} onChange={handleEmailChange} />
      </Field>
      <Field fieldName="Highest education level">
        <SelectField
          items={educationLevels}
          selectedItems={educationLevel}
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
        />
        <EyeToggler
          handleEyeClick={(state) => {
            setIsPassVisible(state);
          }}
        />
      </Field>
      <Field fieldName="Confirm password">
        <CustomInput
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          type={isPassConfirmationVisible ? "text" : "password"}
          $withIcon
        />
        <EyeToggler
          handleEyeClick={(state) => {
            setIsPassConfirmationVisible(state);
          }}
        />
      </Field>
      <CustomButton buttonType={ButtonType.INVERTED} style={{ border: "none" }}>
        Sign up
      </CustomButton>
    </SignUpForm>
  );
};

export default SignUp;
