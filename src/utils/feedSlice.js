import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => state.filter((user) => user._id != action.payload),
    removeAllFeed:(state)=>null
  },
});

export const { addFeed, removeFeed ,removeAllFeed} = feedSlice.actions;

export default feedSlice.reducer;
