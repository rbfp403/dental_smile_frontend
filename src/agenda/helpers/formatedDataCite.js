export const formatedDataCite = (citas) => {
  return citas.map((cita, index) => {
    const fechaHoraCita = cita.fecha + " " + cita.hora + ":00";
    return {
      start: new Date(Date.parse(fechaHoraCita)),
      end: new Date(Date.parse(cita.fecha + " " + cita.hora_fin + ":00")),
      fechaHoraCita,
      hora_fin: cita.hora_fin,
      id_paciente: cita.id_paciente,
      id: index,
      cuando: cita.cuando,
      hora: cita.hora,
      fecha: cita.fecha,
      paciente: cita.paciente,
      telefono: cita.telefono,
      edad: cita.eda_paciente,
      motivo: cita.motivo,
      estado: cita.estado,
    };
  });
};

// new Date('2023-06-03T16:15:00.000Z') -->   '2023-06-03'
export const formatearDataCiteToBD = (dataCita) => {
  return {
    fecha_citaAgen: dataCita.stateDatePicker
      .toLocaleString("sv-SE", { hour12: false })
      .split(" ")[0],

    horaIni_citaAgen: dataCita.stateTimeIni
      .toLocaleString("sv-SE", { hour12: false })
      .split(" ")[1]
      .substring(0, 5),
    horaFin_citaAgen: dataCita.stateTimeFin
      .toLocaleString("sv-SE", { hour12: false })
      .split(" ")[1]
      .substring(0, 5),
    id_paciente: dataCita.statePacList,
    moti_citaAgen: dataCita.stateMotivo,
    esta_citaAgen: "Pendiente",
  };
};

export const comprobarErrorCite = (typeError) => {
  let msgError = "";

  if (
    typeError.includes("Duplicate entry") &&
    typeError.includes("citaAgendada_tbl.PRIMARY")
  ) {
    msgError = "Ya existe una cita registrada en la misma hora de inicio.";
  } else if (typeError.includes("Data too long for column")) {
    msgError = "Se excedió el límite en el campo motivo de consulta";
  } else {
    msgError =
      "Error: " +
      typeError +
      ". Para mas información contactese con el administrador";
  }

  return msgError;
};

// (new Date('2023-06-04T16:00:00.000Z'),new Date('2023-06-05T16:00:00.000Z'))
//   new Date('2023-06-05T18:00:00.000Z')
export const retornarHourWithNewDate = (state, newValue) => {
  return new Date(
    Date.parse(
      newValue
        .toLocaleString("sv-SE", { hour12: false })
        .split(" ")[0]
        .replaceAll("-", "/") +
        " " +
        state.toLocaleString("sv-SE", { hour12: false }).split(" ")[1]
    )
  );
};

// new Date('2023-06-05T04:59:59.000Z') -->   '2023/05/29'
export const extraerFecha = (fecha) => {
  const fechaConvertida =
    String(fecha.getFullYear()) +
    "/" +
    String(fecha.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(fecha.getDate()).padStart(2, "0");
  return fechaConvertida;
};

export const arrMes = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

// 2024/06/13 --> junio_2024
export const extractMesAnio = (fecha) => {
  return (
    [arrMes[new Date(fecha).getMonth()]] + "_" + new Date(fecha).getFullYear()
  );
};
// 4 --> "04"
export const addZeroStr = (mes) => {
  return mes.toString().padStart(2, "0");
};

// new Date('2023-05-30T08:02:09.000Z') --> Martes, 30 de mayo de 2023
export const DiaActualFormated = (today) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // options.timeZone = "UTC";
  // options.timeZoneName = "short";

  return today.toLocaleString("es-ES", options);

  /*
    Resultado: Monday, January 27, 2020, UTC
*/
};
// 2022-06-22 --> 22/06/2022
export const invertDateFormat = (fechaStr) => {
  if (fechaStr) {
    return fechaStr.split("-").reverse().join("/");
  } else {
    return "";
  }
};

// new Date('2023-06-05T04:59:59.000Z') -->   '2023-05-29'
export const extraerFecha2 = (fecha) => {
  return fecha.toLocaleString("sv-SE", { hour12: false }).split(" ")[0];
};
