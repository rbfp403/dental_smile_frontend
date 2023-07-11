import dentalSmileApi from "./dentalSmileApi";

export const getPanelData = async (panel, tipo, param_fechaIni, fechaFin) =>
  await dentalSmileApi.get(
    `/administracion/panel/${panel}/${tipo}/${param_fechaIni}/${fechaFin}`
  );

export const getGananciasData = async (
  tipGan,
  tipo,
  param_fechaIni,
  fechaFin
) =>
  await dentalSmileApi.get(
    `/administracion/ganancias/${tipGan}/${tipo}/${param_fechaIni}/${fechaFin}`
  );

//tipo de pagos
export const getTipoDePago = async (tipPago) =>
  await dentalSmileApi.get(`/administracion/tiposPago/${tipPago}/_`);

export const createTipoPago = async (pago) =>
  await dentalSmileApi.post("/administracion/tiposPago/create", pago);

export const updateTipoPago = async (id_tpago, pago) =>
  await dentalSmileApi.put(
    `/administracion/tiposPago/update/${id_tpago}`,
    pago
  );
export const deleteTipoPago = async (id_tpago) =>
  await dentalSmileApi.delete(`/administracion/tiposPago/delete/${id_tpago}`);

//tipos de consulta
export const getTipoDeCons = async () =>
  await dentalSmileApi.get(`/administracion/tiposConsulta/todos/_`);

export const createTipoCons = async (tipCons) =>
  await dentalSmileApi.post("/administracion/tiposConsulta/create", tipCons);

export const updateTipoCons = async (id_tcons, tipCons) =>
  await dentalSmileApi.put(
    `/administracion/tiposConsulta/update/${id_tcons}`,
    tipCons
  );
export const deleteTipoCons = async (id_tcons) =>
  await dentalSmileApi.delete(
    `/administracion/tiposConsulta/delete/${id_tcons}`
  );

//tipos de tratamientos
export const getTipoDeTratam = async (param1, param2) =>
  await dentalSmileApi.get(
    `/administracion/tiposTratamiento/${param1}/${param2}`
  );

export const createTipoTratam = async (tipTratam) =>
  await dentalSmileApi.post(
    "/administracion/tiposTratamiento/create",
    tipTratam
  );

export const updateTipoTratam = async (id_trat, tipTratam) =>
  await dentalSmileApi.put(
    `/administracion/tiposTratamiento/update/${id_trat}`,
    tipTratam
  );
export const deleteTipoTratam = async (id_trat) =>
  await dentalSmileApi.delete(
    `/administracion/tiposTratamiento/delete/${id_trat}`
  );

//tipos de procedimientos
export const getAllProcedimientos = async () =>
  await dentalSmileApi.get(`/administracion/procedimientos/get/todos/_`);

export const createProcedimiento = async (proced) =>
  await dentalSmileApi.post("/administracion/procedimientos/create", proced);

export const updateProcedimiento = async (id_proced, proced) =>
  await dentalSmileApi.put(
    `/administracion/procedimientos/update/${id_proced}`,
    proced
  );
export const deleteProcedimiento = async (id_proced) =>
  await dentalSmileApi.delete(
    `/administracion/procedimientos/delete/${id_proced}`
  );

//titulos procedimientos
export const getTitulos = async () =>
  await dentalSmileApi.get(`/administracion/procedimientos/busqueda/titulos/_`);

//subtitulos procedimientos
export const getSubtitulos = async (id_titulo) =>
  await dentalSmileApi.get(
    `/administracion/procedimientos/busqueda/subtitulos/${id_titulo}`
  );

//procedimientos nomenclatura
export const getProcedNomen = async (ti_subti, id_titSubti) =>
  await dentalSmileApi.get(
    `/administracion/procedimientos/busqueda/${ti_subti}/${id_titSubti}`
  );

//buscarProced
export const getProcedBusqueda = async () =>
  await dentalSmileApi.get(`/administracion/procedimientos/busqueda/_`);

export const getAllDataProced = async (cod) =>
  await dentalSmileApi.get(
    `/administracion/procedimientos/busqueda/tsnom_proced/${cod}`
  );

//

//ingresos
export const getAllingresos = async (fil_tipo, fil_fecha, prm1, prm2) =>
  await dentalSmileApi.get(
    `/administracion/lista_ingresos/${fil_tipo}/${fil_fecha}/${prm1}/${prm2}/_`
  );

export const createIngreso = async (ingreso) =>
  await dentalSmileApi.post("/administracion/lista_ingresos/create", ingreso);

export const updateIngreso = async (id_ingreso, ingreso) =>
  await dentalSmileApi.put(
    `/administracion/lista_ingresos/update/${id_ingreso}`,
    ingreso
  );
export const deleteIngreso = async (id_ingreso) =>
  await dentalSmileApi.delete(
    `/administracion/lista_ingresos/delete/${id_ingreso}`
  );

//

//gastos
export const getAllGastos = async (fil_fecha, prm1, prm2) =>
  await dentalSmileApi.get(
    `/administracion/lista_gastos/${fil_fecha}/${prm1}/${prm2}`
  );

export const createGasto = async (gasto) =>
  await dentalSmileApi.post("/administracion/lista_gastos/create", gasto);

export const updateGasto = async (id_gasto, gasto) =>
  await dentalSmileApi.put(
    `/administracion/lista_gastos/update/${id_gasto}`,
    gasto
  );
export const deleteGasto = async (id_gasto) =>
  await dentalSmileApi.delete(
    `/administracion/lista_gastos/delete/${id_gasto}`
  );
