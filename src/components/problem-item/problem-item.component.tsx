import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { Subtitle } from "../../App.style";
import { ItemBox } from "./problem-item.styles";
import { ProblemInstance } from "../../assets/mock_data";
interface ProblemItemProps {
  problem: ProblemInstance;
}
const ProblemItem = ({ problem }: ProblemItemProps) => {
  const { author, rating, title, createdAt, currentAward } = problem;
  const creationDate = formatDistanceToNow(fromUnixTime(createdAt));
  return (
    <ItemBox>
      <Subtitle>{title}</Subtitle>
      <div>{`by ${author}`}</div>
      <div>rating: {rating}</div>
      <div>created at: {creationDate}</div>
      <div>award amount: {currentAward}</div>
    </ItemBox>
  );
};

export default ProblemItem;
