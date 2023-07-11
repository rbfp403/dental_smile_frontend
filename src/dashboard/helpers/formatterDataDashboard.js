import { endOfWeek, startOfWeek } from "date-fns";
import { DiaActualFormated, arrMes, extraerFecha } from "../../agenda/helpers";

export const switchDataDashboard = (tipo, param_fechaIni, fechaFin) => {
  let parametroBusq = "";
  const today = new Date();

  //
  switch (tipo) {
    case "dia_act":
      let dia = DiaActualFormated(today);
      parametroBusq =
        "en este día " + dia.charAt(0).toUpperCase() + dia.slice(1);
      break;

    case "sem_act":
      parametroBusq = `en esta semana ${extraerFecha(
        startOfWeek(today, { weekStartsOn: 1 })
      )} - ${extraerFecha(endOfWeek(today, { weekStartsOn: 1 }))}`;
      break;

    case "mes_act":
      let mesAct = `${arrMes[today.getMonth()]}`;
      parametroBusq = `en este mes ${
        mesAct.charAt(0).toUpperCase() + mesAct.slice(1)
      } ${today.getFullYear()}`;
      break;

    case "ani_act":
      parametroBusq = `en este año  ${today.getFullYear()}`;
      break;

    case "mes":
      let mes = arrMes[parseInt(param_fechaIni.slice(4, 6)) - 1];
      parametroBusq = `en ${
        mes.charAt(0).toUpperCase() + mes.slice(1)
      } ${param_fechaIni.slice(0, 4)} `;
      break;

    case "anio":
      parametroBusq = `en el ${param_fechaIni}`;
      break;

    case "range":
      parametroBusq = `desde: ${param_fechaIni.split(" ")[0]} hasta: ${
        fechaFin.split(" ")[0]
      }`;
      break;
    default:
      break;
  }
  return parametroBusq;
};
