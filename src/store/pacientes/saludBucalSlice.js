import { createSlice } from "@reduxjs/toolkit";

export const saludBucalSlice = createSlice({
  name: "saludBucal",

  initialState: {
    saludBucalActual: { piezas: [] },
    errorMsgRegSaludB: { msg: "", error: "" },
    dataSaludBucal: null,
    isUpdatedSB: false,
  },

  reducers: {
    onSetSaludBucalAct: (state, { payload }) => {
      state.saludBucalActual = payload;
    },

    onChangeIndiceSimplificado: (state, { payload }) => {
      //comprobar si es registro o actualizacion
      const existente = state.saludBucalActual.piezas.some(
        (pieceDent) => pieceDent.fila === payload.fila
      );

      if (existente) {
        //actualizacion
        state.saludBucalActual.piezas = state.saludBucalActual.piezas.map(
          (pieceDent) => {
            if (pieceDent.fila === payload.fila) {
              return payload;
            }
            return pieceDent;
          }
        );
      } else {
        state.saludBucalActual.piezas.push(payload);
      }
    },

    addIdSaludBucal: (state, { payload }) => {
      state.saludBucalActual.id_saludb = payload;
    },

    changeRegisterSaludB: (state, { payload }) => {
      state.errorMsgRegSaludB = payload;
    },

    onSetDataBucal: (state, { payload }) => {
      state.dataSaludBucal = payload;
    },

    clearErrorMessageSaludB: (state) => {
      state.errorMsgRegSaludB = { msg: "", error: "" };
    },
    onUpdatedSB: (state, { payload }) => {
      state.isUpdatedSB = payload;
    },
  },
});

export const {
  onSetSaludBucalAct,
  onChangeIndiceSimplificado,
  changeRegisterSaludB,
  clearErrorMessageSaludB,
  onUpdatedSB,
  onSetDataBucal,
  addIdSaludBucal,
} = saludBucalSlice.actions;
