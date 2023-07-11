import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",

  initialState: {
    dataActiva: [],
  },

  reducers: {
    onLoadDataActiva: (state, { payload }) => {
      state.dataActiva = {
        ...payload,
      };
    },
  },
});

export const { onLoadDataActiva } = dataSlice.actions;
