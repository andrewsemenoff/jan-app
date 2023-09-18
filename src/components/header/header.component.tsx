import { Avatar, Chip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsSignedIn, signOut } from "../../features/account/accountSlice";
import SvgLogo from "../../svg-components/svg-logo/svg-logo.component";
import {
  HeaderBox,
  HeaderLink,
  LinksContainer,
  LogoMottoWrapper,
  Motto,
  SwitcherBox,
} from "./header.styles";
import SignInSwitcher from "../sign-in-switcher/sign-in-switcher.component";

const Header = () => {
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const dispatch = useAppDispatch();
  const handleSignOutClicked = () => {
    dispatch(signOut());
  };
  return (
    <HeaderBox>
      <LogoMottoWrapper>
        <SvgLogo size="6em" />
        <Motto>Empowering Curiosity, Inspiring Excellence</Motto>
      </LogoMottoWrapper>
      <LinksContainer>
        <HeaderLink to="about">About</HeaderLink>
        <HeaderLink to="communities">Communities</HeaderLink>
        <SwitcherBox>
          <SignInSwitcher />
          {isSignedIn && <HeaderLink to="profile">Profile</HeaderLink>}
        </SwitcherBox>
      </LinksContainer>
    </HeaderBox>
  );
};

export default Header;
