import { useParams } from "react-router-dom";
import ProblemCreation, {
  CREATION_TYPE,
} from "../../components/problem-creation/problem-creation.component";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Problem, getOneProblem, selectCurrentProblem } from "../../features/problems/problemsSlice";

const CreateOrEditProblem = () => {
  const { problem_id } = useParams();
  const dispatch = useAppDispatch();
  const problem: Problem = useAppSelector(selectCurrentProblem);
  if(problem_id){
    dispatch(getOneProblem(problem_id))
  }
  return problem_id ? (
    <ProblemCreation creationType={CREATION_TYPE.EDIT_PROBLEM} problem={{title: problem?.title, description: problem?.details, communities: problem?.communityNames} } />
  ) : (
    <ProblemCreation creationType={CREATION_TYPE.ADD_PROBLEM} />
  );
};

export default CreateOrEditProblem;