import { createSlice } from "@reduxjs/toolkit";

export const ingresosSlice = createSlice({
  name: "ingresos",

  initialState: {
    ingresosList: [],
    ingresosConsList: [],
    ingresoActivo: null,
    errorMsgRegIngreso: { msg: "", error: "" },
    totalIngCons: 0,
    totalIngresos: 0,
  },

  reducers: {
    onLoadIngresosConsList: (state, { payload }) => {
      state.ingresosConsList = payload;
    },

    onLoadIngresosList: (state, { payload }) => {
      state.ingresosList = payload;
    },
    onSetActiveIngreso: (state, { payload }) => {
      state.ingresoActivo = payload;
    },

    onSetTotalesIngreso: (state, { payload }) => {
      state.totalIngresos = payload;
    },

    onSetTotalesIngresoCons: (state, { payload }) => {
      state.totalIngCons = payload;
    },

    onSaveIngreso: (state, { payload }) => {
      state.ingresosList.push(payload);
      state.totalIngresos = state.totalIngresos + parseFloat(payload.monto);
    },

    onUpdateIngreso: (state, { payload }) => {
      state.ingresosList = state.ingresosList.map((ingreso) => {
        if (ingreso.id === payload.id) {
          return payload;
        }

        return ingreso;
      });

      let total = 0;
      total = state.ingresosList.reduce((acc, montoAct) => {
        return acc + montoAct.monto;
      }, 0);

      state.totalIngresos = parseFloat(total);
    },

    onDeleteIngreso: (state, { payload }) => {
      if (payload.length === 0) {
        state.ingresosList = state.ingresosList.filter(
          (ingreso) => ingreso.id !== state.ingresoActivo.id
        );
      } else {
        state.ingresosList = state.ingresosList.filter(
          (ingreso) => !payload.includes(ingreso.id)
        );
      }
      state.ingresoActivo = null;
      let total = 0;
      total = state.ingresosList.reduce((acc, montoAct) => {
        return acc + montoAct.monto;
      }, 0);
      state.totalIngresos = parseFloat(total);
    },

    onChangeRegErrIngreso: (state, { payload }) => {
      state.errorMsgRegIngreso = payload;
    },

    clearErrorIngresoMsg: (state) => {
      state.errorMsgRegIngreso = { msg: "", error: "" };
    },
  },
});

export const {
  onSetActiveIngreso,
  onLoadIngresosList,
  onLoadIngresosConsList,
  onSaveIngreso,
  onUpdateIngreso,
  onDeleteIngreso,
  onChangeRegErrIngreso,
  clearErrorIngresoMsg,
  onSetTotalesIngresoCons,
  onSetTotalesIngreso,
} = ingresosSlice.actions;
