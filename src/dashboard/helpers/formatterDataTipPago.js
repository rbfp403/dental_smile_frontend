export const formatearDataTipPagoToTable = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      id: data.id_tipPago,
      //
      tipo_de_pago: data.desc_tipPago,
      precio: parseFloat(data.prec_tipPago),
    };
  });
};

export const formatearDataTipPagoToBD = (dataTipPago) => {
  return {
    desc_tipPago: dataTipPago.tipo_de_pago,
    prec_tipPago: parseFloat(dataTipPago.precio),
  };
};

const columnEquivalent = {
  desc_tipPago: "Tipo de pago",
  prec_tipPago: "Precio",
};

export const comprobarErrorTipPago = (typeError) => {
  let msgError = "";

  if (typeError.includes("tipopago_tbl.desc_tipPago_UNIQUE")) {
    msgError = "El tipo de pago ya fue registrado";
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
