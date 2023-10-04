import {
  formatDistanceToNow
} from "date-fns";
import { useNavigate } from "react-router-dom";
import { SmallText } from "../../App.style";
import { Problem } from "../../features/problems/problemsSlice";
import { toLocalTime } from "../../utils/timeHandling";
import {
  AuthorAndDateWrapper,
  CommunitiesDeck,
  CommunityLabel,
  ItemBox,
  TitleContainer,
  VotesAndSolutionsLabel,
} from "./problem-item.styles";
interface ProblemItemProps {
  problem: Problem;
}
const ProblemItem = ({ problem }: ProblemItemProps) => {
  const navigate = useNavigate();
  const {
    id,
    author,
    interactions: { totalLikes, totalDislikes },
    title,
    dateCreated,
    currentAward,
    communityNames,
    solutions,
  } = problem;

  const votes = totalLikes - totalDislikes;

  const localDate = toLocalTime(dateCreated);
  const createdTimeAgo = `${formatDistanceToNow(localDate)} ago`;

  return (
    <ItemBox onClick={() => navigate(`/problem/${id}`)}>
      <TitleContainer>{title}</TitleContainer>
      <div>{currentAward}$</div>
      <AuthorAndDateWrapper>
        <SmallText>{`By ${author}`}</SmallText>
        <SmallText>{createdTimeAgo}</SmallText>
      </AuthorAndDateWrapper>
      <VotesAndSolutionsLabel>{`${votes} votes, ${solutions.length} solutions`}</VotesAndSolutionsLabel>
      <CommunitiesDeck>
        {communityNames.map((c, index) => (
          <CommunityLabel
            $isDynamic
            $offset={index * 2}
            $index={index}
            key={index}
          >
            {c}
          </CommunityLabel>
        ))}
      </CommunitiesDeck>
    </ItemBox>
  );
};

export default ProblemItem;
