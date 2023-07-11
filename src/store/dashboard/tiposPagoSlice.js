import { createSlice } from "@reduxjs/toolkit";

export const tiposPagoSlice = createSlice({
  name: "tiposPagoSlice",
  //
  initialState: {
    tipoPagosList: [],
    tipoPagoActivo: null,
    errorMsgRegTipoPago: { msg: "", error: "" },
  },
  reducers: {
    onSetActiveTipoPago: (state, { payload }) => {
      state.tipoPagoActivo = payload;
    },

    onLoadTipoPagosList: (state, { payload }) => {
      state.tipoPagosList = payload;
    },

    onSaveTipoPago: (state, { payload }) => {
      state.tipoPagosList.push(payload);
    },

    onUpdateTipoPago: (state, { payload }) => {
      state.tipoPagosList = state.tipoPagosList.map((tipPago) => {
        if (tipPago.id === payload.id) {
          return payload;
        }

        return tipPago;
      });
    },

    onDeleteTipoPago: (state, { payload }) => {
      if (payload.length === 0) {
        state.tipoPagosList = state.tipoPagosList.filter(
          (tipPago) => tipPago.id !== state.tipoPagoActivo.id
        );
      } else {
        state.tipoPagosList = state.tipoPagosList.filter(
          (tipPago) => !payload.includes(tipPago.id)
        );
      }
      state.tipoPagoActivo = null;
    },

    onChangeRegErrTipPago: (state, { payload }) => {
      state.errorMsgRegTipoPago = payload;
    },

    clearErrorTipPagoMsg: (state) => {
      state.errorMsgRegTipoPago = { msg: "", error: "" };
    },
  },
});

export const {
  onSetActiveTipoPago,
  onLoadTipoPagosList,
  onSaveTipoPago,
  onUpdateTipoPago,
  onDeleteTipoPago,
  onChangeRegErrTipPago,
  clearErrorTipPagoMsg,
} = tiposPagoSlice.actions;
