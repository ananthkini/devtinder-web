import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    
    removeRequests: (state, action) => state.filter((request) => request._id != action.payload),
    removeAllRequests:(state)=>null
  },
});

export const {addRequests,removeRequests,removeAllRequests} = requestsSlice.actions;

export default requestsSlice.reducer;
