import { MainContentBox } from "./App.style";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <MainContentBox>
        <Outlet />
      </MainContentBox>
      <Footer />
    </>
  );
}

export default App;
