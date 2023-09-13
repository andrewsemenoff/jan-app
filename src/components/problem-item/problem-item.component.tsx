import { formatDistanceToNow, formatISO, fromUnixTime, parseISO } from "date-fns";
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
import { Problem } from "../../features/problems/problemsSlice";
interface ProblemItemProps {
  problem: Problem;
}
const ProblemItem = ({ problem }: ProblemItemProps) => {
  const navigate = useNavigate();
  const {
    id,
    author,
    interactions: { totalLikes },
    title,
    dateCreated,
    currentAward,
    communityNames,
    solutions,
  } = problem;
  
  const creationDate = formatDistanceToNow(parseISO(dateCreated));
  
  return (
    <ItemBox onClick={() => navigate(`/problem/${id}`)}>
      <TitleContainer>{title}</TitleContainer>
      <div>{currentAward}$</div>
      <AuthorAndDateWrapper>
        <SmallText>{`By ${author}`}</SmallText>
        <SmallText>{creationDate}</SmallText>
      </AuthorAndDateWrapper>
      <VotesAndSolutionsLabel>{`${totalLikes} votes, ${solutions.length} solutions`}</VotesAndSolutionsLabel>
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
