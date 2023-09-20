import { SmallText } from '../../App.style';
import { Solution } from '../../features/solutions/solutionsSlice';

interface SolutionProps{
    solution: Solution
}
const SingleSolution = ({solution}: SolutionProps) => {
    const {author, dateCreated, details, reactions} = solution;
  return (
    <div>
        <SmallText>{details}</SmallText>
        <h3>created at {dateCreated}</h3>
        <h3>by {author}</h3>
        <h4>likes:{reactions.likes}; dislikes: {reactions.dislikes}</h4>
    </div>
  )
}

export default SingleSolution;