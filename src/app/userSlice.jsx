import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, register } from "../services/auth";
import { addError, removeError } from "./errorSlice";

const initialState = {
  isAuthenticated: false,
  user: {},
  status: "idle",
  appStatus: "",
  email: ""
};

export const authUser = createAsyncThunk(
  "currentUser/authUser",
  async (data, thunkAPI) => {
    try {
      const user = await signIn(data);
      console.log("User data after signin:", user);
      // Save data in localStorage
      localStorage.setItem("userID", user.id);
      localStorage.setItem("position", user.position);
      localStorage.setItem("appStatus", user.appStatus);
      localStorage.setItem("token", user.token);
      localStorage.setItem("email", user.email);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "currentUser/registerUser",
  async (data, thunkAPI) => {
    try {
      const user = await register(data);
      console.log("User data after register:", user);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.user = action.payload;
    },
    setCurrentUserStatus: (state, action) => {
      state.appStatus = action.payload;
    },
    setCurrentUserEmail: (state, action) => {
      state.email = action.payload;
    },
    logOutUser: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.status = "idle";
      state.appStatus = "";
      state.email = "";
      // Remove user information
      localStorage.removeItem("userID");
      localStorage.removeItem("position");
      localStorage.removeItem("appStatus");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      // Remove data in employee profile page
      localStorage.removeItem("profileSummaryPage");
      localStorage.removeItem("profileSummarySearch");
      // Remove data in hiring management page
      localStorage.removeItem("hiringManagementTab1");
      localStorage.removeItem("hiringManagementTab2");
      localStorage.removeItem("hiringManagementSearch");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.user = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.status = "failed";
    });
    builder.addCase(authUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.status = "pending";
    });
  },
});

export const { setCurrentUser, setCurrentUserStatus, setCurrentUserEmail, logOutUser } = userSlice.actions;

export default userSlice.reducer;