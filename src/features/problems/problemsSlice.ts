import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { PROBLEMS_URL } from "../../assets/hostConfig";

export enum PROBLEMS_ACTION_TYPE {
  ADD_PROBLEM = "problem/addProblem",
  EDIT_PROBLEM = "problem/editProblem",
  LIKE_PROBLEM = "problem/likeproblem",
  DISLIKE_PROBLEM = "problem/dislikeProblem",
  UN_SUBSCRIBE_PROBLEM = "problem/subscribeonproblem",
  DONATE = "problem/donate",
  DELETE_PROBLEM = "problem/deleteProblem",
  GET_ONE_PROBLEM = "problem/getproblem",
  GET_PROBLEMS = "problem/getproblems",
  GET_PROBLEMS_BY_AUTHOR = "problem/getProblemsByAuthor",
  GET_PROBLEMS_BY_COMMUNITIES = "problem/getcomunityproblems",
  GET_CURRENT_AWARD = "problem/getCurrentAward",
}
export interface Donation {
  profileId: string;
  profileName: string;
  amount: number;
  date: string;
}

export interface actionAuthorInfo {
  profileId: string;
  profileRating: number;
  dateCreated: number;
}

interface InitialProblem {
  title: string;
  details: string;
  communityNames: string[];
}

export interface Problem {
  id: string;
  author: string;
  authorId: string;
  title: string;
  details: string;
  dateCreated: string;
  dateEdited: string;
  status: string;
  currentAward: number;
  rating: number;
  communityNames: string[];
  interactions: {
    totalLikes: number;
    totalDislikes: number;
    likeWeight: number;
    dislikeWeight: number;
    totalDonations: number;
    totalSubscribers: number;
    donations: Donation[];
    likes: actionAuthorInfo[];
    dislikes: actionAuthorInfo[];
    subscriptions: actionAuthorInfo[];
  };
  comments: string[];
  solutions: string[];
  type: string;
}

interface InitialProblems {
  problems: Problem[];
  currentProblem: Problem;
}

const initialState: InitialProblems = {
  problems: [],
  currentProblem: {
    id: "",
    author: "",
    authorId: "",
    title: "",
    details: "",
    dateCreated: "0001-01-01T00:00:00",
    dateEdited: "",
    status: "",
    currentAward: 0,
    rating: 0,
    communityNames: [],
    interactions: {
      totalLikes: 0,
      totalDislikes: 0,
      likeWeight: 0,
      dislikeWeight: 0,
      totalDonations: 0,
      totalSubscribers: 0,
      donations: [],
      likes: [],
      dislikes: [],
      subscriptions: [],
    },
    comments: [],
    solutions: [],
    type: "",
  },
};

export const addProblem = createAsyncThunk(
  PROBLEMS_ACTION_TYPE.ADD_PROBLEM,
  async (newProblem: InitialProblem, { getState }) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: Problem } = await axios.post(
        `${PROBLEMS_URL}/createproblem`,
        newProblem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      console.log("error after addProblem:", err);
    }
  }
);
export const editProblem = createAsyncThunk(
  PROBLEMS_ACTION_TYPE.EDIT_PROBLEM,
  async (
    {
      updatedProblem,
      problem_id,
    }: { updatedProblem: InitialProblem; problem_id: string },
    { getState }
  ) => {
    const {
      account: { token, userId },
    } = getState() as RootState;
    try {
      await axios.put(
        `${PROBLEMS_URL}/editproblem/${userId}/${problem_id}`,
        updatedProblem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err: any) {}
  }
);
export const getOneProblem = createAsyncThunk(
  PROBLEMS_ACTION_TYPE.GET_ONE_PROBLEM,
  async (problem_id: string, { getState }) => {
    const {
      account: { token },
    } = getState() as RootState;
    console.log("token in getOneProblem", token);

    try {
      const { data }: { data: Problem } = await axios.get(
        `${PROBLEMS_URL}/${PROBLEMS_ACTION_TYPE.GET_ONE_PROBLEM}/${problem_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      console.log("error after getOneProblem:", err);
    }
  }
);
export const getProblems = createAsyncThunk(
  PROBLEMS_ACTION_TYPE.GET_PROBLEMS,
  async (_, { getState }) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: Problem[] } = await axios.get(
        `${PROBLEMS_URL}/${PROBLEMS_ACTION_TYPE.GET_PROBLEMS}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      console.log("error after getProblems:", err);
    }
  }
);
export const getProblemsByCommunities = createAsyncThunk(
  PROBLEMS_ACTION_TYPE.GET_PROBLEMS_BY_COMMUNITIES,
  async (communitiesNames: string[], { getState }) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: Problem[] } = await axios.get(
        `${PROBLEMS_URL}/${PROBLEMS_ACTION_TYPE.GET_PROBLEMS_BY_COMMUNITIES}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: communitiesNames
        }
      );
      return data;
    } catch (err: any) {
      console.log("error after getProblems:", err);
    }
  }
);
export const subscribeOnProblem = createAsyncThunk(
  PROBLEMS_ACTION_TYPE.UN_SUBSCRIBE_PROBLEM,
  async (problemId: string, { getState }) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: boolean } = await axios.put(
        `${PROBLEMS_URL}/${PROBLEMS_ACTION_TYPE.UN_SUBSCRIBE_PROBLEM}/${problemId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      console.log("error after subscribeOnProblem:", err);
    }
  }
);
export const likeProblem = createAsyncThunk(
  PROBLEMS_ACTION_TYPE.LIKE_PROBLEM,
  async (problemId: string, { getState }) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: Problem } = await axios.put(
        `${PROBLEMS_URL}/${PROBLEMS_ACTION_TYPE.LIKE_PROBLEM}/${problemId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response after likeProblem:", data);
      return data;
    } catch (err: any) {
      console.log("error after likeProblem:", err);
    }
  }
);
export const dislikeProblem = createAsyncThunk(
  PROBLEMS_ACTION_TYPE.DISLIKE_PROBLEM,
  async (problemId: string, { getState }) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: Problem } = await axios.put(
        `${PROBLEMS_URL}/dislikeproblem/${problemId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      console.log("error after disLikeProblem:", err);
    }
  }
);
export const deleteProblem = createAsyncThunk(
  PROBLEMS_ACTION_TYPE.DELETE_PROBLEM,
  async (problemId: string, { getState }) => {
    const {
      account: { token, userId },
    } = getState() as RootState;
    try {
      const { data }: { data: Problem } = await axios.delete(
        `${PROBLEMS_URL}/deleteproblem/${userId}/${problemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response after deleteProblem:", data);
      // return data;
    } catch (err: any) {
      console.log("error after deleteProblem:", err);
    }
  }
);

const problemsSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addProblem.fulfilled, (state, action) => {
        state.currentProblem = action.payload ?? state.currentProblem;
      })
      .addCase(getOneProblem.fulfilled, (state, action) => {
        state.currentProblem = action.payload ?? state.currentProblem;
      })
      .addCase(getProblems.fulfilled, (state, action) => {
        state.problems = action.payload ?? state.problems;
      })
      .addCase(likeProblem.fulfilled, (state, action) => {
        state.currentProblem = action.payload ?? state.currentProblem;
      })
      .addCase(dislikeProblem.fulfilled, (state, action) => {
        state.currentProblem = action.payload ?? state.currentProblem;
      });
  },
});

export default problemsSlice.reducer;
export const selectCurrentProblem = (state: RootState) =>
  state.problems.currentProblem;
export const selectAllProblems = (state: RootState) => state.problems.problems;
