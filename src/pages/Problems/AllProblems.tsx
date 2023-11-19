import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProblems,
  selectAllProblems,
} from "../../features/problems/problemsSlice";
import ProblemsList from "./ProblemsList";

const AllProblems = () => {
  const allProblems = useAppSelector(selectAllProblems);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProblems());
  }, []);

  return <ProblemsList problems={allProblems} />;
};

export default AllProblems;
