import dentalSmileApi from "./dentalSmileApi";

export const getTratamientos = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/tratamientos`);

export const createTratamiento = async (id_cons, tratamData) =>
  await dentalSmileApi.post(
    `/consulta/${id_cons}/tratamiento/create`,
    tratamData
  );

export const updateTratamiento = async (id_tra, tratamData) =>
  await dentalSmileApi.put(`/tratamiento/update/${id_tra}`, tratamData);

export const deleteTratamiento = async (id_tra) =>
  await dentalSmileApi.delete(`/tratamiento/delete/${id_tra}`);

//

//complicaciones
export const createComplicacion = async (id_tratam, complData) =>
  await dentalSmileApi.post(
    `/tratamiento/${id_tratam}/complicacion/create`,
    complData
  );

export const updateComplicacion = async (id_comp, complData) =>
  await dentalSmileApi.put(`/complicacion/update/${id_comp}`, complData);

export const deleteComplicacion = async (id_comp) =>
  await dentalSmileApi.delete(`/complicacion/delete/${id_comp}`);

//

//Procedimientos de Tratamiento
export const createProcedTratam = async (id_tratam, procTratData) =>
  await dentalSmileApi.post(
    `/tratamiento/${id_tratam}/procedimiento/create`,
    procTratData
  );

export const deleteProcedTratam = async (id_pt) =>
  await dentalSmileApi.delete(`/tratamiento/procedimiento/delete/${id_pt}`);

//

//prescripciones

export const createPrescripcion = async (id_tratam, prescData) =>
  await dentalSmileApi.post(
    `/tratamiento/${id_tratam}/prescripcion/create`,
    prescData
  );

export const updatePrescripcion = async (id_presc, prescData) =>
  await dentalSmileApi.put(`/prescripcion/update/${id_presc}`, prescData);

export const deletePrescripcion = async (id_presc) =>
  await dentalSmileApi.delete(`/prescripcion/delete/${id_presc}`);
