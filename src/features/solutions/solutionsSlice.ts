import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { SOLUTIONS_URL } from "../../assets/hostConfig";

export enum SOLUTIONS_ACTION_TYPE {
  ADD_SOLUTION = "problems/addSolution",
}

interface InitialSolution {
  details: string;
}
export interface Solution {
  id: string;
  author: string;
  authorId: string;
  details: string;
  dateCreated: string;
  reactions: {
    likes: number;
    dislikes: number;
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
    dateCreated: "",
    reactions: {
      likes: 0,
      dislikes: 0,
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
      console.log("response after addSolution:", data);
      return data;
    } catch (err: any) {
      console.log("error after addSolution:", err);
    }
  }
);

const solutionsSlice = createSlice({
  name: "solutions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addSolution.fulfilled, (state, action) => {
      state.currentSolution = action.payload ?? state.currentSolution;
    });
  },
});

export default solutionsSlice.reducer;
