import { formatDistanceToNow, fromUnixTime } from "date-fns";
import { ProblemInstance } from "../../assets/mock_data";
import {
  AuthorAndDateWrapper,
  CommunitiesDeck,
  CommunityLabel,
  ItemBox,
  TitleContainer,
  VotesAndSolutionsLabel,
} from "./problem-item.styles";
import { SmallText } from "../../App.style";
import { useNavigate } from "react-router-dom";
interface ProblemItemProps {
  problem: ProblemInstance;
}
const ProblemItem = ({ problem }: ProblemItemProps) => {
  const navigate = useNavigate();
  const {
    id,
    author,
    votes,
    title,
    createdAt,
    currentAward,
    communities,
    solutions,
  } = problem;
  const creationDate = formatDistanceToNow(fromUnixTime(createdAt));
  return (
    <ItemBox onClick={() => navigate(`/problem/${id}`)}>
      <TitleContainer>{title}</TitleContainer>
      <div>{currentAward}$</div>
      <AuthorAndDateWrapper>
        <SmallText>{`By ${author}`}</SmallText>
        <SmallText>{creationDate}</SmallText>
      </AuthorAndDateWrapper>
      <VotesAndSolutionsLabel>{`${votes} votes, ${solutions} solutions`}</VotesAndSolutionsLabel>
      <CommunitiesDeck>
        {communities.map((c, index) => (
          <CommunityLabel $isDynamic $offset={index * 2} $index={index} key={index}>
            {c}
          </CommunityLabel>
        ))}
      </CommunitiesDeck>
    </ItemBox>
  );
};

export default ProblemItem;
