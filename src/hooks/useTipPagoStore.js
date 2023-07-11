import { useDispatch, useSelector } from "react-redux";
import {
  createTipoPago,
  deleteTipoPago,
  getTipoDePago,
  updateTipoPago,
} from "../api/dashboard.api";
import {
  clearErrorTipPagoMsg,
  onChangeRegErrTipPago,
  onDeleteTipoPago,
  onLoadTipoPagosList,
  onSaveTipoPago,
  onSetActiveTipoPago,
  onUpdateTipoPago,
} from "../store";
import {
  comprobarErrorTipPago,
  formatearDataTipPagoToBD,
  formatearDataTipPagoToTable,
} from "../dashboard/helpers";

//
//
//

export const useTipPagoStore = () => {
  const dispatch = useDispatch();

  const { tipoPagosList, tipoPagoActivo, errorMsgRegTipoPago } = useSelector(
    (state) => state.tipoPago
  );

  //funciones
  const startLoadTipPagoList = async (tipoPago) => {
    try {
      const { data } = await getTipoDePago(tipoPago);

      dispatch(onLoadTipoPagosList(formatearDataTipPagoToTable(data)));
      dispatch(clearErrorTipPagoMsg());
    } catch (error) {
      console.log(error.response.data.message);

      dispatch(
        onChangeRegErrTipPago({ msg: error.response.data.message, error: "" })
      );
    }
  };

  const changeDataTipPago = (dataTipPago) => {
    dispatch(onSetActiveTipoPago(dataTipPago));
  };

  const startSavingTipPago = async (dataTipPago) => {
    dispatch(clearErrorTipPagoMsg());
    try {
      if (dataTipPago.id) {
        //actualizar
        const { data } = await updateTipoPago(
          dataTipPago.id,
          formatearDataTipPagoToBD(dataTipPago)
        );

        dispatch(onUpdateTipoPago(formatearDataTipPagoToTable([data])[0]));
        dispatch(onSetActiveTipoPago(formatearDataTipPagoToTable([data])[0]));
        //
      } else {
        //registrar
        const { data } = await createTipoPago(
          formatearDataTipPagoToBD(dataTipPago)
        );
        dispatch(onSaveTipoPago(formatearDataTipPagoToTable([data])[0]));
        dispatch(onSetActiveTipoPago(formatearDataTipPagoToTable([data])[0]));
      }

      dispatch(onChangeRegErrTipPago({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        onChangeRegErrTipPago({
          msg: "Hay errores",
          error: comprobarErrorTipPago(error.response.data.message),
        })
      );
    }
  };

  const startDeletingTipPago = async (arrIdTipPago = []) => {
    try {
      if (arrIdTipPago.length === 0) {
        await deleteTipoPago(tipoPagoActivo.id);
      } else {
        for (const i of arrIdTipPago) {
          await deleteTipoPago(i);
        }
      }
      dispatch(onDeleteTipoPago(arrIdTipPago));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    tipoPagosList,
    tipoPagoActivo,
    errorMsgRegTipoPago,
    //* Métodos
    startLoadTipPagoList,
    changeDataTipPago,
    startSavingTipPago,
    startDeletingTipPago,
  };
};
