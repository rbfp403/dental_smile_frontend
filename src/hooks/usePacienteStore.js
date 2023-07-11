import { useDispatch, useSelector } from "react-redux";
import {
  changeErrorLoadFutCitas,
  changeRegisterError,
  changeTitleForm,
  clearErrorMessagePac,
  onDeletePaciente,
  onLoadFuturasCitas,
  onLoadPacActivo,
  onLoadPacientesList,
  onLoadPacientesListBusq,
  onSavePaciente,
  onUpdatePaciente,
} from "../store";
import {
  getAllPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente,
  getPacienteById,
  getFuturasCitas,
} from "../api/pacientes.api";

import {
  comprobarError,
  formatearDataPacToBD,
  formatearDataPacToBusList,
  formatearDataPacToTable,
} from "../pacientes/helpers";
import { extractMesAnio, formatedDataCite } from "../agenda/helpers";

//
//
//
//

export const usePacienteStore = () => {
  //

  const dispatch = useDispatch();

  const {
    pacientesList,
    pacientesListBusq,
    isFormPacOpen,
    titleForm,
    pacienteActivo,
    errorMsgRegPac,
    futurasCitasList,
    errorLoadFutCitas,
  } = useSelector((state) => state.pacientes);

  const changeTitleFormReg = (title) => {
    dispatch(changeTitleForm(title));
  };

  const changeDataPaciente = (dataPac) => {
    dispatch(onLoadPacActivo(dataPac));
  };

  const startLoadPacientes = async () => {
    try {
      const { data } = await getAllPaciente();

      dispatch(onLoadPacientesList(formatearDataPacToTable(data)));

      dispatch(onLoadPacientesListBusq(formatearDataPacToBusList(data)));
    } catch (error) {
      console.log("Error cargando lista de pacientes");
      console.log(error);
    }
  };

  const startLoadPaciente = async (id) => {
    try {
      const { data } = await getPacienteById(id);

      dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
    } catch (error) {
      console.log("Error cargando datos del paciente por ID");
      console.log(error);
    }
  };

  const startSavingPaciente = async (dataPaciente) => {
    dispatch(clearErrorMessagePac());

    try {
      if (dataPaciente.id) {
        //actualizando
        const { data } = await updatePaciente(
          dataPaciente.id,
          formatearDataPacToBD(dataPaciente)
        );

        dispatch(onUpdatePaciente(formatearDataPacToTable([data])[0]));
        dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
      } else {
        //registrando
        const { data } = await createPaciente(
          formatearDataPacToBD(dataPaciente)
        );

        dispatch(onSavePaciente(formatearDataPacToTable([data])[0]));
        dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
      }

      dispatch(changeRegisterError({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterError({
          msg: "Hay errores",
          error: comprobarError(error.response.data.message),
        })
      );
    }
  };

  const startDeletingPaciente = async (id_paciente = []) => {
    try {
      if (id_paciente.length === 0) {
        await deletePaciente(pacienteActivo.id);
      } else {
        for (const i of id_paciente) {
          await deletePaciente(i);
        }
      }
      dispatch(onDeletePaciente(id_paciente));
    } catch (error) {
      console.log(error);
    }
  };

  const startLoadFuturasCitas = async (estadoCit, fechaIni, fechaFin) => {
    try {
      const { data } = await getFuturasCitas(
        pacienteActivo.id,
        estadoCit,
        fechaIni,
        fechaFin
      );

      let arrayCitesMonth = [];

      const arrMesAnio = [];

      //1er bucle
      //para crear los elementos objetos del array, cuya unica llave es el nombre del mes + el año,
      // se usa un array para controlar que no se repitan los meses
      data.forEach((fecha) => {
        const nameMesAnio = extractMesAnio(fecha.fecha);

        if (!arrMesAnio.includes(nameMesAnio)) {
          arrMesAnio.push(nameMesAnio);
          arrayCitesMonth.push({ [nameMesAnio]: [] });
        }
      });

      let iterator = 0;
      // let mesTemporal = Object.keys(arrayCitesMonth[0])[0];

      //2do bucle
      //Buscar extraer mes de la consulta para que coincida con los objetos del primer bucle
      //buscar la ubicacion del array donde esta el objeto con la llave mes_año
      data.forEach((fecha) => {
        const nameMesAnio = extractMesAnio(fecha.fecha);

        arrayCitesMonth.forEach((element, index) => {
          if (Object.keys(element)[0] === nameMesAnio) {
            iterator = index;
            return;
          }
        });

        arrayCitesMonth[iterator][`${nameMesAnio}`].push(
          formatedDataCite([fecha])[0]
        );
      });

      dispatch(onLoadFuturasCitas(arrayCitesMonth));
      dispatch(changeErrorLoadFutCitas(null));
    } catch (error) {
      console.log("Error cargando lista de futuras citas");
      console.log(error.response.data.message);

      dispatch(changeErrorLoadFutCitas(error.response.data.message));
    }
  };

  return {
    //* Propiedades
    pacientesList,
    pacientesListBusq,
    isFormPacOpen,
    titleForm,
    pacienteActivo,
    errorMsgRegPac,
    futurasCitasList,
    errorLoadFutCitas,

    //* Métodos
    changeTitleFormReg,
    changeDataPaciente,
    startLoadPacientes,
    startLoadPaciente,
    startSavingPaciente,
    startDeletingPaciente,
    startLoadFuturasCitas,
  };
};
