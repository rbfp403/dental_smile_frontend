import dentalSmileApi from "./dentalSmileApi";

export const getAllPaciente = async () =>
  await dentalSmileApi.get("/getPacientes");

export const createPaciente = async (paciente) =>
  await dentalSmileApi.post("/createPaciente", paciente);

export const updatePaciente = async (id_pac, paciente) =>
  await dentalSmileApi.put(`/updatePaciente/${id_pac}`, paciente);

export const deletePaciente = async (id_pac) =>
  await dentalSmileApi.delete(`/deletePaciente/${id_pac}`);

export const getPacienteById = async (id_pac) =>
  await dentalSmileApi.get(`/paciente/${id_pac}`);

//
//antecedentes
export const getAntecedentes = async (id_pac, tipoAnt) =>
  await dentalSmileApi.get(`/paciente/${id_pac}/getAntecedentes/${tipoAnt}`);

export const createAntecedente = async (id_pac, antecedente) =>
  await dentalSmileApi.post(
    `/paciente/${id_pac}/createAntecedente`,
    antecedente
  );

export const updateAntecedente = async (idAnt, antecedente) =>
  await dentalSmileApi.put(`/paciente/updateAntecedente/${idAnt}`, antecedente);

export const deleteAntecedente = async (idAnt) =>
  await dentalSmileApi.delete(`/paciente/deleteAntecedente/${idAnt}`);

//
//futuras citas
export const getFuturasCitas = async (idPac, estadoCit, fechaIni, fechaFin) =>
  await dentalSmileApi.get(
    `/pacientes/${idPac}/citas/${estadoCit}/${fechaIni}/${fechaFin}`
  );
