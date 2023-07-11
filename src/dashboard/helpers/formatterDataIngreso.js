export const formatearDataConsIngToTable = (dataFromBD) =>
  dataFromBD.map((data) => {
    return {
      id: data.id_consulta,
      id_paciente: data.id_paciente,
      pagos: formatearDataIngresosToTable(data.pagos),
      //

      fecha:
        data.fecha_consulta.replaceAll("-", "/") +
        " " +
        data.hora_consulta +
        ":00",
      paciente: data.Paciente,
      tipo_consulta: data.tipo_tipoConsul,
      motivo: data.mot_consulta,
      problema: data.probleAct_consulta,
      total: data.pagos.reduce((acc, pagoAct) => {
        return acc + parseFloat(pagoAct.monto);
      }, 0),
    };
  });

export const formatearDataIngresosToTable = (dataFromBD) =>
  dataFromBD
    .map((data) => {
      return {
        id: data.id_ingreso,
        //
        ingreso_por: data.pago_por,
        monto: parseFloat(data.monto),
        nota: data.desc_ingreso,
        fecha: data.fecha_create,
        fecha_upd: data.fecha_update,
      };
    })
    .sort((a, b) => a.fecha - b.fecha);

export const formatearDataIngresosToTableGan = (dataFromBD) =>
  dataFromBD
    .map((data) => {
      return {
        id: data.id_ingreso,
        id_paciente: data.id_paciente,
        id_consulta: data.id_consulta,
        //
        ingreso_por: data.pago_por,
        monto: parseFloat(data.monto),
        nota: data.desc_ingreso,
        fecha: data.fecha_create,
        fecha_upd: data.fecha_update,
      };
    })
    .sort((a, b) => a.fecha - b.fecha);

export const formatearDataIngresoToBD = (dataIngreso) => {
  return {
    id_consulta: null,
    text_ingreso: dataIngreso.text_ingreso,
    desc_ingreso: dataIngreso.desc_ingreso,
    monto_ingreso: parseFloat(dataIngreso.monto_ingreso.toFixed(2)),
    id_tratam_proced: null,
  };
};

const columnEquivalentIngreso = {
  text_ingreso: "Ingreso por",
  desc_ingreso: "Descripción",
  monto_ingreso: "Monto",
};

export const comprobarErrorIngreso = (typeError) => {
  let msgError = "";
  if (
    typeError.includes("Data too long for column") ||
    typeError.includes("Out of range value")
  ) {
    let campo = "";
    for (const key in columnEquivalentIngreso) {
      if (typeError.includes(key)) {
        campo = columnEquivalentIngreso[key];
        break;
      }
    }
    msgError = "Se excedió el límite en el campo " + campo;
  } else {
    msgError =
      "Error: " +
      typeError +
      ". Para mas información contactese con el administrador";
  }

  return msgError;
};
