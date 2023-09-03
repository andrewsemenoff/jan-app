import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { BASE_HOST_URL } from "../../assets/hostConfig";

export enum STATUS {
  IDLE = "idle",
  PENDING = "pending",
  FAILED = "failed",
  SUCCEEDED = "succeeded",
}
interface Location {
  country: string;
  city: string;
}
interface InitialUserData {
  username: string;
  email: string;
  educationLevel: string;
  communities: string[];
  location: Location;
  password: string;
}
interface User extends InitialUserData {
  roles: string[];
  avatar: string;
  stats: {
    solvedProblems: number;
    checkedSolutions: number;
    formulatedProblems: number;
    rating: number;
  };
  activities: {};
  wallet: number;
}
interface Profile {
  token: string;
  user: User;
}

const initialState: Profile = {
  token: "",
  user: {
    username: "Firstname Lastname",
    email: "JsOTQMORw7Z4OMO-wofDusOVZcO5w4XDpV7Dt8OOw49_DXIAwqUMw5tNIFLCslIN",
    educationLevel: "OTHER",
    communities: ["Algebra", "Probability", "Calculus"],
    location: {
      country: "Israel",
      city: "Tel-Aviv",
    },
    password: "$2a$10$eo9g73se/QFbO8vzND9.3euPT234NNC0bPxpE6z3S2Cp5l/mjmPMa",
    roles: ["USER"],
    avatar: "",
    stats: {
      solvedProblems: 0,
      checkedSolutions: 0,
      formulatedProblems: 0,
      rating: 0,
    },
    activities: {},
    wallet: 0.0,
  },
};
const BASE_URL = BASE_HOST_URL;
const ACCOUNT_URL = `${BASE_URL}/user`;

export const signUp = createAsyncThunk(
  "account/signUp",
  async (data: InitialUserData) => {
    const response: User = await axios.post(
      `${ACCOUNT_URL}/registration`,
      data,
    );
    return response;
  }
);
export const signIn = createAsyncThunk("account/signIn", async () => {
  const response: User = await axios.post(`${ACCOUNT_URL}/login`);
  return response;
});
export const editUserName = createAsyncThunk(
  "account/editUserName",
  async (newName: string, thunkApi) => {
    const {
      account: {
        user: { email },
      },
    } = thunkApi.getState() as RootState;
    try {
      const response: User = await axios.put(
        `${ACCOUNT_URL}/editname/${email}`,
        {
          username: newName,
        }
      );
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserEducation = createAsyncThunk(
  "account/editEducation",
  async (education: string, thunkApi) => {
    const {
      account: {
        user: { email },
        token,
      },
    } = thunkApi.getState() as RootState;
    try {
      const response: User = await axios.put(
        `${ACCOUNT_URL}/editeducation/${email}/${education}/`
      );
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserCommunities = createAsyncThunk(
  "account/editUserCommunities",
  async (scientificInterests: string[], thunkApi) => {
    const {
      account: { email },
    } = thunkApi.getState() as RootState;
    try {
      const response: User = await axios.put(
        `${ACCOUNT_URL}/editscientificinterests/${email}`,
        {
          scientificInterests: scientificInterests,
        }
      );
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserLocation = createAsyncThunk(
  "account/editUserLocation",
  async ({ country, city }: Location, thunkApi) => {
    const {
      account: { email },
    } = thunkApi.getState() as RootState;
    try {
      const response: User = await axios.put(
        `${ACCOUNT_URL}/editlocation/${email}`,
        {
          country,
          city,
        }
      );
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserAvatar = createAsyncThunk(
  "account/editUserAvatar",
  async (avatar, thunkApi) => {
    const {
      account: { email },
    } = thunkApi.getState() as RootState;
    try {
      const response: User = await axios.put(
        `${ACCOUNT_URL}/editavatar/${email}/${avatar}`
      );
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserPassword = createAsyncThunk(
  "account/editUserPassword",
  async (newPassword: string, thunkApi) => {
    const {
      account: {
        user: { email },
        token,
      },
    } = thunkApi.getState() as RootState;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "X-Password": newPassword,
        "Content-Type": "application/json",
      };
      const response: boolean = await axios.put(
        `${BASE_URL}/user/editpassword/${email}`,
        null,
        { headers }
      );
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state = action.payload ?? state;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state = action.payload ?? state;
      })
      .addCase(editUserName.fulfilled, (state, action) => {
        state = action.payload ?? state;
      })
      .addCase(editUserEducation.fulfilled, (state, action) => {
        state = action.payload ?? state;
      })
      .addCase(editUserCommunities.fulfilled, (state, action) => {
        state = action.payload ?? state;
      })
      .addCase(editUserLocation.fulfilled, (state, action) => {
        state = action.payload ?? state;
      })
      .addCase(editUserAvatar.fulfilled, (state, action) => {
        state = action.payload ?? state;
      });
  },
});

export default accountSlice.reducer;
export const {} = accountSlice.actions;
