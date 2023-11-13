import { User } from "../../features/account/accountSlice";
import { Problem } from "../../features/problems/problemsSlice";
import { CardBox } from "./community-card.styles";

interface Props {
  title: string;
  users: User[];
  problems: Problem[];
}
const CommunityCard = ({ title, users, problems }: Props) => {
  return (
    <CardBox>
      <h2>{title}</h2>
      <h3>{users.length}</h3>
      <h3>
        {problems.length}
        <h3>amount of problems</h3>
      </h3>
    </CardBox>
  );
};

export default CommunityCard;
