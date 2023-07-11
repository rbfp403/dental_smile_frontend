import { invertDateFormat } from "../../agenda/helpers";

export const formatearDataTratamToTable = (tratamiento) => {
  return tratamiento.map((tratam) => {
    return {
      id: tratam.id_tratam,
      tratamiento: tratam.tratamiento === null ? "" : tratam.tratamiento,
      codigo: tratam.codigoCIE === null ? "" : tratam.codigoCIE,
      enfermedad:
        tratam.nombre_enfermedad === null ? "" : tratam.nombre_enfermedad,
      fecha: invertDateFormat(tratam.fecha_tratamiento),
    };
  });
};

export const formatearDataCompliToTable = (complicaciones) => {
  return complicaciones.map((comp) => {
    return {
      id: comp.id_compli,
      txt_compli: comp.txt_compli,
    };
  });
};

export const formatearDataProcedTratamToTable = (procedimientos) => {
  return procedimientos.map((proced) => {
    return {
      id: proced.id_tratam_proced,
      cod_proced: proced.cod_proced,
      nom_proced: proced.nom_proced,
    };
  });
};

export const formatearDataPrescToTable = (prescripciones) => {
  return prescripciones.map((presc) => {
    return {
      id: presc.id_presc,
      desc_presc: presc.desc_presc,
      dosi_presc: presc.dosi_presc,
    };
  });
};

export const formatDataTratamForm = (data) => {
  return data.map((data, index) => {
    return {
      id: index,
      ...data,
    };
  });
};

// export const formatearDataTratamToBD = (diag) => {
//   return {
//     codigoCIE: diag.codigoCIE === "" ? null : diag.codigoCIE,
//     tipo_diag: diag.presuntivo_definitivo,
//     desc_diag: diag.descripcion === "" ? null : diag.descripcion,
//   };
// };

// const columnEquivalentTratam = {
//   desc_diag: "Descripción",
// };

// export const comprobarErrorTratam = (typeError) => {
//   let msgError = "";
//   if (typeError.includes("Data too long for column")) {
//     let campo = "";
//     for (const key in columnEquivalentTratam) {
//       if (typeError.includes(key)) {
//         campo = columnEquivalentTratam[key];
//         break;
//       }
//     }
//     msgError = "Se excedió el límite en el campo " + campo;
//   } else {
//     msgError =
//       "Error: " +
//       typeError +
//       ". Para mas información contactese con el administrador";
//   }

//   return msgError;
// };
