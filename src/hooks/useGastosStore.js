import { useDispatch, useSelector } from "react-redux";

import {
  createGasto,
  deleteGasto,
  getAllGastos,
  updateGasto,
} from "../api/dashboard.api";

import {
  clearErrorGastoMsg,
  onChangeRegErrGasto,
  onDeleteGasto,
  onLoadGastosList,
  onSaveGasto,
  onSetActiveGasto,
  onSetGastosTotales,
  onUpdateGasto,
} from "../store";
import {
  comprobarErrorGasto,
  formatearDataGastoToBD,
  formatearDataGastosToTable,
} from "../dashboard/helpers";
//
//
//
//
//

export const useGastosStore = () => {
  //

  const dispatch = useDispatch();

  const { gastosList, gastoActivo, errorMsgRegGasto, totalGastos } =
    useSelector((state) => state.gastos);

  //funciones

  const startGastosList = async (fil_fecha, prm1, prm2) => {
    try {
      const { data } = await getAllGastos(fil_fecha, prm1, prm2);

      const dataFormateada = formatearDataGastosToTable(data);

      dispatch(onLoadGastosList(dataFormateada));

      const total = dataFormateada.reduce((acc, montoAct) => {
        return acc + montoAct.monto;
      }, 0);
      dispatch(onSetGastosTotales(total));
    } catch (error) {
      console.log(error.response.data.message);

      if (error.response.data.message === "Gastos no encontrados") {
        dispatch(onLoadGastosList([]));
        dispatch(onSetGastosTotales(0));
      }
    }
  };

  const changeDataGasto = (dataGasto) => {
    dispatch(onSetActiveGasto(dataGasto));
  };

  const startSavingGasto = async (dataGasto) => {
    dispatch(clearErrorGastoMsg());
    try {
      if (gastoActivo) {
        //actualizar
        const { data } = await updateGasto(
          gastoActivo.id,
          formatearDataGastoToBD(dataGasto)
        );

        dispatch(onUpdateGasto(formatearDataGastosToTable([data])[0]));
        dispatch(onSetActiveGasto(formatearDataGastosToTable([data])[0]));
        //
      } else {
        //registrar
        const { data } = await createGasto(formatearDataGastoToBD(dataGasto));

        dispatch(onSaveGasto(formatearDataGastosToTable([data])[0]));
        dispatch(onSetActiveGasto(formatearDataGastosToTable([data])[0]));
      }

      dispatch(onChangeRegErrGasto({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        onChangeRegErrGasto({
          msg: "Hay errores",
          error: comprobarErrorGasto(error.response.data.message),
        })
      );
    }
  };

  const startDeletingGasto = async (arrIdGastos = []) => {
    try {
      if (arrIdGastos.length === 0) {
        await deleteGasto(gastoActivo.id);
      } else {
        for (const i of arrIdGastos) {
          await deleteGasto(i);
        }
      }
      dispatch(onDeleteGasto(arrIdGastos));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    gastosList,
    gastoActivo,
    errorMsgRegGasto,
    totalGastos,

    //* Métodos
    startGastosList,
    changeDataGasto,
    startSavingGasto,
    startDeletingGasto,
  };
};
