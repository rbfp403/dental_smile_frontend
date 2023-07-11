import { useDispatch, useSelector } from "react-redux";
import {
  changeRegisterErrorTratam,
  clearErrorMessageTram,
  onDeleteTratam,
  onLoadTratamientosList,
  onSaveTratam,
  onSetActiveTratam,
  onUpdateTratam,
} from "../store";
import {
  createComplicacion,
  createPrescripcion,
  createProcedTratam,
  createTratamiento,
  deleteComplicacion,
  deletePrescripcion,
  deleteProcedTratam,
  deleteTratamiento,
  getTratamientos,
  updateComplicacion,
  updatePrescripcion,
  updateTratamiento,
} from "../api/tratamientos.api";

//
//

export const useTratamientosStore = () => {
  //

  const dispatch = useDispatch();

  const {
    tratamientosList,
    tratamActivo,

    consultaActiva,
    errorMsgRegTratam,
  } = useSelector((state) => state.consultas);

  //

  const changeDataTratam = (tratam) => {
    dispatch(onSetActiveTratam(tratam));
  };

  const startLoadTratamientos = async () => {
    try {
      const { data } = await getTratamientos(consultaActiva.id_consulta);

      dispatch(onLoadTratamientosList(data));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(onLoadTratamientosList([]));
    }
  };

  const crudComplicaciones = async (dataArr, delArr, tratamIdReg) => {
    try {
      delArr.forEach(async (idCompli) => {
        if (idCompli !== undefined) {
          //eliminar
          await deleteComplicacion(idCompli);
        }
      });

      const dataComp = await Promise.all(
        dataArr.map(async (complicacion) => {
          if (complicacion.txt_compli.length > 0) {
            //

            if (complicacion.id_compli === undefined) {
              //son registros nuevos
              const { data } = await createComplicacion(tratamIdReg, {
                txt_compli: complicacion.txt_compli,
              });
              return data;
            } else {
              //se actualizan
              const { data } = await updateComplicacion(
                complicacion.id_compli,
                {
                  txt_compli: complicacion.txt_compli,
                }
              );
              return data;
            }
          }
        })
      );

      return dataComp;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      return [];
    }
  };

  const crudProcedimientos = async (dataArr, delArr, tratamIdReg) => {
    try {
      delArr.forEach(async (idProcedTratam) => {
        if (idProcedTratam !== undefined) {
          //eliminar
          await deleteProcedTratam(idProcedTratam);
        }
      });

      const dataProc = await Promise.all(
        dataArr.map(async (proced) => {
          if (proced.id_tratam_proced === undefined) {
            //es un nuevo proceso
            const { data } = await createProcedTratam(tratamIdReg, {
              id_proced: proced.id_proced,
            });
            return data;
          } else {
            return proced;
          }
        })
      );

      return dataProc;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      return [];
    }
  };

  const crudPrescripciones = async (dataArr, delArr, tratamIdReg) => {
    try {
      delArr.forEach(async (idPresc) => {
        if (idPresc !== undefined) {
          //eliminar
          await deletePrescripcion(idPresc);
        }
      });

      const dataPresc = await Promise.all(
        dataArr.map(async (prescripcion) => {
          if (prescripcion.desc_presc.length > 0) {
            //

            if (prescripcion.id_presc === undefined) {
              //son registros nuevos
              const { data } = await createPrescripcion(tratamIdReg, {
                desc_presc: prescripcion.desc_presc,
                dosi_presc: prescripcion.dosi_presc,
              });

              return data;
            } else {
              //se actualizan
              const { data } = await updatePrescripcion(prescripcion.id_presc, {
                desc_presc: prescripcion.desc_presc,
                dosi_presc: prescripcion.dosi_presc,
              });
              return data;
            }
          }
        })
      );

      return dataPresc;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      return [];
    }
  };

  const startSavingTratamiento = async (tratamiento) => {
    dispatch(clearErrorMessageTram());

    try {
      let tratamNew = null;

      const objectToBD = {
        codigoCIE: tratamiento.codigoCIE,
        id_tipoTratam: tratamiento.tipTratam,
      };

      if (tratamActivo) {
        //actualizando

        const { data } = await updateTratamiento(
          tratamActivo.id_tratam,
          objectToBD
        );

        tratamNew = data;
      } else {
        //registrando
        const { data } = await createTratamiento(
          consultaActiva.id_consulta,
          objectToBD
        );
        tratamNew = data;
        // tratamIdReg = data.id_tratam;
      }

      //registrar, actualizar, eliminar complicaciones
      const newCompls = await crudComplicaciones(
        tratamiento.arrComplicaciones,
        tratamiento.compDeleted,
        tratamNew.id_tratam
      );
      //registrar, eliminar procedimientos
      const newProces = await crudProcedimientos(
        tratamiento.arrProcedimientos,
        tratamiento.proceDeleted,
        tratamNew.id_tratam
      );
      //registrar, actualizar, eliminar prescripciones
      const newPresc = await crudPrescripciones(
        tratamiento.arrPrescripciones,
        tratamiento.prescDeleted,
        tratamNew.id_tratam
      );

      const newTratamiento = {
        ...tratamNew,
        complicaciones:
          newCompls[0] === undefined
            ? []
            : newCompls.filter((el) => el !== undefined),
        procedimientos: newProces[0] === undefined ? [] : newProces,
        prescripciones:
          newPresc[0] === undefined
            ? []
            : newPresc.filter((el) => el !== undefined),
      };

      if (tratamActivo) {
        //actualizacion
        dispatch(onUpdateTratam(newTratamiento));
      } else {
        //registro
        dispatch(onSaveTratam(newTratamiento));
      }

      dispatch(changeRegisterErrorTratam({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        changeRegisterErrorTratam({
          msg: "Hay errores",
          error: error.response.data.message,
        })
      );
    }
  };

  const startDeletingTratamiento = async () => {
    try {
      await deleteTratamiento(tratamActivo.id_tratam);
      dispatch(onDeleteTratam());
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  //
  return {
    //* Propiedades
    tratamientosList,
    tratamActivo,
    errorMsgRegTratam,

    //* Métodos
    changeDataTratam,
    startLoadTratamientos,
    startDeletingTratamiento,
    startSavingTratamiento,
  };
};
