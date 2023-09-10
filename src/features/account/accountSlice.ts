import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { ACCOUNTING_URL } from "../../assets/hostConfig";

export enum STATUS {
  IDLE = "idle",
  PENDING = "pending",
  FAILED = "failed",
  SUCCEEDED = "succeeded",
}
export enum ACCOUNT_ACTION_TYPE {
  SIGN_UP = "account/signUp",
  SIGN_IN = "account/signIn",
  EDIT_USER_NAME = "account/editUserName",
  EDIT_EDUCATION = "account/editEducation",
  EDIT_USER_COMMUNITIES = "account/editUserCommunities",
  EDIT_USER_COUNTRY = "account/editUserCountry",
  EDIT_USER_CITY = "account/editUserCity",
  EDIT_USER_AVATAR = "account/editUserAvatar",
  EDIT_USER_PASSWORD = "account/editUserPassword",
  DELETE_USER = "account/deleteUser",
  GET_EDUCATION_LEVELS = "account/getEducationLevels",
  GET_USER = "account/getUser",
}
interface SignInRequestData {
  email: string;
  password: string;
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
  userId: string;
  user: User;
  token: string;
  educationLevels: string[];
}

const helperGetUserIdFromToken = (token: string): string => {
  const decodedToken = atob(token.split(".")[1]);
  const tokenObj = JSON.parse(decodedToken);
  return tokenObj.sub;
};
const helperEnumToStringAppearance = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase().replace(/_/g, " ");

const initialState: Profile = {
  user: {
    username: "",
    email: "",
    educationLevel: "",
    communities: [""],
    location: {
      country: "",
      city: "",
    },
    password: "",
    roles: [""],
    avatar: "",
    stats: {
      solvedProblems: 0,
      checkedSolutions: 0,
      formulatedProblems: 0,
      rating: 0,
    },
    activities: {},
    wallet: 0,
  },
  token: "",
  educationLevels: [],
  userId: "",
};

export const signUp = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.SIGN_UP,
  async (registrationData: InitialUserData, { rejectWithValue }) => {
    try {
      const {
        data: { token },
      }: { data: { token: string } } = await axios.post(
        `${ACCOUNTING_URL}/registration`,
        registrationData
      );
      console.log("successful; token:", token);
      return token;
    } catch (err: any) {
      if (err.response) {
        const { data } = err.response;
        const { error, message, status } = data;
        console.log(
          `error in axios response during signUp process: ${message}, status: ${status}, error: ${error}`
        );
        return rejectWithValue({
          message,
          status,
        });
      } else if (err.request) {
        const { message } = err;
        console.log(`error in http request during signUp process: ${message}`);
        return rejectWithValue({ message, status: 0 });
      } else {
        console.log("Unknown Error during signUp process", err.message);
      }
    }
  }
);
export const signIn = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.SIGN_IN,
  async ({ email, password }: SignInRequestData, { rejectWithValue }) => {
    const base_64 = `Basic ${btoa(`${email}:${password}`)}`;
    try {
      const {
        data: { token },
      }: { data: { token: string } } = await axios.post(
        `${ACCOUNTING_URL}/login`,
        null,
        {
          headers: {
            Authorization: base_64,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("successful; token:", token);
      return token;
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
export const getUser = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.GET_USER,
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        account: { token, userId },
      } = getState() as RootState;
      const wholeToken = `Bearer ${token}`;
      const { data }: { data: User } = await axios.get(
        `${ACCOUNTING_URL}/getuser/${userId}`,
        {
          headers: {
            Authorization: wholeToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data", data);

      data.educationLevel = helperEnumToStringAppearance(data.educationLevel);
      return data;
    } catch (err: any) {
      console.log(err);
      if (err.response) {
        const { data } = err.response;
        const { error, message, status } = data;
        console.log(
          `error in axios response during getUser process: ${message}, status: ${status}, error: ${error}`
        );
        return rejectWithValue({
          message,
          status,
        });
      } else if (err.request) {
        const { message } = err;
        console.log(`error in http request during getUser process: ${message}`);
        return rejectWithValue({ message, status: 0 });
      } else {
        console.log("Unknown Error during getUser process", err.message);
      }
    }
  }
);
export const editUserName = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.EDIT_USER_NAME,
  async (newName: string, thunkApi) => {
    const {
      account: { userId, token },
    } = thunkApi.getState() as RootState;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response: User = await axios.put(
        `${ACCOUNTING_URL}/editname/${userId}`,
        {
          username: newName,
        },
        { headers }
      );
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserEducation = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.EDIT_EDUCATION,
  async (education: string, thunkApi) => {
    const {
      account: { userId, token },
    } = thunkApi.getState() as RootState;
    console.log("education:", education);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const { data }: { data: User } = await axios.put(
        `${ACCOUNTING_URL}/editeducation/${userId}/${education}`,
        null,
        { headers }
      );
      data.educationLevel = data.educationLevel.toLowerCase();
      console.log("data after edit education:", data);
      return data;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserCommunities = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.EDIT_USER_COMMUNITIES,
  async (scientificInterests: string[], thunkApi) => {
    const {
      account: { userId, token },
    } = thunkApi.getState() as RootState;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response: User = await axios.put(
        `${ACCOUNTING_URL}/editscientificinterests/${userId}`,
        {
          scientificInterests: scientificInterests,
        },
        { headers }
      );
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserCountry = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.EDIT_USER_COUNTRY,
  async (country: string, thunkApi) => {
    const {
      account: {
        user: {
          location: { city },
        },
        token,
        userId,
      },
    } = thunkApi.getState() as RootState;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const { data }: { data: User } = await axios.put(
        `${ACCOUNTING_URL}/editlocation/${userId}`,
        {
          country,
          city,
        },
        { headers }
      );
      return data;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserCity = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.EDIT_USER_CITY,
  async (city: string, thunkApi) => {
    const {
      account: {
        user: {
          location: { country },
        },
        token,
        userId,
      },
    } = thunkApi.getState() as RootState;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const { data }: { data: User } = await axios.put(
        `${ACCOUNTING_URL}/editlocation/${userId}`,
        {
          country,
          city,
        },
        { headers }
      );
      return data;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserAvatar = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.EDIT_USER_AVATAR,
  async (avatar, thunkApi) => {
    const {
      account: { token, userId },
    } = thunkApi.getState() as RootState;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const { data }: { data: User } = await axios.put(
        `${ACCOUNTING_URL}/editavatar/${userId}/${avatar}`,
        null,
        { headers }
      );
      return data;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const editUserPassword = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.EDIT_USER_PASSWORD,
  async (newPassword: string, thunkApi) => {
    const {
      account: { token, userId },
    } = thunkApi.getState() as RootState;
    const headers = {
      Authorization: `Bearer ${token}`,
      "X-Password": newPassword,
      "Content-Type": "application/json",
    };
    try {
      const response: boolean = await axios.put(
        `${ACCOUNTING_URL}/editpassword/${userId}`,
        null,
        { headers }
      );
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
);
export const deleteUser = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.DELETE_USER,
  async (_, thunkApi) => {
    const {
      account: { token, userId },
    } = thunkApi.getState() as RootState;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.delete(
        `${ACCOUNTING_URL}/delete/${userId}`,
        {
          headers,
        }
      );
      return response;
    } catch (err: any) {
      console.log(err);
    }
  }
);
export const getEductionLevels = createAsyncThunk(
  ACCOUNT_ACTION_TYPE.GET_EDUCATION_LEVELS,
  async () => {
    try {
      const { data }: { data: string[] } = await axios.get(
        `${ACCOUNTING_URL}/geteducation`
      );
      return data;
    } catch (err: any) {
      console.log(err);
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
        const userId = helperGetUserIdFromToken(action.payload ?? "");
        state.token = action.payload ?? state.token;
        state.userId = userId;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const userId = helperGetUserIdFromToken(action.payload ?? "");
        state.token = action.payload ?? state.token;
        state.userId = userId;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload ?? state.user;
      })
      .addCase(editUserName.fulfilled, (state, action) => {
        state.user = action.payload ?? state.user;
      })
      .addCase(editUserEducation.fulfilled, (state, action) => {
        state.user = action.payload ?? state.user;
      })
      .addCase(editUserCommunities.fulfilled, (state, action) => {
        state.user = action.payload ?? state.user;
      })
      .addCase(editUserCountry.fulfilled, (state, action) => {
        state.user = action.payload ?? state.user;
      })
      .addCase(editUserCity.fulfilled, (state, action) => {
        state.user = action.payload ?? state.user;
      })
      .addCase(editUserAvatar.fulfilled, (state, action) => {
        state.user = action.payload ?? state.user;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state = { ...initialState, educationLevels: state.educationLevels };
      })
      .addCase(getEductionLevels.fulfilled, (state, action) => {
        state.educationLevels = action.payload ?? state.educationLevels;
      });
  },
});

export default accountSlice.reducer;
export const {} = accountSlice.actions;
export const selectEductionLevels = (state: RootState) =>
  state.account.educationLevels;

export const selectUser = (state: RootState) => state.account.user;
