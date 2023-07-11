import { useDispatch, useSelector } from "react-redux";
import {
  createPlan,
  deletePlan,
  getPlanes,
  updatePlan,
} from "../api/consultas.api";
import {
  changeRegisterErrorCons,
  clearErrorMessageCons,
  onDeletePlan,
  onLoadPlanesList,
  onSavePlan,
  onSetActivePlan,
  onUpdatePlan,
} from "../store";
import {
  comprobarErrorPlan,
  formatearDataPlan,
  formatearDataPlanDiagToTable,
  formatearDataPlanEduToTable,
  formatearDataPlanTeraToTable,
  formatearDataPlanToBD,
  tipoPlanesArr,
} from "../consulta/helpers";

//
//
//

export const usePlanesStore = () => {
  //

  const dispatch = useDispatch();

  const { planesList, planActivo, errorMsgRegCons, consultaActiva } =
    useSelector((state) => state.consultas);

  //

  const changeDataPlan = (plan) => {
    dispatch(onSetActivePlan(plan));
  };

  const startLoadPlanes = async () => {
    try {
      if (consultaActiva) {
        const { data } = await getPlanes(consultaActiva.id_consulta);

        dispatch(
          onLoadPlanesList([
            formatearDataPlanDiagToTable(data[0]),
            formatearDataPlanTeraToTable(data[1]),
            formatearDataPlanEduToTable(data[2]),
          ])
        );
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(onLoadPlanesList([[], [], []]));
    }
  };

  const startSavingPlan = async (tipPlan, planData) => {
    dispatch(clearErrorMessageCons());
    try {
      if (planActivo) {
        //actualizar
        const { data } = await updatePlan(
          planActivo.id,
          formatearDataPlanToBD(planData)
        );

        const posTipPlan = tipoPlanesArr.indexOf(tipPlan);
        const dataFormateada = formatearDataPlan(posTipPlan, data);

        dispatch(
          onUpdatePlan({
            tipo: posTipPlan,
            plan: dataFormateada,
          })
        );
        dispatch(onSetActivePlan(dataFormateada));

        //
      } else {
        //registrar
        const { data } = await createPlan(
          consultaActiva.id_consulta,
          formatearDataPlanToBD(planData)
        );
        const posTipPlan = tipoPlanesArr.indexOf(tipPlan);
        const dataFormateada = formatearDataPlan(posTipPlan, data);

        dispatch(
          onSavePlan({
            tipo: posTipPlan,
            plan: dataFormateada,
          })
        );
        dispatch(onSetActivePlan(dataFormateada));
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
          error: comprobarErrorPlan(error.response.data.message),
        })
      );
    }
  };

  const startDeletingPlan = async () => {
    try {
      await deletePlan(planActivo.id);

      dispatch(onDeletePlan(tipoPlanesArr.indexOf(planActivo.tipoPlan)));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return {
    //* Propiedades
    planesList,
    planActivo,
    errorMsgRegCons,

    //* Métodos
    startLoadPlanes,
    changeDataPlan,
    startSavingPlan,
    startDeletingPlan,
  };
};
