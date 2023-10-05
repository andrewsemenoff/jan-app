import { useNavigate } from "react-router-dom";
import { SmallText } from "../../App.style";
import { Problem } from "../../features/problems/problemsSlice";
import { getStandardLocalDate } from "../../utils/timeHandling";
import {
  AuthorAndDateWrapper,
  CommunitiesListBox,
  ItemBox,
  Spot,
  TimeWrapper,
  TitleContainer,
  VotesAndSolutionsLabel,
} from "./problem-item.styles";
import UserChip from "../user-chip/user-chip.component";
import CommunityChip from "../community-chip/community-chip.component";
interface ProblemItemProps {
  problem: Problem;
}
const ProblemItem = ({ problem }: ProblemItemProps) => {
  const navigate = useNavigate();
  const {
    id,
    author,
    authorId,
    interactions: { totalLikes, totalDislikes },
    title,
    dateCreated,
    currentAward,
    communityNames,
    solutions,
    rating,
  } = problem;

  const votes = totalLikes - totalDislikes;
  const createdTimeAgo = getStandardLocalDate(dateCreated);

  return (
    <ItemBox onClick={() => navigate(`/problem/${id}`)}>
      <TitleContainer>{title}</TitleContainer>
      <div>{currentAward}$</div>
      <AuthorAndDateWrapper>
        <UserChip userName={author} userId={authorId} />
        <TimeWrapper>{createdTimeAgo}</TimeWrapper>
      </AuthorAndDateWrapper>
      <VotesAndSolutionsLabel>
        <Spot>{`${rating} `}</Spot>
        <div>
          <SmallText>{`${votes} votes`}</SmallText>
          <SmallText>{`${solutions.length} solutions`}</SmallText>
        </div>
      </VotesAndSolutionsLabel>
      <div  style={{overflow: 'auto', height: '100%'}}>
        <CommunitiesListBox>
          {communityNames.map((c, index) => (
            <CommunityChip key={index} communityName={c}/>
          ))}
        </CommunitiesListBox>
      </div>
    </ItemBox>
  );
};

export default ProblemItem;
