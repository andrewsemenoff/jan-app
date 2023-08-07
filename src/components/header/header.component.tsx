import { HeaderBox, HeaderLink, LinksContainer, Motto } from "./header.styles";

const Header = () => {
  return (
    <HeaderBox>
      <Motto>Empowering Curiosity, Inspiring Excellence</Motto>
      <LinksContainer>
        <HeaderLink to='about'>About</HeaderLink>
        <HeaderLink to='communities'>Communities</HeaderLink>
        <HeaderLink to='login'>Log in</HeaderLink>
      </LinksContainer>
    </HeaderBox>
  );
};

export default Header;
