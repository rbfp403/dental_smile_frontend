export const formatearDataExamenToTable = (examenes) => {
  return examenes.map((exam) => {
    return {
      id: exam.id_examEst,
      codigoCIE: exam.codigoCIE === null ? "" : exam.codigoCIE,
      nombre_enfermedad: exam.nombre_enfermedad,
      region_afectada: exam.regionAfec_examEst,
      enfermedad:
        exam.codigoCIE === null
          ? ""
          : exam.codigoCIE + " - " + exam.nombre_enfermedad,
      descripcion: exam.desc_examEst === null ? "" : exam.desc_examEst,
    };
  });
};

export const formatearDataExamenToBD = (examen) => {
  return {
    regionAfec_examEst: examen.region_afectada,
    codigoCIE: examen.codigoCIE === "" ? null : examen.codigoCIE,
    desc_examEst: examen.descripcion === "" ? null : examen.descripcion,
  };
};

const columnEquivalentExamen = {
  desc_examEst: "Descripción",
};

export const comprobarErrorExamen = (typeError) => {
  let msgError = "";
  if (typeError.includes("Data too long for column")) {
    let campo = "";
    for (const key in columnEquivalentExamen) {
      if (typeError.includes(key)) {
        campo = columnEquivalentExamen[key];
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

export const formatearDataEnferCieList = (enfermedades) => {
  return enfermedades.map((enferCie) => {
    return {
      id: enferCie.codigoCIE,
      label: enferCie.nombre_enfermedad,
    };
  });
};
