import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import auth from "../../../../firebase.config";
import { useSetUsersMutation } from "../../api/baseApi";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  isLoading: false,
  isInitializing: true,
  isError: false,
  error: "",
  isLoggedIn : false
};

export const createTest=createAsyncThunk()

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      const user = userCredential.user;
      const userData = { name: user.displayName, email: user.email };

      const apiUrl = "http://localhost:5144/users";
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }

      axios.post("http://localhost:5144/jwt" , user ,  {
        withCredentials: true, 
      })
      .then(res => console.log(res.data))

     

      return userData;
    } catch (error) { 
      console.error("Error creating user:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for login with email and password
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = { name: user.displayName, email: user.email };

      axios.post("http://localhost:5144/jwt" , user ,  {
        withCredentials: true, 
      })
      .then(res => console.log(res.data))

      return userData;
    } catch (error) {
      console.error("Error logging in:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for Google sign-in 
export const signInWithGoogle = createAsyncThunk(
  "user/signInWithGoogle",
  async (_, thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = { name: user.displayName, email: user.email, isLoggedIn: true };

      try {
        const apiUrl = "http://localhost:5144/users";
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create user');
        }
      } catch (fetchError) {
        console.error("Error during fetch:", fetchError.message);
        // Optionally, you can handle the fetch error here, for example, by logging it or notifying the user.
      }

      axios.post("http://localhost:5144/jwt" , user ,  {
        withCredentials: true, 
      })
      .then(res => console.log(res.data))

      return userData;
    } catch (error) {
      console.error("Error signing in with Google:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);





export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload.isLoading;
    },
    setInitializing : (state, { payload }) => {
      state.isInitializing = payload.isInitializing;
    },
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload.isLoggedIn;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.name = "";
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isLoggedIn = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.name = "";
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload; // Use action.payload for error message
      })
      .addCase(loginUser.pending, (state) => {
        state.name = "";
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.name = "";
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload; // Use action.payload for error message
        state.isLoggedIn = false;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.name = "";
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isLoggedIn = false;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isLoggedIn = true;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.name = "";
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload; // Use action.payload for error message
        state.isLoggedIn = false;
      });
  },
});


// Action creators are generated for each case reducer function
export const { setUser, setLoading, setInitializing , setIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
