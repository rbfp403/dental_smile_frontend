import { useDispatch, useSelector } from "react-redux";
import {
  createPago,
  deletePago,
  getPagos,
  getSumPago,
  updatePago,
} from "../api/consultas.api";
import {
  changeRegisterErrorCons,
  clearErrorMessageCons,
  onLoadPagosList,
  onSetActivePago,
  onSetSumPagos,
} from "../store";
import { comprobarErrorPago, formatearDataPagoToBD } from "../consulta/helpers";

//
//
//
//

export const usePagosStore = () => {
  //

  const dispatch = useDispatch();

  const { pagosList, pagoActivo, errorMsgRegCons, consultaActiva, sumPagos } =
    useSelector((state) => state.consultas);

  //

  const changeDataPago = (pago) => {
    dispatch(onSetActivePago(pago));
  };

  const startLoadPagos = async () => {
    try {
      const { data } = await getPagos(consultaActiva.id_consulta);

      const { data: dataSum } = await getSumPago(consultaActiva.id_consulta);

      dispatch(onLoadPagosList(data));
      dispatch(onSetSumPagos(parseFloat(Object.values(dataSum)[0])));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);

      dispatch(onLoadPagosList([]));
    }
  };

  const startSavingPago = async (pagoData) => {
    dispatch(clearErrorMessageCons());
    try {
      const dataFormateada = formatearDataPagoToBD({
        id_consulta: consultaActiva.id_consulta,
        ...pagoData,
      });

      if (pagoActivo) {
        //actualizar
        const { data } = await updatePago(
          pagoActivo.id_ingreso,
          dataFormateada
        );
      } else {
        //registrar

        const { data } = await createPago(
          consultaActiva.id_consulta,
          dataFormateada
        );
      }

      //actualizar errores
      dispatch(changeRegisterErrorCons({ msg: "Sin errores", error: "" }));

      startLoadPagos();
      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterErrorCons({
          msg: "Hay errores",
          error: comprobarErrorPago(error.response.data.message),
        })
      );
    }
  };

  const startDeletingPago = async () => {
    try {
      await deletePago(pagoActivo.id_ingreso);
      changeDataPago(null);
      startLoadPagos();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return {
    //* Propiedades
    pagosList,
    pagoActivo,
    errorMsgRegCons,
    sumPagos,
    //* Métodos
    changeDataPago,
    startLoadPagos,
    startSavingPago,
    startDeletingPago,
  };
};
