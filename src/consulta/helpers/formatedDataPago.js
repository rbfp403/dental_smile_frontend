export const formatearDataPagoToBD = (pago) => {
  return {
    id_consulta: pago.id_consulta,
    text_ingreso: pago.pago_por,
    monto_ingreso: parseFloat(pago.monto),
    desc_ingreso: pago.desc_ingreso === undefined ? "" : pago.desc_ingreso,
    id_tratam_proced:
      pago.id_tratam_proced === undefined ? null : pago.id_tratam_proced,
  };
};

const columnEquivalentPago = {
  text_ingreso: "Pago por",
  desc_ingreso: "Descripción",
  monto_ingreso: "Monto",
};

export const comprobarErrorPago = (typeError) => {
  let msgError = "";
  if (
    typeError.includes("Data too long for column") ||
    typeError.includes("Out of range value")
  ) {
    let campo = "";
    for (const key in columnEquivalentPago) {
      if (typeError.includes(key)) {
        campo = columnEquivalentPago[key];
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
