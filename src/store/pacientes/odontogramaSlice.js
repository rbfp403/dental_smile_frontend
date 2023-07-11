import { createSlice } from "@reduxjs/toolkit";

export const odontogramaSlice = createSlice({
  name: "odontograma",

  initialState: {
    toolOdontActiva: null,
    odontogramaActual: { piezas: [], fecha_odontograma: "" },
    errorMsgRegOdontog: { msg: "", error: "" },
    piezasListOdon: [],
    piezaActiva: null,
    isUpdatedOdon: false,
  },

  reducers: {
    onSetActiveTool: (state, { payload }) => {
      state.toolOdontActiva = payload;
    },

    onSetOdontogramaConsAct: (state, { payload }) => {
      state.odontogramaActual = payload;
    },

    onChangePiezasDentales: (state, { payload }) => {
      //comprobar si es registro o actualizacion
      const existente = state.odontogramaActual.piezas.some(
        (pieceDent) => pieceDent.numberTooth === payload.numberTooth
      );

      if (existente) {
        //actualizacion
        state.odontogramaActual.piezas = state.odontogramaActual.piezas.map(
          (pieceDent) => {
            if (pieceDent.numberTooth === payload.numberTooth) {
              return payload;
            }
            return pieceDent;
          }
        );
      } else {
        state.odontogramaActual.piezas.push(payload);
      }
    },

    onSetPiezasListOdon: (state, { payload }) => {
      state.piezasListOdon = payload;
    },

    onSetPiezaActiva: (state, { payload }) => {
      state.piezaActiva = payload;
    },

    changeRegisterErrorOdont: (state, { payload }) => {
      state.errorMsgRegOdontog = payload;
    },

    clearErrorMessageOdont: (state) => {
      state.errorMsgRegOdontog = { msg: "", error: "" };
    },

    onUpdatedOdont: (state, { payload }) => {
      state.isUpdatedOdon = payload;
    },
  },
});

export const {
  onSetActiveTool,
  onChangePiezasDentales,
  onSetOdontogramaConsAct,
  changeRegisterErrorOdont,
  clearErrorMessageOdont,
  onSetPiezasListOdon,
  onSetPiezaActiva,
  onUpdatedOdont,
} = odontogramaSlice.actions;
