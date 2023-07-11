import { useDispatch, useSelector } from "react-redux";
import {
  changeRegisterErrorOdont,
  clearErrorMessageOdont,
  onChangePiezasDentales,
  onSetActiveTool,
  onSetOdontogramaConsAct,
  onSetPiezaActiva,
  onSetPiezasListOdon,
  onUpdatedOdont,
} from "../store";
import {
  createOdontograma,
  createPiezaDental,
  deleteOdontograma,
  deletePiezaDental,
  getOdontogramas,
  updatePiezaDental,
} from "../api/consultas.api";
import {
  convertOdonListPiezas,
  formatearDataOdontograma,
  formatearDataPiezaDentalToBD,
  verifyPiezaDentalEmpty,
} from "../consulta/helpers";

//
//
//

export const useOdontogramaStore = () => {
  //

  const dispatch = useDispatch();

  const {
    toolOdontActiva,
    odontogramaActual,
    errorMsgRegOdontog,
    piezasListOdon,
    piezaActiva,
    isUpdatedOdon,
  } = useSelector((state) => state.odontograma);

  const { consultaActiva } = useSelector((state) => state.consultas);

  //

  const changeToolOdonto = (tool) => {
    dispatch(onSetActiveTool(tool));
  };

  const setearOdontoActual = (odontograma) => {
    dispatch(onSetOdontogramaConsAct(odontograma));
  };

  const updateOdontoActual = (piezas) => {
    dispatch(onChangePiezasDentales(piezas));
  };

  const startLoadOdontogramas = async () => {
    dispatch(onUpdatedOdont(false));
    try {
      const { data } = await getOdontogramas(
        "consulta",
        consultaActiva.id_consulta
      );

      dispatch(onSetOdontogramaConsAct(formatearDataOdontograma(data[0])));

      dispatch(onSetPiezasListOdon(convertOdonListPiezas(data[0].piezas)));

      dispatch(onUpdatedOdont(true));
      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);

      dispatch(onSetOdontogramaConsAct({ piezas: [], fecha_odontograma: "" }));

      dispatch(onSetPiezasListOdon([]));
    }
  };

  const startSavingOdontograma = async () => {
    dispatch(clearErrorMessageOdont());
    try {
      let id_odontograma = 0;

      if (Object.keys(odontogramaActual).length < 4) {
        //registro de odontograma
        const { data: dataOdon } = await createOdontograma(
          consultaActiva.id_consulta
        );
        id_odontograma = dataOdon.id_odontograma;
      } else {
        //actualizacion de las piezas dentales
        id_odontograma = odontogramaActual.id_odontograma;
      }

      const arrPromisesPiezas = [];
      for (const pieza of odontogramaActual.piezas) {
        //registro de pieza
        if (pieza.id === null && !verifyPiezaDentalEmpty(pieza)) {
          arrPromisesPiezas.push(
            createPiezaDental(
              id_odontograma,
              formatearDataPiezaDentalToBD(pieza)
            )
          );
        }

        //actualizacion de pieza
        if (pieza.id !== null && !verifyPiezaDentalEmpty(pieza)) {
          arrPromisesPiezas.push(
            updatePiezaDental(pieza.id, formatearDataPiezaDentalToBD(pieza))
          );
        }

        //eliminacion de pieza
        if (pieza.id !== null && verifyPiezaDentalEmpty(pieza)) {
          arrPromisesPiezas.push(deletePiezaDental(pieza.id));
        }
      }
      await Promise.all(arrPromisesPiezas);

      await startLoadOdontogramas();

      dispatch(changeRegisterErrorOdont({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);

      dispatch(
        changeRegisterErrorOdont({
          msg: "Hay errores",
          error:
            error.response.data.message +
            " .Para mas información contactese con el administrador",
        })
      );
    }
  };

  const startDeletingOdontograma = async () => {
    try {
      await deleteOdontograma(odontogramaActual.id_odontograma);

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    } finally {
      await startLoadOdontogramas();
    }
  };

  const onChangePiezaActiva = (pieza) => {
    dispatch(onSetPiezaActiva(pieza));
  };

  const updateNotaPiezaDental = async (nota) => {
    try {
      await updatePiezaDental(piezaActiva.id, { nota_dent: nota });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    } finally {
      await startLoadOdontogramas();
    }
  };

  //
  return {
    //* Propiedades
    toolOdontActiva,
    odontogramaActual,
    errorMsgRegOdontog,
    piezasListOdon,
    piezaActiva,
    isUpdatedOdon,

    //* Métodos
    changeToolOdonto,
    updateOdontoActual,
    setearOdontoActual,
    startSavingOdontograma,
    startLoadOdontogramas,
    startDeletingOdontograma,
    onChangePiezaActiva,
    updateNotaPiezaDental,
  };
};
