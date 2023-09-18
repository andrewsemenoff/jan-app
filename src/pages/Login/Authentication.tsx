import { Outlet } from "react-router-dom";
import { AuthenticationPageWrapper } from "./Authentication.styles";

const Authentication = () => {
  return (
    <AuthenticationPageWrapper>
      <Outlet />
    </AuthenticationPageWrapper>
  );
};

export default Authentication;
