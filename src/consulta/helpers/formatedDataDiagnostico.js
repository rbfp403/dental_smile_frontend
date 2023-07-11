export const formatearDataDiagToTable = (diagnosticos) => {
  return diagnosticos.map((diag) => {
    return {
      id: diag.id_diag,
      //
      enfermedad_diagnosticada:
        diag.nombre_enfermedad === null ? "" : diag.nombre_enfermedad,
      codigoCIE: diag.codigoCIE === null ? "" : diag.codigoCIE,
      presuntivo_definitivo: diag.tipo_diag,
      descripcion: diag.desc_diag === null ? "" : diag.desc_diag,
    };
  });
};

export const formatearDataDiagToBD = (diag) => {
  return {
    codigoCIE: diag.codigoCIE === "" ? null : diag.codigoCIE,
    tipo_diag: diag.presuntivo_definitivo,
    desc_diag: diag.descripcion === "" ? null : diag.descripcion,
  };
};

const columnEquivalentDiag = {
  desc_diag: "Descripción",
};

export const comprobarErrorDiag = (typeError) => {
  let msgError = "";
  if (typeError.includes("Data too long for column")) {
    let campo = "";
    for (const key in columnEquivalentDiag) {
      if (typeError.includes(key)) {
        campo = columnEquivalentDiag[key];
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
