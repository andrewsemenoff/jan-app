import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import {
  LoginPageWrapper
} from "./Login.styles";

const Login = () => {
  return (
    <LoginPageWrapper>
      <SignIn/> 
      <SignUp/>  
    </LoginPageWrapper>
  );
};

export default Login;
