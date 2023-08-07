import { MainText, Subtitle } from "../../App.style";
import { avatarErdos } from "../../utils/mock-data";
import Avatar from "../avatar/avatar.component";
import { FooterBox, Wrapper } from "./footer.styles";

const Footer = () => {
  const { url, alt } = avatarErdos;
  return (
    <FooterBox>
      <MainText>&copy; 2023 JustAnotherNobel.com</MainText>
      <Wrapper>
        <div>
        <MainText>Inspired By</MainText>
        <Subtitle>Paul Erdos</Subtitle>
        </div>

        <Avatar width="5em" url={url} alt={alt} />
      </Wrapper>
    </FooterBox>
  );
};

export default Footer;
