export const formatearDataTipTratamToTable = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      id: data.id_tipoTratam,
      //
      tipo_de_tratamiento: data.tipo_tipoTratam,
      tratamiento: data.tratam_tipoTratam,
    };
  });
};

export const formatearDataTipTratamToBD = (dataTipTratam) => {
  return {
    tipo_tipoTratam: dataTipTratam.tipo_de_tratamiento,
    tratam_tipoTratam: dataTipTratam.tratamiento,
  };
};

const columnEquivalent = {
  tipo_tipoTratam: "Tipo de tratamiento",
  tratam_tipoTratam: "Tratamiento",
};

export const comprobarErrorTipTratam = (typeError) => {
  let msgError = "";
  if (
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
