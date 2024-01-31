import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../services/auth";
import { addError, removeError } from "./errorSlice";

const initialState = {
  isAuthenticated: false,
  user: {},
  userID: null,
  status: "idle",
  appStatus: "",
  email: "",
  position: "",
  
};

export const authUser = createAsyncThunk(
  "currentUser/authUser",
  async (data, thunkAPI) => {
    try {
      const user = await login(data);
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
      state.userID = action.payload;
    },
    setCurrentUserStatus: (state, action) => {
      state.appStatus = action.payload;
    },
    setCurrentUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setCurrentUserPosition: (state, action) => {
      state.position = action.payload;
    },
    logOutUser: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.userID = null;
      state.status = "idle";
      state.appStatus = "";
      state.email = "";
      state.position = "";
      // Remove user information
      localStorage.removeItem("userID");
      localStorage.removeItem("position");
      localStorage.removeItem("appStatus");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("position");

      // Remove data in employee profile page
      localStorage.removeItem("profileSummaryPage");
      localStorage.removeItem("profileSummarySearch");

      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("middleName");
      localStorage.removeItem("preferredName");
      localStorage.removeItem("SSN");
      localStorage.removeItem("birthDate");
      localStorage.removeItem("gender");

      localStorage.removeItem("address");
      localStorage.removeItem("apt");
      localStorage.removeItem("city");
      localStorage.removeItem("state");
      localStorage.removeItem("zipCode");

      localStorage.removeItem("isCitizen");
      localStorage.removeItem("title");
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");

      localStorage.removeItem("refFirstName");
      localStorage.removeItem("refLastName");
      localStorage.removeItem("refMiddleName");
      localStorage.removeItem("refEmail");
      localStorage.removeItem("refPhone");
      localStorage.removeItem("refRelationship");

      localStorage.removeItem("emergencies");

      localStorage.removeItem("cellPhone");
      localStorage.removeItem("workPhone");
      // Remove data in hiring management page
      localStorage.removeItem("hiringManagementTab1");
      localStorage.removeItem("hiringManagementTab2");
      localStorage.removeItem("hiringManagementSearch");
      // Remove data in employee profile page
      localStorage.removeItem("profileSummaryPage");
      localStorage.removeItem("profileSummarySearch");
      // Remove data in hiring management page
      localStorage.removeItem("hiringManagementTab1");
      localStorage.removeItem("hiringManagementTab2");
      localStorage.removeItem("hiringManagementSearch");
      // Remove data in visa management page
      localStorage.removeItem("visaStatusTab");
      localStorage.removeItem("visaStatusSearch");
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

export const { setCurrentUser, setCurrentUserStatus, setCurrentUserEmail, setCurrentUserPosition, logOutUser } = userSlice.actions;

export default userSlice.reducer;