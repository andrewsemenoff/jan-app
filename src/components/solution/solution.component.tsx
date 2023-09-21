import { SmallText, Title } from "../../App.style";
import { useAppSelector } from "../../app/hooks";
import { selectUserId } from "../../features/account/accountSlice";
import { Solution } from "../../features/solutions/solutionsSlice";
import { SolutionBox } from "./solution.styles";

interface SolutionProps {
  solution: Solution;
}
const SingleSolution = ({ solution }: SolutionProps) => {
  const userId = useAppSelector(selectUserId);
  const { author, dateCreated, details, reactions, authorId } = solution;
  const isYourSolution = userId === authorId;
  return (
    <SolutionBox $isYourSolution = {isYourSolution}>
      <Title>{details}</Title>
      <h3>created at {dateCreated}</h3>
      <h3>by {author}</h3>
      <h4>
        likes:{reactions.likes}; dislikes: {reactions.dislikes}
      </h4>
    </SolutionBox>
  );
};

export default SingleSolution;
