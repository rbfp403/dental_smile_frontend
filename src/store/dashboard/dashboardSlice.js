import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    //paneles admin
    listPacientesPanel: [],
    listConsultasPanel: [],
    listProcedimientosPanel: [],

    //ganancias
    listGastosPanel: [],
    listIngresoPanel: [],
    totallistGastos: 0,
    totallistIngreso: 0,

    messagePanelPac: "",
    messagePanelCons: "",
    messagePanelProced: "",
    messagePanelIngre: "",
    messagePanelGastos: "",
    messagePanelGananc: "",

    parametrosBusqueda: {},
  },

  reducers: {
    //lista del admin dashboard solo lectura
    onLoadListPacPanel: (state, { payload }) => {
      state.listPacientesPanel = payload;
    },
    onLoadListConsPanel: (state, { payload }) => {
      state.listConsultasPanel = payload;
    },
    onLoadListProcedPanel: (state, { payload }) => {
      state.listProcedimientosPanel = payload;
    },
    onLoadListGastosPanel: (state, { payload }) => {
      state.listGastosPanel = payload;
    },
    onLoadListIngresoPanel: (state, { payload }) => {
      state.listIngresoPanel = payload;
    },
    onLoadListTotalGastos: (state, { payload }) => {
      state.totallistGastos = payload;
    },
    onLoadListTotalIngreso: (state, { payload }) => {
      state.totallistIngreso = payload;
    },

    //
    onChangeMsgPanelPac: (state, { payload }) => {
      state.messagePanelPac = payload;
    },
    onChangeMsgPanelCons: (state, { payload }) => {
      state.messagePanelCons = payload;
    },
    onChangeMsgPanelProced: (state, { payload }) => {
      state.messagePanelProced = payload;
    },
    onChangeMsgPanelIngre: (state, { payload }) => {
      state.messagePanelIngre = payload;
    },
    onChangeMsgPanelGastos: (state, { payload }) => {
      state.messagePanelGastos = payload;
    },
    onChangeMsgPanelGanan: (state, { payload }) => {
      state.messagePanelGananc = payload;
    },

    onChangeParametroBusqueda: (state, { payload }) => {
      state.parametrosBusqueda = payload;
    },
  },
});

export const {
  onLoadListPacPanel,
  onLoadListConsPanel,
  onLoadListProcedPanel,
  onLoadListGastosPanel,
  onLoadListIngresoPanel,
  onLoadListTotalGastos,
  onLoadListTotalIngreso,

  //
  onChangeMsgPanelPac,
  onChangeMsgPanelCons,
  onChangeMsgPanelProced,
  onChangeMsgPanelIngre,
  onChangeMsgPanelGastos,
  onChangeMsgPanelGanan,

  //
  onChangeParametroBusqueda,
} = dashboardSlice.actions;
