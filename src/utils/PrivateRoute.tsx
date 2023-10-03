import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  STATUS,
  getUser,
  selectAuthStatus,
  selectIsSignedIn,
  setToken,
} from "../features/account/accountSlice";
import { fakeFetch } from "../assets/mock_data";
import { useEffect, useState } from "react";
import { LoaderBackground } from "../App.style";
import { Oval } from "react-loader-spinner";

interface PrivateRouteProps {
  redirectPath?: string;
  children: JSX.Element;
}

const PrivateRoute = ({
  redirectPath = "/authentication/sign-in",
  children,
}: PrivateRouteProps) => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSignedIn = useAppSelector(selectIsSignedIn);

  const [requestStatus, setRequestStatus] = useState(STATUS.IDLE);
  const isPending = requestStatus === STATUS.PENDING;

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setRequestStatus(STATUS.PENDING);
        dispatch(setToken(token));
        try {
          await dispatch(getUser()).unwrap();
        } catch (err: any) {
          if (err?.status !== 200) {
            navigate(redirectPath, { state: { from: location } });
          }
        } finally {
          setRequestStatus(STATUS.IDLE);
        }
      } else {
        navigate(redirectPath, { state: { from: location } });
      }
    })();
  }, []);

  if (isSignedIn) {
    return children;
  } else if (isPending) {
    return (
      <LoaderBackground>
        <Oval
          height={80}
          width={80}
          color="#0984e3"
          visible={isPending}
          ariaLabel="oval-loading"
          secondaryColor="#aad2f0"
          strokeWidth={7}
          strokeWidthSecondary={5}
        />
      </LoaderBackground>
    );
  }
};

export default PrivateRoute;
