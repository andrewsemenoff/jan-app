import { Outlet } from "react-router-dom";
import { MainContentBox } from "./App.style";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from 'swiper/element/bundle';
register();
function App() {
  return (
    <>
      <Header />
      <MainContentBox>
        <ToastContainer position="top-left"/>
          <Outlet />
      </MainContentBox>
      <Footer />
    </>
  );
}

export default App;
