import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Title } from "../../App.style";
import { useAppDispatch } from "../../app/hooks";
import { User, getOtherUser } from "../../features/account/accountSlice";
interface UserProps {}
const OtherUser = () => {
  const dispatch = useAppDispatch();
  const { user_id } = useParams();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      if (user_id) {
        const user = await dispatch(getOtherUser(user_id)).unwrap();
        if (user) {
          setUser(user);
        }
      }
    })();
  }, [user_id]);
  return (
    <div>
      <Title>{user?.username}</Title>
      <Title>{user?.email}</Title>
      <Title>{user?.location.country}</Title>
      <Title>{user?.location.city}</Title>
      <Title>{user?.educationLevel}</Title>
      <Title>{user?.communities}</Title>
    </div>
  );
};

export default OtherUser;
