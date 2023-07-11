import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createConsulta,
  createSignosVitales,
  deleteConsulta,
  getConsultaById,
  getConsultas,
  getSignosVitales,
  updateConsulta,
  updateSignosVitales,
} from "../api/consultas.api";

import { getPacienteById } from "../api/pacientes.api";

import {
  changeErrorLoadConsultas,
  changeRegisterErrorCons,
  clearErrorMessageCons,
  onChangeOpenDelCons,
  onChangeOpenFormCons,
  onChangeTitleFormCons,
  onLoadConsultasList,
  onLoadPacActivo,
  onSetActivaConsulta,
  onSetActiveSignVit,
} from "../store";

import { extractMesAnio } from "../agenda/helpers";

import { formatearDataPacToTable } from "../pacientes/helpers";

import {
  comprobarErrorCons,
  comprobarErrorSignVit,
  formatearDataConsToBD,
  formatedDataConsulta,
} from "../historial/helpers";

//
//
//
//

export const useConsultasStore = () => {
  //

  //hook filtros de busqueda
  const [filtros, setFiltros] = useState({});

  const dispatch = useDispatch();

  const {
    consultaActiva,
    consultasList,
    errorLoadConsultas,
    stateOpenFormCons,
    titleFormConsulta,
    errorMsgRegCons,
    stateOpenDelCons,
    signosVitales,
  } = useSelector((state) => state.consultas);

  //
  const { pacienteActivo } = useSelector((state) => state.pacientes);

  const changeStateFormCons = (flag) => {
    dispatch(onChangeOpenFormCons(flag));
  };

  const changeStateDelCons = (flag) => {
    dispatch(onChangeOpenDelCons(flag));
  };

  const changeDataConsulta = (consData) => {
    dispatch(onSetActivaConsulta(consData));
  };

  const changeTitleFormCons = (flag) => {
    dispatch(onChangeTitleFormCons(flag));
  };
  const startLoadConsultas = async (filtro, param1, param2) => {
    //
    setFiltros({ filtro, param1, param2 });
    //
    try {
      const { data } = await getConsultas(
        pacienteActivo.id,
        filtro,
        param1,
        param2
      );

      let arrayConsultasMonth = [];
      const arrMesAnio = [];

      const dataFormated = formatedDataConsulta(data);

      //1er bucle
      //para crear los elementos objetos del array, cuya unica llave es el nombre del mes + el año,
      // se usa un array para controlar que no se repitan los meses
      dataFormated.forEach((consulta) => {
        const nameMesAnio = extractMesAnio(
          consulta.fecha_consulta.replaceAll("-", "/")
        );

        if (!arrMesAnio.includes(nameMesAnio)) {
          arrMesAnio.push(nameMesAnio);
          arrayConsultasMonth.push({ [nameMesAnio]: [] });
        }
      });

      let iterator = 0;

      //2do bucle
      //Buscar extraer mes de la consulta para que coincida con los objetos del primer bucle
      //buscar la ubicacion del array donde esta el objeto con la llave mes_año
      dataFormated.forEach((consulta) => {
        //

        const nameMesAnio = extractMesAnio(
          consulta.fecha_consulta.replaceAll("-", "/")
        );

        arrayConsultasMonth.forEach((element, index) => {
          if (Object.keys(element)[0] === nameMesAnio) {
            iterator = index;
            return;
          }
        });

        arrayConsultasMonth[iterator][`${nameMesAnio}`].push(consulta);
      });
      dispatch(onLoadConsultasList(arrayConsultasMonth));
      dispatch(changeErrorLoadConsultas(null));

      //
    } catch (error) {
      console.log(error);
      console.log("Error cargando lista de futuras citas");
      console.log(error.response.data.message);
      dispatch(changeErrorLoadConsultas(error.response.data.message));
    }
  };

  const startSavingConsulta = async (consData) => {
    dispatch(clearErrorMessageCons());

    try {
      if (consData.id) {
        //actualizar
        const { data } = await updateConsulta(
          consData.id,
          formatearDataConsToBD(consData)
        );

        //actualizacion en la consulta desde el detalle en la consulta
        dispatch(onSetActivaConsulta(formatedDataConsulta([data])[0]));

        startLoadConsultas(filtros.filtro, filtros.param1, filtros.param2);
      } else {
        //registrar
        const { data } = await createConsulta(
          pacienteActivo.id,
          formatearDataConsToBD(consData)
        );

        startLoadConsultas("no_filtros", "_", "_");
        // dispatch(onSetActivaConsulta(formatedDataConsulta([data])[0]));
      }

      //actualizar errores
      dispatch(changeRegisterErrorCons({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterErrorCons({
          msg: "Hay errores",
          error: comprobarErrorCons(error.response.data.message),
        })
      );
    }
    //  finally {
    // startLoadConsultas("no_filtros", "_", "_");

    // }
  };

  const startDeletingConsulta = async () => {
    try {
      await deleteConsulta(consultaActiva.id_consulta);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      dispatch(onSetActivaConsulta(null));
      startLoadConsultas("no_filtros", "_", "_");
      // startLoadConsultas(filtros.filtro, filtros.param1, filtros.param2);
    }
  };

  const startLoadConsulta = async (id_pac, id_cons) => {
    try {
      const { data: dataPac } = await getPacienteById(id_pac);
      const { data: dataCons } = await getConsultaById(id_cons);

      dispatch(onLoadPacActivo(formatearDataPacToTable([dataPac])[0]));
      dispatch(onSetActivaConsulta(formatedDataConsulta([dataCons])[0]));
    } catch (error) {
      console.log("Error cargando datos de la consulta por ID");
      console.log(error);
    }
  };

  const startLoadSignVit = async () => {
    try {
      const { data } = await getSignosVitales(consultaActiva.id_consulta);

      dispatch(onSetActiveSignVit(data));
    } catch (error) {
      console.log(error);
      console.log("Error cargando signos vitales");
      dispatch(onSetActiveSignVit(null));
    }
  };

  const startSavingSignVit = async (signVitales) => {
    dispatch(clearErrorMessageCons());
    try {
      if (signVitales.id_signoVital) {
        //actualizar
        const { data } = await updateSignosVitales(
          consultaActiva.id_consulta,
          signVitales.id_signoVital,
          signVitales
        );
        dispatch(onSetActiveSignVit(data));
      } else {
        //registrar
        const { data } = await createSignosVitales(
          consultaActiva.id_consulta,
          signVitales
        );
        dispatch(onSetActiveSignVit(data));
      }

      //actualizar errores
      dispatch(changeRegisterErrorCons({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterErrorCons({
          msg: "Hay errores",
          error: comprobarErrorSignVit(error.response.data.message),
        })
      );
    } finally {
      // startLoadConsultas("no_filtros", "_", "_");
      startLoadConsultas(filtros.filtro, filtros.param1, filtros.param2);
    }
  };
  return {
    //* Propiedades
    consultaActiva,
    consultasList,
    errorLoadConsultas,
    stateOpenFormCons,
    titleFormConsulta,
    errorMsgRegCons,
    stateOpenDelCons,
    signosVitales,
    //* Métodos
    changeDataConsulta,
    startLoadConsultas,
    changeStateFormCons,
    changeStateDelCons,
    changeTitleFormCons,
    startSavingConsulta,
    startDeletingConsulta,
    startLoadConsulta,

    startLoadSignVit,
    startSavingSignVit,
  };
};
