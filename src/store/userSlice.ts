import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Rootstate } from "./store";
import { User } from "../utils/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
// PayloadAction
// import type { Rootstate } from "configs/store";
// import { ApiService } from "services/api-service";
// import { User } from "utils/types";

interface InitialState {
  status: "loading" | "successfull" | "failed" | "idle";
  user: User | null;
  token: string | null;
  error: string | null;
}

const initialState: InitialState = {
  status: "loading",
  token: null,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state,) => {
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchUserInfo.fulfilled, (state, action: any) => {
        state.status = "successfull";
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (uid: any) => {
    const docRef = doc(db, "users", uid);
    const response = await getDoc(docRef);
    return { ...response.data() };
  }
);

export const { logout, login } = userSlice.actions;

export const selectUser = (state: Rootstate) => state.user.user;
export const selectUserApiStatus = (state: Rootstate) => state.user.status;

export const userReducer = userSlice.reducer;