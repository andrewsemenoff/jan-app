import SvgLogo from "../../svg-components/svg-logo/svg-logo.component";
import {
  HeaderBox,
  HeaderLink,
  LinksContainer,
  LogoMottoWrapper,
  Motto,
} from "./header.styles";

const Header = () => {
  return (
    <HeaderBox>
      <LogoMottoWrapper>
        <SvgLogo size="6em" />
        <Motto>Empowering Curiosity, Inspiring Excellence</Motto>
      </LogoMottoWrapper>
      <LinksContainer>
        <HeaderLink to="about">About</HeaderLink>
        <HeaderLink to="communities">Communities</HeaderLink>
        <HeaderLink to="login">Log in</HeaderLink>
      </LinksContainer>
    </HeaderBox>
  );
};

export default Header;
