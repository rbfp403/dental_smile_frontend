import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    authenticatedStatus: false,
    errorMsgAuth: { msg: "", error: "" },
  },

  reducers: {
    changeStatusAuth: (state, { payload }) => {
      state.authenticatedStatus = payload;
    },
    onChangeMsgErrorLog: (state, { payload }) => {
      state.errorMsgAuth = payload;
    },
  },
});

export const { changeStatusAuth, onChangeMsgErrorLog } = authSlice.actions;
