import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",

  initialState: {
    pageActive: "",
    isSidebarOpen: false,
    hookTabs: 0,
    hookTabsCons: 0,
    listaPacienteSidebar: [],
  },

  reducers: {
    onChangeSidebar: (state, { payload }) => {
      state.isSidebarOpen = payload;
    },
    onChangePage: (state, { payload }) => {
      state.pageActive = payload;
    },

    onChangeHookTabs: (state, { payload }) => {
      state.hookTabs = payload;
    },

    onChangeHookTabsCons: (state, { payload }) => {
      state.hookTabsCons = payload;
    },

    onSavePacienteSidebar: (state, { payload }) => {
      const registrado = state.listaPacienteSidebar.some(
        (pac) => pac.to === payload.to
      );

      if (!registrado) {
        state.listaPacienteSidebar.push(payload);
      }
    },

    onDeletePacienteSidebar: (state, { payload }) => {
      state.listaPacienteSidebar = state.listaPacienteSidebar.filter(
        (pac) => pac.to !== payload.to
      );
    },

    onSaveConsultaSidebar: (state, { payload }) => {
      for (let index = 0; index < state.listaPacienteSidebar.length; index++) {
        if (state.listaPacienteSidebar[index].to === payload.id_pac) {
          //

          const registrada = state.listaPacienteSidebar[index].arrCons.some(
            (cons) => cons.id === payload.id_con
          );

          if (!registrada) {
            state.listaPacienteSidebar[index].arrCons.push({
              id: payload.id_con,
              text: payload.fecha,
              text2: payload.tipoCons,
            });
          }

          break;
        }
      }
    },

    onDeleteConsultaSidebar: (state, { payload }) => {
      //posicion del paciente

      let posicionPac = -1;

      for (let index = 0; index < state.listaPacienteSidebar.length; index++) {
        if (state.listaPacienteSidebar[index].to === payload.id_pac) {
          posicionPac = index;
          break;
        }
      }

      if (posicionPac !== -1) {
        state.listaPacienteSidebar[posicionPac].arrCons =
          state.listaPacienteSidebar[posicionPac].arrCons.filter(
            (cons) => cons.id !== payload.id_con
          );
      }
    },
  },
});

export const {
  onChangeSidebar,
  onChangePage,
  onChangeHookTabs,
  onChangeHookTabsCons,
  onSavePacienteSidebar,
  onDeletePacienteSidebar,
  onSaveConsultaSidebar,
  onDeleteConsultaSidebar,
} = uiSlice.actions;
