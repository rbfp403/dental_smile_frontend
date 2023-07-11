import { createSlice } from "@reduxjs/toolkit";

export const tipoConsSlice = createSlice({
  name: "tipoConsSlice",
  //
  initialState: {
    tipoConsList: [],
    tipoConsListBusq: [],
    tipoConsActivo: null,
    errorMsgRegTipoCons: { msg: "", error: "" },
  },
  reducers: {
    onSetActiveTipoCons: (state, { payload }) => {
      state.tipoConsActivo = payload;
    },

    onLoadTipoConsList: (state, { payload }) => {
      state.tipoConsList = payload;
    },
    onLoadTipoConsListBusq: (state, { payload }) => {
      state.tipoConsListBusq = payload;
    },

    onSaveTipoCons: (state, { payload }) => {
      state.tipoConsList.push(payload);
    },

    onUpdateTipoCons: (state, { payload }) => {
      state.tipoConsList = state.tipoConsList.map((tipCons) => {
        if (tipCons.id === payload.id) {
          return payload;
        }

        return tipCons;
      });
    },

    onDeleteTipoCons: (state, { payload }) => {
      if (payload.length === 0) {
        state.tipoConsList = state.tipoConsList.filter(
          (tipCons) => tipCons.id !== state.tipoConsActivo.id
        );
      } else {
        state.tipoConsList = state.tipoConsList.filter(
          (tipCons) => !payload.includes(tipCons.id)
        );
      }
      state.tipoConsActivo = null;
    },

    onChangeRegErrTipCons: (state, { payload }) => {
      state.errorMsgRegTipoCons = payload;
    },

    clearErrorTipConsMsg: (state) => {
      state.errorMsgRegTipoCons = { msg: "", error: "" };
    },
  },
});

export const {
  onSetActiveTipoCons,
  onLoadTipoConsList,
  onSaveTipoCons,
  onUpdateTipoCons,
  onDeleteTipoCons,
  onChangeRegErrTipCons,
  clearErrorTipConsMsg,
  onLoadTipoConsListBusq,
} = tipoConsSlice.actions;
