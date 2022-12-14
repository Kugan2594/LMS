import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
// import type { RootState } from '../../app/store'

// Define a type for the slice state
interface authState {
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: authState = {
  isLoggedIn: true,
};

export const counterSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { logIn, logOut } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth.isLoggedIn;

export default counterSlice.reducer;
