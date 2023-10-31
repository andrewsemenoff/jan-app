import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { SOLUTIONS_URL } from "../../assets/hostConfig";
import { actionAuthorInfo } from "../problems/problemsSlice";

export enum SOLUTIONS_ACTION_TYPE {
  ADD_SOLUTION = "solutions/addSolution",
  GET_SOLUTIONS = "solutions/getSolutions",
  LIKE_SOLUTION = "solutions/likeSolution",
  DISLIKE_SOLUTION = "solutions/dislikeSolution",
  EDIT_SOLUTION = "solutions/editSolution",
}

export interface Solution {
  id: string;
  author: string;
  authorId: string;
  details: string;
  dateCreated: string;
  dateEdited: string;
  problemId: string;
  reactions: {
    totalLikes: number;
    totalDislikes: number;
    likes: actionAuthorInfo[];
    dislikes: actionAuthorInfo[];
  };
  type: string;
}

interface initialSolutions {
  solutions: Solution[];
  currentSolution: Solution;
}

const initialState: initialSolutions = {
  solutions: [],
  currentSolution: {
    id: "",
    author: "",
    authorId: "",
    details: "",
    dateCreated: "0001-01-01T00:00:00",
    dateEdited: "",
    problemId: "",
    reactions: {
      totalLikes: 0,
      totalDislikes: 0,
      likes: [],
      dislikes: [],
    },
    type: "",
  },
};

export const addSolution = createAsyncThunk(
  SOLUTIONS_ACTION_TYPE.ADD_SOLUTION,
  async (
    { details, problemId }: { details: string; problemId: string },
    { getState }
  ) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: Solution } = await axios.post(
        `${SOLUTIONS_URL}/addsolution/${problemId}`,
        { details: details },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      console.log("error after addSolution:", err);
    }
  }
);
export const getSolutions = createAsyncThunk(
  SOLUTIONS_ACTION_TYPE.GET_SOLUTIONS,
  async (problemId: string, { getState }) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: Solution[] } = await axios.get(
        `${SOLUTIONS_URL}/getsolutions/${problemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      console.log("error after getSolutions:", err);
    }
  }
);
export const likeSolution = createAsyncThunk(
  SOLUTIONS_ACTION_TYPE.LIKE_SOLUTION,
  async (
    { problemId, solutionId }: { problemId: string; solutionId: string },
    { getState }
  ) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { status }: { status: number } = await axios.put(
        `${SOLUTIONS_URL}/likesolution/${problemId}/${solutionId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return status;
    } catch (err: any) {
      console.log("error after likeSolution:", err);
    }
  }
);
export const dislikeSolution = createAsyncThunk(
  SOLUTIONS_ACTION_TYPE.DISLIKE_SOLUTION,
  async (
    { problemId, solutionId }: { problemId: string; solutionId: string },
    { getState }
  ) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { status }: { status: number } = await axios.put(
        `${SOLUTIONS_URL}/dislikesolution/${problemId}/${solutionId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return status;
    } catch (err: any) {
      console.log("error after dislikeSolution:", err);
    }
  }
);
export const editSolution = createAsyncThunk(
  SOLUTIONS_ACTION_TYPE.EDIT_SOLUTION,
  async (
    {
      problemId,
      solutionId,
      editedSolution,
    }: { problemId: string; solutionId: string; editedSolution: string },
    { getState }
  ) => {
    const {
      account: { token, userId },
    } = getState() as RootState;
    try {
      const { status }: { status: number } = await axios.put(
        `${SOLUTIONS_URL}/editsolution/${userId}/${problemId}/${solutionId}`,
        {
          title: "",
          details: editedSolution,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return status;
    } catch (err: any) {
      console.log("error after editSolution:", err);
    }
  }
);

const solutionsSlice = createSlice({
  name: "solutions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addSolution.fulfilled, (state, action) => {
        state.currentSolution = action.payload ?? state.currentSolution;
      })
      .addCase(getSolutions.fulfilled, (state, action) => {
        state.solutions = action.payload ?? state.solutions;
      });
  },
});

export default solutionsSlice.reducer;
export const selectSolutions = (state: RootState) => state.solutions.solutions;
