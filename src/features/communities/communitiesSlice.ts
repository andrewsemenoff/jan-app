import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { COMMUNITIES_URL } from "../../assets/hostConfig";

export enum SORT {
  ALPHA_ASC = "alphAsc",
  AlPHA_DESC = "alphDesc",
  PR_AMOUNT_ASC = "problemsAmountAsc",
  PR_AMOUNT_DESC = "problemsAmountDesc",
  MEMBER_AMOUNT_ASC = "membersAmountAsc",
  MEMBER_AMOUNT_DESC = "membersAmountDesc",
}
export enum COMMUNITIES_ACTION_TYPE {
  CREATE_NEW_COMMUNITY = `community/addcommunity`,
  EDIT_COMMUNITY_NAME = "community/editname",
  EDIT_COMMUNITY_DESCRIPTION = "community/editdescription",
  EDIT_SUB_COMMUNITIES = "community/addsubcommunities",
  GET_COMMUNITY_BY_NAME = "community/getcommunity_by_name",
  GET_COMMUNITIES = "community/getcommunities",
  GET_COMMUNITIES_NAMES = "community/getcommunitiesnames",
  DELETE_COMMUNITY = "community/deletecommunity",
}

export interface Community {
  name: string;
  subCommunities: string[];
  description: string;
  problems: string[]; // Assuming problems are identified by some unique identifiers
  members: string[];
  totalMembers: number;
  totalProblems: number;
}
type CommunitiesNames = string[];
interface InitialCommunities {
  communities: Community[];
  names: CommunitiesNames;
  currentCommunity: Community | null;
  sortType: SORT;
}
const initialState: InitialCommunities = {
  communities: [],
  names: [],
  currentCommunity: null,
  sortType: SORT.ALPHA_ASC,
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
      account: { token },
    } = getState() as RootState;

    try {
      const { data }: { data: Community[] } = await axios.get(
        `${COMMUNITIES_URL}/${COMMUNITIES_ACTION_TYPE.GET_COMMUNITIES}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      console.log(err);

      if (err.response) {
        const { data } = err.response;
        const { error, message, status } = data;
        console.log(
          `error in axios response during ${COMMUNITIES_ACTION_TYPE.GET_COMMUNITIES} process: ${message}, status: ${status}, error: ${error}`
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
export const getCommunityByName = createAsyncThunk(
  COMMUNITIES_ACTION_TYPE.GET_COMMUNITY_BY_NAME,
  async (communityId: string, { getState, rejectWithValue }) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: Community } = await axios.get(
        `${COMMUNITIES_URL}/${COMMUNITIES_ACTION_TYPE.GET_COMMUNITIES}/${communityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data after get community by name", data);
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
  reducers: {
    changeSortCommunitiesType(state, {payload}: {payload: SORT}){
      state.sortType = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getCommunitiesNames.fulfilled, (state, action) => {
        state.names = action.payload;
      })
      .addCase(getCommunities.fulfilled, (state, action) => {
        state.communities = action.payload ?? state.communities;
      })
      .addCase(getCommunityByName.fulfilled, (state, action) => {
        state.currentCommunity = action.payload ?? state.currentCommunity;
      });
  },
});

export default communitiesSlice.reducer;
export const {changeSortCommunitiesType} = communitiesSlice.actions;
export const selectCommunitiesNames = (state: RootState) =>
  state.communities.names;
export const selectCurrentCommunity = (state: RootState) =>
  state.communities.currentCommunity;
export const selectSortType = (state: RootState) =>
  state.communities.sortType;
export const selectSortedCommunities =
  (sortType: SORT) => (state: RootState) => {
    const communities = state.communities.communities;
    switch (sortType) {
      case SORT.ALPHA_ASC:
        return [...communities].sort((a,b)=> a.name.localeCompare(b.name))
      case SORT.AlPHA_DESC:
        return [...communities].sort((a,b)=> b.name.localeCompare(a.name))
      case SORT.MEMBER_AMOUNT_ASC:
        return [...communities].sort((a,b)=> a.totalMembers - b.totalMembers)
      case SORT.MEMBER_AMOUNT_DESC:
        return [...communities].sort((a,b)=> b.totalMembers - a.totalMembers)
      case SORT.PR_AMOUNT_ASC:
        return [...communities].sort((a,b)=> a.totalProblems - b.totalProblems) 
      case SORT.PR_AMOUNT_DESC:
        return [...communities].sort((a,b)=> b.totalProblems - a.totalProblems)
      default:
        return communities;
    }
  };