import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    name: null,
    email: null,
    phone: null,
    photo: null,
    token: null,
  },
}

export const Auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // A reducer to set the user data after login
    setUserData: (state, action) => {
      state.value = action.payload;
    },
    // A reducer to clear user data on logout
    clearUserData: (state) => {
      state.value = initialState.value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserData, clearUserData } = Auth.actions;

export default Auth.reducer