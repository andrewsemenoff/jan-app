import { Outlet } from "react-router-dom";
import { MainContentBox } from "./App.style";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "./svg-components/svg-icon/svg-icon.component";
import ProblemItem from "./components/problem-item/problem-item.component";
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
