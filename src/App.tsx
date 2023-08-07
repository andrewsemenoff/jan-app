import { Outlet } from "react-router-dom";
import { MainContentBox } from "./App.style";
import Footer from "./components/footer/footer.component";
import Header from "./components/header/header.component";
import SvgIcon, { Fashion, SVG_PATH } from "./svg-components/svg-icon/svg-icon.component";
function App() {
  return (
    <>
      <Header />
      <MainContentBox>
        <SvgIcon svgPath={SVG_PATH.THUMB_UP} fashion={Fashion.ANIMATED} size="3em"/>
        <SvgIcon svgPath={SVG_PATH.THUMB_DOWN} fashion={Fashion.ANIMATED} size="3em"/>
        <SvgIcon svgPath={SVG_PATH.BELL} fashion={Fashion.ANIMATED} size="3em"/>

        <Outlet />
      </MainContentBox>
      <Footer />
    </>
  );
}

export default App;
