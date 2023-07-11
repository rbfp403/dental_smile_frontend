export const formatearDataPlanDiagToTable = (planes) => {
  return planes.map((plan) => {
    return {
      id: plan.id_planDiag,
      tipoPlan: plan.tipo_planDiag,
      examen_solicitado: plan.exam_planDiag === null ? "" : plan.exam_planDiag,
      descripcion: plan.desc_planDiag === null ? "" : plan.desc_planDiag,
    };
  });
};

export const formatearDataPlanTeraToTable = (planes) => {
  return planes.map((plan) => {
    return {
      id: plan.id_planDiag,
      tipoPlan: plan.tipo_planDiag,
      id_tipoTratam: plan.id_tipoTratam,
      tipo_de_tratamiento:
        plan.tipo_tipoTratam === null ? "" : plan.tipo_tipoTratam,
      tratamiento:
        plan.tratam_tipoTratam === null ? "" : plan.tratam_tipoTratam,
      descripcion: plan.desc_planDiag === null ? "" : plan.desc_planDiag,
    };
  });
};

export const formatearDataPlanEduToTable = (planes) => {
  return planes.map((plan) => {
    return {
      id: plan.id_planDiag,
      tipoPlan: plan.tipo_planDiag,
      descripcion: plan.desc_planDiag === null ? "" : plan.desc_planDiag,
    };
  });
};

export const formatearDataPlanToBD = (plan) => {
  return {
    tipo_planDiag: plan.tipPlan,
    exam_planDiag: plan.examen === "" ? null : plan.examen,
    id_tipoTratam: plan.id_trata === "" ? null : plan.id_trata,
    desc_planDiag: plan.descripcion === "" ? null : plan.descripcion,
  };
};

const columnEquivalentPlan = {
  desc_examEst: "Descripción",
};

export const comprobarErrorPlan = (typeError) => {
  let msgError = "";
  if (typeError.includes("Data too long for column")) {
    let campo = "";
    for (const key in columnEquivalentPlan) {
      if (typeError.includes(key)) {
        campo = columnEquivalentPlan[key];
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

export const tipoPlanesArr = ["Diagnóstico", "Terapéutico", "Educacional"];

export const formatearDataPlan = (tipPlan, dataPlan) => {
  switch (tipPlan) {
    case 0:
      return formatearDataPlanDiagToTable([dataPlan])[0];

    case 1:
      return formatearDataPlanTeraToTable([dataPlan])[0];

    default:
      return formatearDataPlanEduToTable([dataPlan])[0];
  }
};
