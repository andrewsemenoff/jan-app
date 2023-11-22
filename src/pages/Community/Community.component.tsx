import { useParams } from "react-router-dom";
import ProblemsList from "../Problems/ProblemsList";
import { useEffect, useState } from "react";
import { STATUS } from "../../features/account/accountSlice";
import { useAppDispatch } from "../../app/hooks";
import {
  Problem,
  getProblemsByCommunities,
} from "../../features/problems/problemsSlice";

const Community = () => {
  const dispatch = useAppDispatch();
  const { community_name } = useParams();
  const [requestStatus, setRequestStatus] = useState<STATUS>(STATUS.IDLE);
  const [problems, setProblems] = useState<Problem[] | undefined>([]);
  useEffect(() => {
    setRequestStatus(STATUS.PENDING);
    (async () => {
      if (community_name) {
        const res = await dispatch(
          getProblemsByCommunities([community_name])
        ).unwrap();
        setProblems(res);
      }
    })();
  }, [community_name]);

  return (
    <>
      <h1 style={{ color: "red" }}>{community_name}</h1>
      <ProblemsList problems={problems??[]} />
    </>
  );
};

export default Community;
