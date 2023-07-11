import { createSlice } from "@reduxjs/toolkit";

export const tiposTratamSlice = createSlice({
  name: "tiposTratamSlice",
  //
  initialState: {
    tipoTratamList: [],
    tipoTratamActivo: null,
    errorMsgRegTipoTratam: { msg: "", error: "" },
  },
  reducers: {
    onSetActiveTipoTratam: (state, { payload }) => {
      state.tipoTratamActivo = payload;
    },

    onLoadTipoTratamList: (state, { payload }) => {
      state.tipoTratamList = payload;
    },

    onSaveTipoTratam: (state, { payload }) => {
      state.tipoTratamList.push(payload);
    },

    onUpdateTipoTratam: (state, { payload }) => {
      state.tipoTratamList = state.tipoTratamList.map((tipTratam) => {
        if (tipTratam.id === payload.id) {
          return payload;
        }

        return tipTratam;
      });
    },

    onDeleteTipoTratam: (state, { payload }) => {
      if (payload.length === 0) {
        state.tipoTratamList = state.tipoTratamList.filter(
          (tipTratam) => tipTratam.id !== state.tipoTratamActivo.id
        );
      } else {
        state.tipoTratamList = state.tipoTratamList.filter(
          (tipTratam) => !payload.includes(tipTratam.id)
        );
      }
      state.tipoTratamActivo = null;
    },

    onChangeRegErrTipTratam: (state, { payload }) => {
      state.errorMsgRegTipoTratam = payload;
    },

    clearErrorTipTratamMsg: (state) => {
      state.errorMsgRegTipoTratam = { msg: "", error: "" };
    },
  },
});

export const {
  onSetActiveTipoTratam,
  onLoadTipoTratamList,
  onSaveTipoTratam,
  onUpdateTipoTratam,
  onDeleteTipoTratam,
  onChangeRegErrTipTratam,
  clearErrorTipTratamMsg,
} = tiposTratamSlice.actions;
