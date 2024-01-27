import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../services/auth";
import { addError, removeError } from "./errorSlice";

const initialState = {
  isAuthenticated: false,
  user: {},
  status: "idle",
};

export const authUser = createAsyncThunk(
  "currentUser/authUser",
  async (data, thunkAPI) => {
    try {
      const user = await login(data);
      localStorage.setItem("token", user.token)
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
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      console.log(message)
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
    logOutUser: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.status = "idle";
      localStorage.removeItem("token")
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

export const { setCurrentUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
