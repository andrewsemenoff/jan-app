import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "swiper/element/bundle";
import { LoaderBackground, MainContentBox } from "./App.style";
import { useAppDispatch } from "./app/hooks";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import { STATUS, getUser, setToken } from "./features/account/accountSlice";

register();
function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState(STATUS.IDLE);
  const isPending = requestStatus === STATUS.PENDING;
  useEffect(() => {
    (async () => {
      setRequestStatus(STATUS.PENDING);
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setToken(token));
        try {
          await dispatch(getUser()).unwrap();
          navigate('problems')
        } catch (err: any) {
          if (err?.status !== 200) {
            navigate("authentication/sign-in");
          }
        } finally {
          setRequestStatus(STATUS.IDLE);
        }
      } else {
        setRequestStatus(STATUS.IDLE);
        navigate("authentication/sign-in");
      }
    })();
  }, []);

  return (
    <>
      {isPending && (
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
      )}
        <Header />
        <MainContentBox>
          <ToastContainer position="bottom-right" />
          <Outlet />
        </MainContentBox>
        <Footer />
    </>
  );
}

export default App;
