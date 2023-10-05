import { Avatar, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  User,
  getOtherUser,
  selectIsSignedIn,
} from "../../features/account/accountSlice";
import AvatarPlaceholder from "../avatar-placeholder/avatar-placeholder.component";
import { useNavigate } from "react-router-dom";
import { ChipWrapper, Label } from "./user-chip.styles";
import { SmallText, Title } from "../../App.style";

interface UserChipProps {
  userId: string;
  userName: string;
}

const UserChip = ({ userName, userId }: UserChipProps) => {
  const navigate = useNavigate();
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    (async () => {
      if (isSignedIn) {
        const user = await dispatch(getOtherUser(userId)).unwrap();
        if (user) {
          setUser(user);
        }
      }
    })();
  }, [isSignedIn]);
  return (
    <>
      {
        // <Chip
        //   avatar={
        //     user ? (
        //       <Avatar alt={userName} src={"/src/assets/images/Pal_Erdos.jpg"} />
        //     ) : (
        //       <AvatarPlaceholder name={userName} />
        //     )
        //   }
        //   style={{ backgroundColor: "#6bbcfa" }}
        //   label={userName}
        //   variant="outlined"
        //   onClick={handleClick}
        // />
      }
      <ChipWrapper onClick={handleClick}>
        <AvatarPlaceholder name={userName} />
        <Label>{userName}</Label>
      </ChipWrapper>
    </>
  );
};

export default UserChip;
