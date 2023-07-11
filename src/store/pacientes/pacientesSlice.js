import { createSlice } from "@reduxjs/toolkit";

export const pacientesSlice = createSlice({
  name: "pacientes",

  initialState: {
    //Paciente
    titleForm: "",
    pacienteActivo: null,
    pacientesList: [],
    pacientesListBusq: [],
    errorMsgRegPac: { msg: "", error: "" },

    //antecedentes
    antecedentes: [[], []],
    antecedenteActivo: {},

    //futuras citas
    errorRegAntecedente: { msg: "", error: "" },
    futurasCitasList: null,
    errorLoadFutCitas: null,
  },

  reducers: {
    changeTitleForm: (state, { payload }) => {
      state.titleForm = payload;
    },

    onLoadPacActivo: (state, { payload }) => {
      state.pacienteActivo = {
        ...payload,
      };
    },

    onLoadPacientesList: (state, { payload }) => {
      state.pacientesList = payload;
    },

    onLoadPacientesListBusq: (state, { payload }) => {
      state.pacientesListBusq = payload;
    },

    onSavePaciente: (state, { payload }) => {
      state.pacientesList.push(payload);
    },

    onUpdatePaciente: (state, { payload }) => {
      state.pacientesList = state.pacientesList.map((paciente) => {
        if (paciente.id === payload.id) {
          return payload;
        }

        return paciente;
      });
    },

    onDeletePaciente: (state, { payload }) => {
      if (state.pacienteActivo && payload.length === 0) {
        state.pacientesList = state.pacientesList.filter(
          (paciente) => paciente.id !== state.pacienteActivo.id
        );
      } else {
        state.pacientesList = state.pacientesList.filter(
          (paciente) => !payload.includes(paciente.id)
        );
      }
      state.pacienteActivo = null;
    },

    changeRegisterError: (state, { payload }) => {
      state.errorMsgRegPac = payload;
    },

    clearErrorMessagePac: (state) => {
      state.errorMsgRegPac = { msg: "", error: "" };
    },

    onLoadAntecedentes: (state, { payload }) => {
      state.antecedentes = payload;
    },

    onSaveAntecedente: (state, { payload }) => {
      const tipo = payload.par_antecedente === null ? 0 : 1;
      state.antecedentes[tipo].push(payload);
    },

    onUpdateAntecedente: (state, { payload }) => {
      const tipo = payload.par_antecedente === null ? 0 : 1;

      state.antecedentes[tipo] = state.antecedentes[tipo].map((anteced) => {
        if (anteced.id_antecedente === payload.id_antecedente) {
          return payload;
        }

        return anteced;
      });
    },

    onDeleteAntecedente: (state) => {
      const tipo = state.antecedenteActivo.par_antecedente === null ? 0 : 1;

      state.antecedentes[tipo] = state.antecedentes[tipo].filter(
        (anteced) =>
          anteced.id_antecedente !== state.antecedenteActivo.id_antecedente
      );
    },

    onLoadAntecActivo: (state, { payload }) => {
      state.antecedenteActivo = {
        ...payload,
      };
    },

    changeRegisterErrorAnte: (state, { payload }) => {
      state.errorRegAntecedente = payload;
    },

    clearErrorMessageAnte: (state) => {
      state.errorRegAntecedente = { msg: "", error: "" };
    },

    onLoadFuturasCitas: (state, { payload }) => {
      state.futurasCitasList = payload;
    },
    changeErrorLoadFutCitas: (state, { payload }) => {
      state.errorLoadFutCitas = payload;
    },
  },
});

export const {
  changeTitleForm,
  onLoadPacActivo,
  onLoadPacientesList,
  onLoadPacientesListBusq,
  onSavePaciente,
  onUpdatePaciente,
  onDeletePaciente,
  changeRegisterError,
  clearErrorMessagePac,

  //
  onLoadAntecedentes,
  onLoadAntecActivo,
  onSaveAntecedente,
  onUpdateAntecedente,
  onDeleteAntecedente,
  changeRegisterErrorAnte,
  clearErrorMessageAnte,

  //
  onLoadFuturasCitas,
  changeErrorLoadFutCitas,
} = pacientesSlice.actions;
