export const formatearDataPacToBD = (data) => {
  return {
    // id_paciente: data.id,
    priNom_paciente: data.erNombre.trim(),
    segNom_paciente: data.doNombre.trim() === "" ? null : data.doNombre.trim(),
    priApe_paciente: data.erApellido.trim(),
    segApe_paciente:
      data.doApellido.trim() === "" ? null : data.doApellido.trim(),
    ced_paciente: data.cedula.trim(),
    eda_paciente:
      typeof data.edad === "string" ? parseInt(data.edad.trim()) : data.edad,
    sex_paciente: data.sexo.trim(),
    tel_paciente: data.telefono.trim() === "" ? null : data.telefono.trim(),
    ema_paciente: data.email.trim() === "" ? null : data.email.trim(),
    nomRes_paciente: data.nomRes.trim() === "" ? null : data.nomRes.trim(),
    parRes_paciente: data.parRes.trim() === "" ? null : data.parRes.trim(),
    telRes_paciente: data.telRes.trim() === "" ? null : data.telRes.trim(),
  };
};

const columnEquivalent = {
  priNom_paciente: "1er Nombre",
  eda_paciente: "Edad",
  segNom_paciente: "2do Nombre",
  priApe_paciente: "1er Apellido",
  segApe_paciente: "2do Apellido",
  ema_paciente: "Email",
  nomRes_paciente: "Nombre del familiar",
  parRes_paciente: "Parenteso",
  telRes_paciente: "Teléfono familiar",
};

export const comprobarError = (typeError) => {
  let msgError = "";
  if (typeError.includes("paciente_tbl.ced_paciente_UNIQUE")) {
    msgError = "El número de cédula ya fue registrado";
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

const formatearNombre = (pri, seg) => {
  let nombres = pri;
  if (seg !== null) {
    nombres += " " + seg;
  }
  return nombres;
};

const formatearRes = (nom, parent, telres) => {
  let responsable = "";

  if (nom !== null) {
    responsable += nom;
  }
  if (parent !== null) {
    responsable += " - " + parent;
  }
  if (telres !== null) {
    responsable += " - " + telres;
  }

  return responsable;
};
export const formatearDataPacToTable = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      id: data.id_paciente,
      erNombre: data.priNom_paciente,
      doNombre: data.segNom_paciente,
      erApellido: data.priApe_paciente,
      doApellido: data.segApe_paciente,
      nomRes: data.nomRes_paciente,
      parRes: data.parRes_paciente,
      telRes: data.telRes_paciente,
      fecha_upd: data.update_paciente,
      //

      nombre:
        `${formatearNombre(data.priNom_paciente, data.segNom_paciente)}` +
        ` ${formatearNombre(data.priApe_paciente, data.segApe_paciente)}`,

      cedula: data.ced_paciente,
      edad: data.eda_paciente,
      sexo: data.sex_paciente,
      telefono: data.tel_paciente,
      email: data.ema_paciente,
      responsable: formatearRes(
        data.nomRes_paciente,
        data.parRes_paciente,
        data.telRes_paciente
      ),
      fecha: data.create_paciente,
    };
  });
};

export const formatearDataPacToBusList = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      label:
        `${formatearNombre(data.priNom_paciente, data.segNom_paciente)}` +
        ` ${formatearNombre(data.priApe_paciente, data.segApe_paciente)}` +
        " - " +
        data.ced_paciente,
      id: data.id_paciente,
    };
  });
};

export const formatearPacActiveToForm = (pacActive) => {
  return {
    id: pacActive.id,
    cedula: pacActive.cedula,
    edad: pacActive.edad,
    sexo: pacActive.sexo,
    erNombre: pacActive.erNombre,
    doNombre: !pacActive.doNombre ? "" : pacActive.doNombre,
    erApellido: pacActive.erApellido,
    doApellido: !pacActive.doApellido ? "" : pacActive.doApellido,
    telefono: !pacActive.telefono ? "" : pacActive.telefono,
    email: !pacActive.email ? "" : pacActive.email,
    nomRes: !pacActive.nomRes ? "" : pacActive.nomRes,
    parRes: !pacActive.parRes ? "" : pacActive.parRes,
    telRes: !pacActive.telRes ? "" : pacActive.telRes,
  };
};

export const formatearDataAntecedToTable = (dataFromBD) => {
  return dataFromBD.map((data) => {
    return {
      id_antecedente: data.id_antecedente,
      id_paciente: data.id_paciente,
      //
      par_antecedente: data.par_antecedente,
      //
      tip_antecedente: data.tip_antecedente,
      des_antecedente: data.des_antecedente,
    };
  });
};

const columnEquivalentAnteced = {
  par_antecedente: "Parentesco",
  tip_antecedente: "Tipo de antecedente",
  des_antecedente: "Descripción",
};

export const comprobarErrorAnteced = (typeError) => {
  let msgError = "";
  if (typeError.includes("Data too long for column")) {
    let campo = "";
    for (const key in columnEquivalentAnteced) {
      if (typeError.includes(key)) {
        campo = columnEquivalentAnteced[key];
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
