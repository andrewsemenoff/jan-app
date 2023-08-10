
import { avatarErdos } from "../../assets/mock_data";
import Avatar from "../avatar/avatar.component";
import { FooterBox, WhiteText, WhiteTitle, Wrapper } from "./footer.styles";

const Footer = () => {
  const { url, alt } = avatarErdos;
  return (
    <FooterBox>
      <WhiteText>&copy; 2023 JustAnotherNobel.com</WhiteText>
      <Wrapper>
        <div>
          <WhiteText>Inspired By</WhiteText>
          <WhiteTitle>Paul Erdos</WhiteTitle>
        </div>
        <Avatar width="5em" url={url} alt={alt} />
      </Wrapper>
    </FooterBox>
  );
};

export default Footer;
