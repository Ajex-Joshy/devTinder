import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state, action) => {
      return (state = state.filter((r) => r.fromUserId._id !== action.payload));
    },
  },
});

export const { addRequests, removeRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
