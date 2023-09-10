import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { COMMUNITIES_URL } from "../../assets/hostConfig";
import { RootState } from "../../app/store";

interface Community {
  name: string;
  subCommunities: string[];
  description: string;
  problems: string[];
  members: string[];
  totalMembers: number;
  totalProblems: number;
}
type CommunitiesNames = string[];
interface InitialCommunities {
  communities: Community[];
  names: CommunitiesNames;
}
const initialState: InitialCommunities = {
  communities: [],
  names: [],
};

export const getCommunitiesNames = createAsyncThunk(
  "communities/getCommunitiesNames",
  async () => {
    const { data }: { data: CommunitiesNames } = await axios.get(
      `${COMMUNITIES_URL}/getcommunitiesnames`
    );
    return data;
  }
);

const communitiesSlice = createSlice({
  name: "communities",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCommunitiesNames.fulfilled, (state, action) => {
      state.names = action.payload;
    });
  },
});

export default communitiesSlice.reducer;
export const selectCommunitiesNames = (state: RootState) => state.communities.names