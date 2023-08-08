import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { ProblemInstance } from "../../assets/mock_data";
import { ItemBox, TitleContainer } from "./problem-item.styles";
import { SmallText } from "../../App.style";
import { useNavigate } from "react-router-dom";
interface ProblemItemProps {
  problem: ProblemInstance;
}
const ProblemItem = ({ problem }: ProblemItemProps) => {
  const navigate = useNavigate();
  const { id, author, rating, title, createdAt, currentAward } = problem;
  const creationDate = formatDistanceToNow(fromUnixTime(createdAt));
  return (
    <ItemBox onClick={()=>navigate(`/problem/${id}`)}>
      <TitleContainer>{title}</TitleContainer>
      <div>{currentAward}$</div>
      <SmallText>{`By ${author}`}</SmallText>
      <SmallText>{creationDate}</SmallText>
      <div>{rating}</div>
    </ItemBox>
  );
};

export default ProblemItem;
