import { useDispatch, useSelector } from "react-redux";
import {
  changeRegisterErrorCons,
  clearErrorMessageCons,
  onDeleteExamen,
  onLoadEnfermedadesCieList,
  onLoadExamenesList,
  onSaveExamen,
  onSetActiveExamen,
  onUpdateExamen,
} from "../store";
import {
  createExamen,
  deleteExamen,
  getEnfermedadesCIE,
  getExamenes,
  updateExamen,
} from "../api/consultas.api";
import {
  comprobarErrorExamen,
  formatearDataEnferCieList,
  formatearDataExamenToBD,
  formatearDataExamenToTable,
} from "../consulta/helpers";

//
//
//

export const useExamenesStore = () => {
  //

  const dispatch = useDispatch();

  const {
    examenesList,
    examenActivo,
    errorMsgRegCons,
    consultaActiva,
    enfermedadesCieList,
  } = useSelector((state) => state.consultas);

  //

  const changeDataExamen = (examen) => {
    dispatch(onSetActiveExamen(examen));
  };

  const startLoadEnfermedadesCie = async () => {
    try {
      const { data } = await getEnfermedadesCIE();

      dispatch(onLoadEnfermedadesCieList(formatearDataEnferCieList(data)));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  const startLoadExamenes = async () => {
    try {
      const { data } = await getExamenes(consultaActiva.id_consulta);

      dispatch(onLoadExamenesList(formatearDataExamenToTable(data)));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(onLoadExamenesList([]));
    }
  };

  const startSavingExamen = async (examData) => {
    dispatch(clearErrorMessageCons());
    try {
      if (examenActivo) {
        //actualizar
        const { data } = await updateExamen(
          examenActivo.id,
          formatearDataExamenToBD(examData)
        );

        dispatch(onUpdateExamen(formatearDataExamenToTable([data])[0]));
        dispatch(onSetActiveExamen(formatearDataExamenToTable([data])[0]));
      } else {
        //registrar

        const { data } = await createExamen(
          consultaActiva.id_consulta,
          formatearDataExamenToBD(examData)
        );

        dispatch(onSaveExamen(formatearDataExamenToTable([data])[0]));
        dispatch(onSetActiveExamen(formatearDataExamenToTable([data])[0]));
      }

      //actualizar errores
      dispatch(changeRegisterErrorCons({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterErrorCons({
          msg: "Hay errores",
          error: comprobarErrorExamen(error.response.data.message),
        })
      );
    }
  };

  const startDeletingExam = async (id_examen = []) => {
    try {
      if (id_examen.length === 0) {
        await deleteExamen(examenActivo.id);
      } else {
        for (const i of id_examen) {
          await deleteExamen(i);
        }
      }
      dispatch(onDeleteExamen(id_examen));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return {
    //* Propiedades
    examenesList,
    examenActivo,
    errorMsgRegCons,
    enfermedadesCieList,

    //* Métodos
    changeDataExamen,
    startLoadExamenes,
    startSavingExamen,
    startDeletingExam,
    startLoadEnfermedadesCie,
  };
};
