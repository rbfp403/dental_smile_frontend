import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    errorMsgAuth: { msg: "", error: "" },
  },

  reducers: {
    onChangeMsgErrorLog: (state, { payload }) => {
      state.errorMsgAuth = payload;
    },
  },
});

export const { onChangeMsgErrorLog } = authSlice.actions;
