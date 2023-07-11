import dentalSmileApi from "./dentalSmileApi";

export const getConsultas = async (id_pac, filtro, param1, param2) =>
  await dentalSmileApi.get(
    `/pacientes/${id_pac}/historial/${filtro}/${param1}/${param2}`
  );

export const getConsultaById = async (id_cons) =>
  await dentalSmileApi.get(`/consultas/${id_cons}/detalle/detalle`);

export const createConsulta = async (id_pac, consData) =>
  await dentalSmileApi.post(`/pacientes/${id_pac}/consultas/create`, consData);

export const updateConsulta = async (idCons, consData) =>
  await dentalSmileApi.put(`/consultas/${idCons}/update`, consData);

export const deleteConsulta = async (idCons) =>
  await dentalSmileApi.delete(`/consultas/${idCons}/delete`);

//Signos vitales

export const getSignosVitales = async (id_cons) =>
  await dentalSmileApi.get(`/consultas/${id_cons}/detalle/signosVitales`);

export const createSignosVitales = async (id_cons, signVit) =>
  await dentalSmileApi.post(
    `/consulta/${id_cons}/signos_vitales/create`,
    signVit
  );

export const updateSignosVitales = async (id_cons, id_sign, signVit) =>
  await dentalSmileApi.put(
    `/consulta/${id_cons}/signos_vitales/update/${id_sign}`,
    signVit
  );

//

// Examenes estomatognaticos
export const getExamenes = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/examenes`);

export const createExamen = async (id_cons, examen) =>
  await dentalSmileApi.post(`/consulta/${id_cons}/examen_esto/create`, examen);

export const updateExamen = async (id_exa, examen) =>
  await dentalSmileApi.put(`/examen_esto/update/${id_exa}`, examen);

export const deleteExamen = async (id_exa) =>
  await dentalSmileApi.delete(`/examen_esto/delete/${id_exa}`);

//

//Enfermedades CIE
export const getEnfermedadesCIE = async () =>
  await dentalSmileApi.get(`/enfermedades/_`);

//

//planes
export const getPlanes = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/planes`);

export const createPlan = async (id_cons, plan) =>
  await dentalSmileApi.post(`/consulta/${id_cons}/planes/create`, plan);

export const updatePlan = async (id_plan, plan) =>
  await dentalSmileApi.put(`/planes/update/${id_plan}`, plan);

export const deletePlan = async (id_plan) =>
  await dentalSmileApi.delete(`/planes/delete/${id_plan}`);

//

//diagnosticos
export const getDiagnosticos = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/diagnosticos`);

export const createDiagnostico = async (id_cons, diag) =>
  await dentalSmileApi.post(`/consulta/${id_cons}/diagnosticos/create`, diag);

export const updateDiagnostico = async (id_diag, diag) =>
  await dentalSmileApi.put(`/diagnosticos/update/${id_diag}`, diag);

export const deleteDiagnostico = async (id_diag) =>
  await dentalSmileApi.delete(`/diagnosticos/delete/${id_diag}`);

//

//pagos
export const getPagos = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/pagos`);

export const createPago = async (id_cons, pago) =>
  await dentalSmileApi.post(`/consulta/${id_cons}/pagos/create`, pago);

export const updatePago = async (id_pago, pago) =>
  await dentalSmileApi.put(`/pagos/update/${id_pago}`, pago);

export const deletePago = async (id_pago) =>
  await dentalSmileApi.delete(`/pagos/delete/${id_pago}`);

export const getSumPago = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/sum_pagos`);

//

//odontogramas
export const getOdontogramas = async (tipo, id_tipo) =>
  await dentalSmileApi.get(`/odontogramas/${tipo}/${id_tipo}`);

export const createOdontograma = async (id_cons, odontograma) =>
  await dentalSmileApi.post(
    `/consulta/${id_cons}/odontograma/create`,
    odontograma
  );

export const deleteOdontograma = async (id_odonto) =>
  await dentalSmileApi.delete(`/odontograma/delete/${id_odonto}`);

//

//piezas dentales
export const createPiezaDental = async (id_odonto, piezaDent) =>
  await dentalSmileApi.post(
    `/odontograma/${id_odonto}/pieza_dental/create`,
    piezaDent
  );

export const updatePiezaDental = async (id_pDent, pzaDental) =>
  await dentalSmileApi.put(
    `/odontograma/pieza_dental/update/${id_pDent}`,
    pzaDental
  );

export const deletePiezaDental = async (id_pDent) =>
  await dentalSmileApi.delete(`/odontograma/pieza_dental/delete/${id_pDent}`);

//

//salud bucal
export const getSaludBucal = async (id_consulta) =>
  await dentalSmileApi.get(`/salud_bucal/consulta/${id_consulta}`);

export const createSaludBucal = async (id_consulta, saludBucal) =>
  await dentalSmileApi.post(
    `/consulta/${id_consulta}/salud_bucal/create`,
    saludBucal
  );
export const updateSaludBucal = async (id_saludb, saludBucal) =>
  await dentalSmileApi.put(`/salud_bucal/update/${id_saludb}`, saludBucal);

//

//pieza salud bucal
export const createPzaSaludBucal = async (id_saludb, pzaSaludB) =>
  await dentalSmileApi.post(
    `/salud_bucal/${id_saludb}/pieza_dental/create`,
    pzaSaludB
  );
export const updatePzaSaludBucal = async (id_pDentalSb, pzaSaludB) =>
  await dentalSmileApi.put(
    `/salud_bucal/pieza_dental/update/${id_pDentalSb}`,
    pzaSaludB
  );

//

//recurso fotografico
export const getRecursosFoto = async (id_consulta) =>
  await dentalSmileApi.get(`/consulta/${id_consulta}/recursos`);

export const createRecursoFoto = async (id_consulta, recurso) =>
  await dentalSmileApi.post(`/consulta/${id_consulta}/recurso/create`, recurso);

export const updateRecursoFoto = async (id_recurso, recurso) =>
  await dentalSmileApi.put(`/recurso/update/${id_recurso}`, recurso);

export const deleteRecursoFoto = async (id_recurso) =>
  await dentalSmileApi.delete(`/recurso/delete/${id_recurso}`);

//

//fotos
export const createFotografia = async (id_recurso, foto) =>
  await dentalSmileApi.post(`/recurso/${id_recurso}/fotografia/create`, foto);

export const deleteFotografia = async (id_foto) =>
  await dentalSmileApi.delete(`/fotografia/delete/${id_foto}`);
