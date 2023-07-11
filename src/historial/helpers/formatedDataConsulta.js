export const formatedDataConsulta = (consultas) => {
  return consultas.map((cons) => {
    return {
      ...cons,
      fecha_consulta_date: new Date(cons.fecha_consulta.replaceAll("-", "/")),
      hora_consulta_date: new Date(
        Date.parse(cons.fecha_consulta + " " + cons.hora_consulta + ":00")
      ),
    };
  });
};

export const formatearDataConsToBD = (dataConsulta) => {
  return {
    mot_consulta: dataConsulta.stateMotivo,
    probleAct_consulta: dataConsulta.stateProbl,
    fecha_consulta:
      dataConsulta.stateDatePicker
        .toLocaleString("sv-SE", { hour12: false })
        .split(" ")[0] +
      " " +
      dataConsulta.stateTimeIni
        .toLocaleString("sv-SE", { hour12: false })
        .split(" ")[1],

    hora_consulta: dataConsulta.stateTimeIni
      .toLocaleString("sv-SE", { hour12: false })
      .split(" ")[1]
      .substring(0, 5),
    id_tipoConsul: dataConsulta.id_tipoConsulta,
  };
};

const columnEquivalentCons = {
  probleAct_consulta: "Problema Actual",
  mot_consulta: "Motivo de consulta",
};

const columnEquivalentSignVit = {
  temp_signoVital: "Temperatura",
  presArt_signoVital: "Presión arterial",
  freCar_signoVital: "Frecuencia cardíaca",
  freRes_signoVital: "Frecuencia respiratoria",
};

export const comprobarErrorCons = (typeError) => {
  let msgError = "";
  if (typeError.includes("Data too long for column")) {
    let campo = "";
    for (const key in columnEquivalentCons) {
      if (typeError.includes(key)) {
        campo = columnEquivalentCons[key];
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

export const comprobarErrorSignVit = (typeError) => {
  let msgError = "";
  if (typeError.includes("Data too long for column")) {
    let campo = "";
    for (const key in columnEquivalentSignVit) {
      if (typeError.includes(key)) {
        campo = columnEquivalentSignVit[key];
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
