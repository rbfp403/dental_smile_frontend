import { createSlice } from "@reduxjs/toolkit";

export const gastosSlice = createSlice({
  name: "gastos",

  initialState: {
    gastosList: [],
    gastoActivo: null,
    errorMsgRegGasto: { msg: "", error: "" },
    totalGastos: 0,
  },

  reducers: {
    onLoadGastosList: (state, { payload }) => {
      state.gastosList = payload;
    },
    onSetActiveGasto: (state, { payload }) => {
      state.gastoActivo = payload;
    },

    onSetGastosTotales: (state, { payload }) => {
      state.totalGastos = payload;
    },

    onSaveGasto: (state, { payload }) => {
      state.gastosList.push(payload);
      state.totalGastos = state.totalGastos + parseFloat(payload.monto);
    },

    onUpdateGasto: (state, { payload }) => {
      state.gastosList = state.gastosList.map((gasto) => {
        if (gasto.id === payload.id) {
          return payload;
        }

        return gasto;
      });

      let total = 0;
      total = state.gastosList.reduce((acc, montoAct) => {
        return acc + montoAct.monto;
      }, 0);

      state.totalGastos = parseFloat(total);
    },

    onDeleteGasto: (state, { payload }) => {
      if (payload.length === 0) {
        state.gastosList = state.gastosList.filter(
          (gasto) => gasto.id !== state.gastoActivo.id
        );
      } else {
        state.gastosList = state.gastosList.filter(
          (gasto) => !payload.includes(gasto.id)
        );
      }
      state.gastoActivo = null;

      let total = 0;
      total = state.gastosList.reduce((acc, montoAct) => {
        return acc + montoAct.monto;
      }, 0);
      state.totalGastos = parseFloat(total);
    },

    onChangeRegErrGasto: (state, { payload }) => {
      state.errorMsgRegGasto = payload;
    },

    clearErrorGastoMsg: (state) => {
      state.errorMsgRegGasto = { msg: "", error: "" };
    },
  },
});

export const {
  onSetActiveGasto,
  onLoadGastosList,
  onSetGastosTotales,
  onSaveGasto,
  onUpdateGasto,
  onDeleteGasto,
  onChangeRegErrGasto,
  clearErrorGastoMsg,
} = gastosSlice.actions;
