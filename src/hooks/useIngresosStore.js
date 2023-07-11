import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorIngresoMsg,
  onChangeRegErrIngreso,
  onDeleteIngreso,
  onLoadIngresosConsList,
  onLoadIngresosList,
  onSaveIngreso,
  onSetActiveIngreso,
  onSetTotalesIngreso,
  onSetTotalesIngresoCons,
  onUpdateIngreso,
} from "../store";
import {
  createIngreso,
  deleteIngreso,
  getAllingresos,
  updateIngreso,
} from "../api/dashboard.api";
import {
  comprobarErrorIngreso,
  formatearDataConsIngToTable,
  formatearDataIngresoToBD,
  formatearDataIngresosToTable,
} from "../dashboard/helpers";

//
//
//
//
//

export const useIngresosStore = () => {
  //

  const dispatch = useDispatch();

  const {
    ingresosList,
    ingresosConsList,
    ingresoActivo,
    errorMsgRegIngreso,
    totalIngCons,
    totalIngresos,
  } = useSelector((state) => state.ingresos);

  //funciones
  const startIngresosConsList = async (fil_tipo, fil_fecha, prm1, prm2) => {
    try {
      const { data } = await getAllingresos(fil_tipo, fil_fecha, prm1, prm2);

      const dataFormateada = formatearDataConsIngToTable(data);
      dispatch(onLoadIngresosConsList(dataFormateada));

      const total = dataFormateada.reduce((acc, totalAct) => {
        return acc + totalAct.total;
      }, 0);

      dispatch(onSetTotalesIngresoCons(total));
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Ingresos no encontrados") {
        dispatch(onLoadIngresosConsList([]));
        dispatch(onSetTotalesIngresoCons(0));
      }
    }
  };

  const startIngresosList = async (fil_fecha, prm1, prm2) => {
    try {
      const { data } = await getAllingresos("usuario", fil_fecha, prm1, prm2);

      const dataFormateada = formatearDataIngresosToTable(data);

      dispatch(onLoadIngresosList(dataFormateada));

      const total = dataFormateada.reduce((acc, montoAct) => {
        return acc + montoAct.monto;
      }, 0);
      dispatch(onSetTotalesIngreso(total));
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Ingresos no encontrados") {
        dispatch(onLoadIngresosList([]));
        dispatch(onSetTotalesIngreso(0));
      }
    }
  };

  const changeDataIngreso = (dataIngreso) => {
    dispatch(onSetActiveIngreso(dataIngreso));
  };

  const startSavingIngreso = async (dataIngreso) => {
    dispatch(clearErrorIngresoMsg());
    try {
      if (ingresoActivo) {
        //actualizar
        const { data } = await updateIngreso(
          ingresoActivo.id,
          formatearDataIngresoToBD(dataIngreso)
        );

        dispatch(onUpdateIngreso(formatearDataIngresosToTable([data])[0]));
        dispatch(onSetActiveIngreso(formatearDataIngresosToTable([data])[0]));
        //
      } else {
        //registrar
        const { data } = await createIngreso(
          formatearDataIngresoToBD(dataIngreso)
        );
        dispatch(onSaveIngreso(formatearDataIngresosToTable([data])[0]));
        dispatch(onSetActiveIngreso(formatearDataIngresosToTable([data])[0]));
      }

      dispatch(onChangeRegErrIngreso({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        onChangeRegErrIngreso({
          msg: "Hay errores",
          error: comprobarErrorIngreso(error.response.data.message),
        })
      );
    }
  };

  const startDeletingIngresos = async (arrIdIngresos = []) => {
    try {
      if (arrIdIngresos.length === 0) {
        await deleteIngreso(ingresoActivo.id);
      } else {
        for (const i of arrIdIngresos) {
          await deleteIngreso(i);
        }
      }
      dispatch(onDeleteIngreso(arrIdIngresos));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    ingresosList,
    ingresosConsList,
    ingresoActivo,
    errorMsgRegIngreso,
    totalIngCons,
    totalIngresos,

    //* Métodos
    startIngresosConsList,
    startIngresosList,
    changeDataIngreso,
    startSavingIngreso,
    startDeletingIngresos,
  };
};
