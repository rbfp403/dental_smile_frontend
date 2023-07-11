import dentalSmileApi from "./dentalSmileApi";

export const getCites = async (filtro, fechaIni, fechaFin) =>
  await dentalSmileApi.get(`/citas/${filtro}/${fechaIni}/${fechaFin}`);

export const createCita = async (cita) =>
  await dentalSmileApi.post("/createCita", cita);

export const updateCita = async (fecha, horaIni, cita) =>
  await dentalSmileApi.put(`/updateCita/${fecha}/${horaIni}`, cita);

export const deleteCita = async (fecha, horaIni) =>
  await dentalSmileApi.delete(`/deleteCita/${fecha}/${horaIni}`);
