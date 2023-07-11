export const formatearDataProcedToTable = (dataFromBD) =>
  dataFromBD.map((data) => {
    return {
      id: data.id_proced,
      //
      codigo: data.cod_proced === null ? "" : data.cod_proced,
      procedimiento: data.nom_proced,
      precio: parseFloat(data.prec_proced),
      descripcion: data.desc_proced === null ? "" : data.desc_proced,
    };
  });

export const formatearDataProcedToBD = (dataProced) => {
  return {
    cod_proced: dataProced.codigo === "" ? null : dataProced.codigo,
    nom_proced: dataProced.procedimiento,
    prec_proced: parseFloat(dataProced.precio),
    desc_proced: dataProced.descripcion === "" ? null : dataProced.descripcion,
  };
};

const columnEquivalent = {
  cod_proced: "Código",
  nom_proced: "Procedimiento",
  prec_tipPago: "Precio",
  desc_proced: "Descripción",
};

export const comprobarErrorProced = (typeError) => {
  let msgError = "";
  if (typeError.includes("procedimiento_tbl.index_codigoProced")) {
    msgError = "El código de este procedimiento ya fue registrado";
  } else if (typeError.includes("procedimiento_tbl.nom_proced_UNIQUE")) {
    msgError = "Este procedimiento ya fue registrado";
  } else if (
    typeError.includes("Data too long for column") ||
    typeError.includes("Out of range value")
  ) {
    let campo = "";
    for (const key in columnEquivalent) {
      if (typeError.includes(key)) {
        campo = columnEquivalent[key];
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

export const formatearDataTitulos = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      id: data.id_tituloProced,
      label: data.nom_tituloProced,
    };
  });
};

export const formatearDataSubtitulos = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      id: data.id_Proce,
      label: data.subti_Proce,
    };
  });
};

export const formatearDataProcedNomen = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      id: data.cod_nomProced,
      label: data.nombre_nomProced
        .split("\n")
        .join("")

        .replace(/\s+/g, " "),
    };
  });
};

export const formatearDataProcedRealizadosToTable = (dataFromBD) =>
  dataFromBD.map((data) => {
    return {
      id: data.id_tratam_proced,
      id_consulta: data.id_consulta,
      id_paciente: data.id_paciente,
      //
      fecha: data.Fecha,
      procedimiento: data.Procedimiento,
      paciente: data.Paciente,
      consulta: data.Consulta,
      tratamiento: data.Tratamiento,
      pago: data.Ingreso ? parseFloat(data.Ingreso) : "",
    };
  });
