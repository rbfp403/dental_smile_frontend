export const formatearDataTipConsToTable = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      id: data.id_tipoConsul,
      //
      tipo_de_consulta: data.tipo_tipoConsul,
      precio: parseFloat(data.prec_tipPago),
    };
  });
};
export const formatearDataTipConsBusq = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      id: data.id_tipoConsul,
      label: data.tipo_tipoConsul,
    };
  });
};

export const formatearDataTipConsToBD = (dataTipCons) => {
  return {
    tipo_tipoConsul: dataTipCons.tipo_de_consulta,
    prec_tipPago: parseFloat(dataTipCons.precio),
  };
};

const columnEquivalent = {
  tipo_tipoConsul: "Tipo de consulta",
  prec_tipPago: "Precio",
};

export const comprobarErrorTipCons = (typeError) => {
  let msgError = "";

  if (typeError.includes("tipoconsulta_tbl.tipo_consulta_UNIQUE")) {
    msgError = "El tipo de consulta ya fue registrado";
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
