import { useDispatch, useSelector } from "react-redux";
import {
  createTipoCons,
  deleteTipoCons,
  getTipoDeCons,
  updateTipoCons,
} from "../api/dashboard.api";
import {
  clearErrorTipConsMsg,
  onChangeRegErrTipCons,
  onDeleteTipoCons,
  onLoadTipoConsList,
  onLoadTipoConsListBusq,
  onSaveTipoCons,
  onSetActiveTipoCons,
  onUpdateTipoCons,
} from "../store";
import {
  comprobarErrorTipCons,
  formatearDataTipConsBusq,
  formatearDataTipConsToBD,
  formatearDataTipConsToTable,
} from "../dashboard/helpers";

//
//
//
//
//

export const useTipConsStore = () => {
  //

  const dispatch = useDispatch();

  const {
    tipoConsList,
    tipoConsActivo,
    errorMsgRegTipoCons,
    tipoConsListBusq,
  } = useSelector((state) => state.tipoCons);

  //funciones
  const startLoadTipConsList = async () => {
    try {
      const { data } = await getTipoDeCons();

      dispatch(onLoadTipoConsList(formatearDataTipConsToTable(data)));
      dispatch(onLoadTipoConsListBusq(formatearDataTipConsBusq(data)));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const changeDataTipCons = (dataTipCons) => {
    dispatch(onSetActiveTipoCons(dataTipCons));
  };

  const startSavingTipCons = async (dataTipCons) => {
    dispatch(clearErrorTipConsMsg());
    try {
      if (dataTipCons.id) {
        //actualizar
        const { data } = await updateTipoCons(
          dataTipCons.id,
          formatearDataTipConsToBD(dataTipCons)
        );

        dispatch(onUpdateTipoCons(formatearDataTipConsToTable([data])[0]));
        dispatch(onSetActiveTipoCons(formatearDataTipConsToTable([data])[0]));
        //
      } else {
        //registrar
        const { data } = await createTipoCons(
          formatearDataTipConsToBD(dataTipCons)
        );
        dispatch(onSaveTipoCons(formatearDataTipConsToTable([data])[0]));
        dispatch(onSetActiveTipoCons(formatearDataTipConsToTable([data])[0]));
      }

      dispatch(onChangeRegErrTipCons({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        onChangeRegErrTipCons({
          msg: "Hay errores",
          error: comprobarErrorTipCons(error.response.data.message),
        })
      );
    }
  };

  const startDeletingTipCons = async (arrIdTipCons = []) => {
    dispatch(clearErrorTipConsMsg());

    try {
      if (arrIdTipCons.length === 0) {
        await deleteTipoCons(tipoConsActivo.id);
      } else {
        for (const i of arrIdTipCons) {
          await deleteTipoCons(i);
        }
      }
      dispatch(onDeleteTipoCons(arrIdTipCons));

      dispatch(
        onChangeRegErrTipCons({
          msg: "Sin errores en la eliminacion",
          error: "",
        })
      );
    } catch (error) {
      console.log(error);
      let msgError = error.response.data.message || "";

      if (msgError.includes("fk_tipoConsulta")) {
        msgError =
          "No se puede eliminar el tipo de consulta porque esta siendo usado en las consultas registradas";
      }
      console.log(msgError);
      dispatch(
        onChangeRegErrTipCons({
          msg: "Hay errores en la eliminacion",
          error: msgError,
        })
      );
    }
  };

  return {
    //* Propiedades
    tipoConsList,
    tipoConsActivo,
    errorMsgRegTipoCons,
    tipoConsListBusq,
    //* Métodos
    startLoadTipConsList,
    changeDataTipCons,
    startSavingTipCons,
    startDeletingTipCons,
  };
};
