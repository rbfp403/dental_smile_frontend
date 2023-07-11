import { useDispatch, useSelector } from "react-redux";
import {
  createProcedimiento,
  deleteProcedimiento,
  getAllDataProced,
  getAllProcedimientos,
  getProcedBusqueda,
  getProcedNomen,
  getSubtitulos,
  getTitulos,
  updateProcedimiento,
} from "../api/dashboard.api";
import {
  clearErrorProcedMsg,
  onChangeAllDataProced,
  onChangeRegErrProced,
  onDeleteProced,
  onLoadProcedList,
  onLoadProcedNomenList,
  onLoadSubtitulosList,
  onLoadTitulosList,
  onSaveProced,
  onSetActiveProced,
  onUpdateProced,
} from "../store";
import {
  comprobarErrorProced,
  formatearDataProcedNomen,
  formatearDataProcedToBD,
  formatearDataProcedToTable,
  formatearDataSubtitulos,
  formatearDataTitulos,
} from "../dashboard/helpers";

//
//
//
//
//

export const useProcedStore = () => {
  //

  const dispatch = useDispatch();

  const {
    procedList,
    procedActivo,
    errorMsgRegProced,
    titulosList,
    subtitulosList,
    procedWithCodeList,
    dataProcedTS,
  } = useSelector((state) => state.procedimientos);

  //funciones
  const startLoadProcedList = async () => {
    try {
      const { data } = await getAllProcedimientos();

      dispatch(onLoadProcedList(formatearDataProcedToTable(data)));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const changeDataProced = (dataProced) => {
    dispatch(onSetActiveProced(dataProced));
  };

  const startSavingProced = async (dataProced) => {
    dispatch(clearErrorProcedMsg());
    try {
      if (dataProced.id) {
        //actualizar
        const { data } = await updateProcedimiento(
          dataProced.id,
          formatearDataProcedToBD(dataProced)
        );

        dispatch(onUpdateProced(formatearDataProcedToTable([data])[0]));
        dispatch(onSetActiveProced(formatearDataProcedToTable([data])[0]));
        //
      } else {
        //registrar
        const { data } = await createProcedimiento(
          formatearDataProcedToBD(dataProced)
        );
        dispatch(onSaveProced(formatearDataProcedToTable([data])[0]));
        dispatch(onSetActiveProced(formatearDataProcedToTable([data])[0]));
      }

      dispatch(onChangeRegErrProced({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        onChangeRegErrProced({
          msg: "Hay errores",
          error: comprobarErrorProced(error.response.data.message),
        })
      );
    }
  };

  const startDeletingProced = async (arrIdProced = []) => {
    dispatch(clearErrorProcedMsg());

    try {
      if (arrIdProced.length === 0) {
        await deleteProcedimiento(procedActivo.id);
      } else {
        for (const i of arrIdProced) {
          await deleteProcedimiento(i);
        }
      }
      dispatch(onDeleteProced(arrIdProced));

      dispatch(
        onChangeRegErrProced({
          msg: "Sin errores en la eliminacion",
          error: "",
        })
      );
    } catch (error) {
      console.log(error);

      let msgError = error.response.data.message || "";

      if (
        msgError.includes("fk_Tratamiento_has_procedimiento_procedimiento1")
      ) {
        msgError =
          "No se puede eliminar el procedimiento porque esta siendo usado en el registro de un tratamiento";
      }

      dispatch(
        onChangeRegErrProced({
          msg: "Hay errores en la eliminacion",
          error: msgError,
        })
      );
    }
  };

  //
  //
  const startLoadTitulosList = async () => {
    try {
      const { data } = await getTitulos();

      dispatch(onLoadTitulosList(formatearDataTitulos(data)));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const startLoadSubtitulosList = async (id_titulo) => {
    try {
      const { data } = await getSubtitulos(id_titulo);

      dispatch(onLoadSubtitulosList(formatearDataSubtitulos(data)));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const changeSubtitulosList = () => {
    try {
      dispatch(onLoadSubtitulosList([]));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const startProcedNomenList = async (ti_subti, id_titSubti) => {
    try {
      const { data } = await getProcedNomen(ti_subti, id_titSubti);

      dispatch(onLoadProcedNomenList(formatearDataProcedNomen(data)));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const startProcedNomenListBusq = async () => {
    try {
      const { data } = await getProcedBusqueda();

      dispatch(onLoadProcedNomenList(formatearDataProcedNomen(data)));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const changeDataProcedTS = async (cod) => {
    try {
      const { data } = await getAllDataProced(cod);

      dispatch(onChangeAllDataProced(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return {
    //* Propiedades
    procedList,
    procedActivo,
    errorMsgRegProced,
    titulosList,
    subtitulosList,
    procedWithCodeList,
    dataProcedTS,

    //* Métodos
    startLoadProcedList,
    changeDataProced,
    startSavingProced,
    startDeletingProced,

    //
    startLoadTitulosList,
    startLoadSubtitulosList,
    startProcedNomenList,
    startProcedNomenListBusq,
    changeSubtitulosList,
    changeDataProcedTS,
  };
};
