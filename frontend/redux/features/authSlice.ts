import { User } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null; // Add a field for user details
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null, // Initial user state is null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null; // Clear user details on logout
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setAuth, setUser, logout, finishInitialLoad } =
  authSlice.actions;
export default authSlice.reducer;
