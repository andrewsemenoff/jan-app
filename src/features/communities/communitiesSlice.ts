import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { COMMUNITIES_URL } from "../../assets/hostConfig";
import { RootState } from "../../app/store";
import { User } from "../account/accountSlice";
import { Problem } from "../problems/problemsSlice";

export enum COMMUNITIES_ACTION_TYPE {
  CREATE_NEW_COMMUNITY = `community/addcommunity`,
  EDIT_COMMUNITY_NAME = "community/editname",
  EDIT_COMMUNITY_DESCRIPTION = "community/editdescription",
  EDIT_SUB_COMMUNITIES = "community/addsubcommunities",
  GET_COMMUNITY_BY_NAME = "community/getcommunities",
  GET_COMMUNITIES = "community/getcommunities",
  GET_COMMUNITIES_NAMES = "community/getcommunitiesnames",
  DELETE_COMMUNITY = "community/deletecommunity",
}
interface CommunityPreview {
  id: string;
  name: string;
  parentCommunities: string[];
  description: string;
  userCount: number;
  problemCount: number;
}
interface Community {
  id: string;
  parentCommunities: string[];
  title: string;
  description: string;
  users: User[];
  problems: Problem[];
}
type CommunitiesNames = string[];
interface InitialCommunities {
  communities: CommunityPreview[];
  names: CommunitiesNames;
}
const initialState: InitialCommunities = {
  communities: [],
  names: [],
};

export const getCommunitiesNames = createAsyncThunk(
  COMMUNITIES_ACTION_TYPE.GET_COMMUNITIES_NAMES,
  async () => {
    const { data }: { data: CommunitiesNames } = await axios.get(
      `${COMMUNITIES_URL}/${COMMUNITIES_ACTION_TYPE.GET_COMMUNITIES_NAMES}`
    );
    return data;
  }
);
export const getCommunities = createAsyncThunk(
  COMMUNITIES_ACTION_TYPE.GET_COMMUNITIES,
  async (_, { getState, rejectWithValue }) => {
    const {
      account: {
        user: { email, password },
      },
    } = getState() as RootState;
    const base_64 = `Basic ${btoa(`${email}:${password}`)}`;
    try {
      const { data }: { data: CommunityPreview[] } = await axios.get(
        `${COMMUNITIES_URL}/${COMMUNITIES_ACTION_TYPE.GET_COMMUNITIES}`,
        {
          headers: {
            Authorization: base_64,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data after get communities", data);
      return data;
    } catch (err: any) {
      console.log(err);

      if (err.response) {
        const { data } = err.response;
        const { error, message, status } = data;
        console.log(
          `error in axios response during signIn process: ${message}, status: ${status}, error: ${error}`
        );
        return rejectWithValue({
          message,
          status,
        });
      } else if (err.request) {
        const { message } = err;
        console.log(`error in http request during signIn process: ${message}`);
        return rejectWithValue({ message, status: 0 });
      } else {
        console.log("Unknown Error during signIn process", err.message);
      }
    }
  }
);

const communitiesSlice = createSlice({
  name: "communities",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCommunitiesNames.fulfilled, (state, action) => {
        state.names = action.payload;
      })
      .addCase(getCommunities.fulfilled, (state, action) => {
        state.communities = action.payload ?? state.communities;
      });
  },
});

export default communitiesSlice.reducer;
export const selectCommunitiesNames = (state: RootState) =>
  state.communities.names;
