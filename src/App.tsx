import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "swiper/element/bundle";
import { MainContentBox } from "./App.style";
import { useAppDispatch } from "./app/hooks";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import { STATUS, getUser, setToken } from "./features/account/accountSlice";

register();
function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [requestStatus, setRequestStatus] = useState(STATUS.IDLE);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setToken(token));
        try {
          // setRequestStatus(STATUS.PENDING);
          await dispatch(getUser()).unwrap();
        } finally {
          // setRequestStatus(STATUS.IDLE);
        }
      } else {
        navigate("authentication/sign-in");
      }
    })();
  }, []);

  return (
    <>
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
