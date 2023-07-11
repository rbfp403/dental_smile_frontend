import { createSlice } from "@reduxjs/toolkit";

export const agendaSlice = createSlice({
  name: "agenda",

  initialState: {
    citasList: [],
    citasListAgenda: [],
    activeCita: null,
    stateOpenFormAgenda: false,
    titleFormAgenda: "",
    errorRegCiteMessage: { msg: "", error: "" },
    stateOpenDeleteConf: false,
    blockPaciente: false,
    stateOpenVCita: false,
  },

  reducers: {
    onChangeOpenFormAgenda: (state, { payload }) => {
      state.stateOpenFormAgenda = payload;
    },

    onChangeTitleFormAgenda: (state, { payload }) => {
      state.titleFormAgenda = payload;
    },

    onChangeOpenDeleteConf: (state, { payload }) => {
      state.stateOpenDeleteConf = payload;
    },

    onSetActiveCita: (state, { payload }) => {
      state.activeCita = payload;
    },

    onLoadCitas: (state, { payload }) => {
      state.citasList = payload;
    },

    onLoadCitasAgenda: (state, { payload }) => {
      state.citasListAgenda = payload;
    },

    onSaveCita: (state, { payload }) => {
      state.citasList.push(payload);
    },

    onUpdateCita: (state, { payload }) => {
      state.citasList = state.citasList.map((cita) => {
        if (cita.fecha === payload.fecha && cita.hora === payload.hora) {
          return payload;
        }
        return cita;
      });
    },

    onDeleteCita: (state) => {
      state.citasList = state.citasList.filter(
        (cita) =>
          cita.fecha !== state.activeCita.fecha ||
          cita.hora !== state.activeCita.hora
      );

      state.activeCita = null;
    },

    changeRegisterCiteError: (state, { payload }) => {
      state.errorRegCiteMessage = payload;
    },

    clearErrorCiteMessage: (state) => {
      state.errorRegCiteMessage = { msg: "", error: "" };
    },

    onChangeBlockPaciente: (state, { payload }) => {
      state.blockPaciente = payload;
    },

    onChangeOpenVCita: (state, { payload }) => {
      state.stateOpenVCita = payload;
    },
  },
});

export const {
  onChangeOpenFormAgenda,
  onChangeTitleFormAgenda,
  onSetActiveCita,
  onLoadCitas,
  onSaveCita,
  onUpdateCita,
  onDeleteCita,
  changeRegisterCiteError,
  clearErrorCiteMessage,
  onChangeOpenDeleteConf,
  onChangeBlockPaciente,
  onChangeOpenVCita,
  onLoadCitasAgenda,
} = agendaSlice.actions;
