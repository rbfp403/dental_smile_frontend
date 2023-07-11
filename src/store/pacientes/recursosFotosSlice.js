import { createSlice } from "@reduxjs/toolkit";

export const recursosFotosSlice = createSlice({
  name: "recursosFotos",

  initialState: {
    recursosList: [],
    recursoActivo: null,
    errorMsgRegRecurso: { msg: "", error: "" },
  },

  reducers: {
    onLoadRecursoList: (state, { payload }) => {
      state.recursosList = payload;
    },

    onSetActiveRecurso: (state, { payload }) => {
      state.recursoActivo = payload;
    },
    onSaveRecurso: (state, { payload }) => {
      state.recursosList.unshift(payload);
    },
    onUpdateRecurso: (state, { payload }) => {
      state.recursosList = state.recursosList.map((recurso) => {
        if (recurso.id_recurso === payload.id_recurso) {
          return payload;
        }
        return recurso;
      });
    },

    onDeleteRecurso: (state) => {
      state.recursosList = state.recursosList.filter(
        (recurso) => recurso.id_recurso !== state.recursoActivo.id_recurso
      );

      state.recursoActivo = null;
    },

    onChangeRegErrRecurso: (state, { payload }) => {
      state.errorMsgRegRecurso = payload;
    },

    clearErrorRegRecurso: (state) => {
      state.errorMsgRegRecurso = { msg: "", error: "" };
    },
  },
});

export const {
  onLoadRecursoList,
  onSetActiveRecurso,
  onSaveRecurso,
  onUpdateRecurso,
  onDeleteRecurso,
  onChangeRegErrRecurso,
  clearErrorRegRecurso,
} = recursosFotosSlice.actions;
