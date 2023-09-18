import { useState } from "react";
import { CustomAvatar, Oval, SwitcherText } from "./sign-in-switcher.styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsSignedIn, signOut } from "../../features/account/accountSlice";
import { useNavigate } from "react-router-dom";

const SignInSwitcher = () => {
  const navigate = useNavigate();
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const [isSignInMode, setIsSignInMode] = useState(true);
  const dispatch = useAppDispatch();
  const handleSignOutClicked = async () => {
    await dispatch(signOut()).unwrap();
    navigate("/");
  };
  return (
    <Oval>
      <CustomAvatar
        onClick={() => {
          if (!isSignedIn) {
            {
              isSignInMode
                ? navigate("/authentication/sign-in")
                : navigate("/authentication/sign-up");
            }
            setIsSignInMode((prev) => !prev);
          } else handleSignOutClicked();
        }}
        isSignedIn={isSignedIn}
      />
      <SwitcherText isSignedIn={isSignedIn}>
        {isSignedIn ? "sign out" : isSignInMode ? "sign in" : "sign up"}
      </SwitcherText>
    </Oval>
  );
};

export default SignInSwitcher;
