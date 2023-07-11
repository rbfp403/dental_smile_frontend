export const formatearDataGastosToTable = (dataFromBD) =>
  dataFromBD
    .map((data) => {
      return {
        id: data.id_gasto,
        //
        desc: data.desc_gasto,
        monto: parseFloat(data.monto_gasto),
        fecha: data.fecha_gasto,
        fecha_upd: data.fecha_modificacion,
      };
    })
    .sort((a, b) => a.fecha - b.fecha);

export const formatearDataGastoToBD = (dataGasto) => {
  return {
    desc_gasto: dataGasto.desc,
    monto_gasto: parseFloat(dataGasto.monto),
  };
};

const columnEquivalentGasto = {
  monto_gasto: "Monto",
  desc_gasto: "Descripción",
};

export const comprobarErrorGasto = (typeError) => {
  let msgError = "";
  if (
    typeError.includes("Data too long for column") ||
    typeError.includes("Out of range value")
  ) {
    let campo = "";
    for (const key in columnEquivalentGasto) {
      if (typeError.includes(key)) {
        campo = columnEquivalentGasto[key];
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
