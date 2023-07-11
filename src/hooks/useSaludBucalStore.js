import { useDispatch, useSelector } from "react-redux";
import {
  addIdSaludBucal,
  changeRegisterSaludB,
  clearErrorMessageSaludB,
  onChangeIndiceSimplificado,
  onSetDataBucal,
  onSetSaludBucalAct,
  onUpdatedSB,
} from "../store";
import {
  createPzaSaludBucal,
  createSaludBucal,
  getSaludBucal,
  updatePzaSaludBucal,
  updateSaludBucal,
} from "../api/consultas.api";
import {
  formatearDataPzaSBtoBD,
  formatearDataSaludBucal,
} from "../consulta/helpers";

//
//

export const useSaludBucalStore = () => {
  //

  const dispatch = useDispatch();

  const { saludBucalActual, errorMsgRegSaludB, isUpdatedSB, dataSaludBucal } =
    useSelector((state) => state.saludBucal);

  const { consultaActiva } = useSelector((state) => state.consultas);

  //

  const setearSaludBActual = (saludBucalArr) => {
    dispatch(onSetSaludBucalAct(saludBucalArr));
  };

  const updateSaludBActual = (pieza) => {
    dispatch(onChangeIndiceSimplificado(pieza));
  };

  const startLoadSaludBucalArr = async () => {
    dispatch(onUpdatedSB(false));
    try {
      const { data } = await getSaludBucal(consultaActiva.id_consulta);

      dispatch(onSetSaludBucalAct(formatearDataSaludBucal(data[0])));

      dispatch(onUpdatedSB(true));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(onSetSaludBucalAct({ piezas: [] }));

      // dispatch(onSetSaludBucalAct({ piezas: dataSaludBucalEmpty() }));
    }
  };

  const startSavingSaludBucal = async () => {
    dispatch(clearErrorMessageSaludB());
    try {
      let id_salud_bucal = 0;

      if (Object.keys(saludBucalActual).length === 1) {
        //registro de odontograma
        const { data: dataSaludB } = await createSaludBucal(
          consultaActiva.id_consulta
        );
        id_salud_bucal = dataSaludB.id_saludb;
      } else {
        //actualizacion de las piezas dentales
        id_salud_bucal = saludBucalActual.id_saludb;
      }

      const arrPromisesPiezas = [];

      for (const pieza of saludBucalActual.piezas) {
        //registro de pieza

        if (pieza.id === null) {
          arrPromisesPiezas.push(
            createPzaSaludBucal(id_salud_bucal, formatearDataPzaSBtoBD(pieza))
          );
        } else {
          arrPromisesPiezas.push(
            updatePzaSaludBucal(pieza.id, formatearDataPzaSBtoBD(pieza))
          );
        }
      }

      await Promise.all(arrPromisesPiezas);
      await startLoadSaludBucalArr();

      dispatch(changeRegisterSaludB({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);

      dispatch(
        changeRegisterSaludB({
          msg: "Hay errores",
          error:
            error.response.data.message +
            " .Para mas información contactese con el administrador",
        })
      );
    }
  };

  const startLoadingSBBox2 = async () => {
    try {
    } catch (error) {}
    const { data } = await getSaludBucal(consultaActiva.id_consulta);
    dispatch(
      onSetDataBucal({
        id_saludb: data[0].id_saludb,
        enfermedad_periodontal: data[0].enfermedad_periodontal,
        mal_oclusion: data[0].mal_oclusion,
        fluorosis: data[0].fluorosis,
      })
    );
  };
  const startUpdatingSaludBucal = async (dataSB) => {
    dispatch(clearErrorMessageSaludB());
    try {
      let id_salud_bucal = "";
      if (dataSaludBucal === null) {
        //registro
        const { data: dataSaludB } = await createSaludBucal(
          consultaActiva.id_consulta
        );
        id_salud_bucal = dataSaludB.id_saludb;
      } else {
        id_salud_bucal = dataSaludBucal.id_saludb;
      }

      const { data } = await updateSaludBucal(id_salud_bucal, {
        enferper_saludb: dataSB.stateEnfePerio,
        maloclus_saludb: dataSB.stateMalOclus,
        fluorosis_saludb: dataSB.stateFluorosis,
      });

      dispatch(
        onSetDataBucal({
          id_saludb: data.id_saludb,
          enfermedad_periodontal: data.enfermedad_periodontal,
          mal_oclusion: data.mal_oclusion,
          fluorosis: data.fluorosis,
        })
      );

      dispatch(addIdSaludBucal(id_salud_bucal));

      dispatch(changeRegisterSaludB({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);

      dispatch(
        changeRegisterSaludB({
          msg: "Hay errores",
          error:
            error.response.data.message +
            " .Para mas información contactese con el administrador",
        })
      );
    }
  };

  //
  return {
    //* Propiedades
    saludBucalActual,
    errorMsgRegSaludB,
    isUpdatedSB,
    dataSaludBucal,

    //* Métodos
    setearSaludBActual,
    updateSaludBActual,
    startLoadSaludBucalArr,
    startSavingSaludBucal,
    startLoadingSBBox2,
    startUpdatingSaludBucal,
  };
};
