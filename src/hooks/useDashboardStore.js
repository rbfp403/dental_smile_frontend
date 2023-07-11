import { useDispatch, useSelector } from "react-redux";
import { getGananciasData, getPanelData } from "../api/dashboard.api";
import {
  onChangeMsgPanelCons,
  onChangeMsgPanelGastos,
  onChangeMsgPanelIngre,
  onChangeMsgPanelPac,
  onChangeMsgPanelProced,
  onLoadListConsPanel,
  onLoadListGastosPanel,
  onLoadListIngresoPanel,
  onLoadListPacPanel,
  onLoadListProcedPanel,
  onLoadListTotalGastos,
  onLoadListTotalIngreso,
  onChangeParametroBusqueda,
  onChangeMsgPanelGanan,
} from "../store";

import { formatearDataPacToTable } from "../pacientes/helpers";

import {
  formatearDataGastosToTable,
  formatearDataIngresosToTableGan,
  formatearDataProcedRealizadosToTable,
  switchDataDashboard,
} from "../dashboard/helpers";

//
//
//
//

export const useDashboardStore = () => {
  const dispatch = useDispatch();

  const {
    listPacientesPanel,
    listConsultasPanel,
    listProcedimientosPanel,

    //ganancias
    listGastosPanel,
    listIngresoPanel,
    totallistGastos,
    totallistIngreso,

    //Messages
    messagePanelPac,
    messagePanelCons,
    messagePanelProced,
    messagePanelIngre,
    messagePanelGastos,
    messagePanelGananc,

    //parametros
    parametrosBusqueda,
  } = useSelector((state) => state.dashboard);

  const startLoadPanel = async (tipo, param_fechaIni, fechaFin) => {
    //
    localStorage.setItem(
      "filtrosPanel",
      JSON.stringify({ tipo, param_fechaIni, fechaFin })
    );
    dispatch(
      onChangeParametroBusqueda({
        tipo,
        param_fechaIni,
        fechaFin,
      })
    );
    const parametroBusq = switchDataDashboard(tipo, param_fechaIni, fechaFin);

    //Pacientes
    try {
      const { data: dataPacientes } = await getPanelData(
        "pacientes",
        tipo,
        param_fechaIni,
        fechaFin
      );

      dispatch(onLoadListPacPanel(formatearDataPacToTable(dataPacientes)));

      dispatch(onChangeMsgPanelPac("Pacientes registrados " + parametroBusq));
    } catch (error) {
      if (error.response.data.message.includes("pacientes")) {
        dispatch(onLoadListPacPanel([]));
        dispatch(
          onChangeMsgPanelPac("No se registraron pacientes " + parametroBusq)
        );
      }
    }

    //Consultas
    try {
      const { data: dataConsultas } = await getPanelData(
        "consultas",
        tipo,
        param_fechaIni,
        fechaFin
      );

      dispatch(onLoadListConsPanel(dataConsultas));

      dispatch(onChangeMsgPanelCons("Consultas atendidas " + parametroBusq));
    } catch (error) {
      if (error.response.data.message.includes("consultas")) {
        dispatch(onLoadListConsPanel([]));
        dispatch(
          onChangeMsgPanelCons(
            "No existen consultas atendidas " + parametroBusq
          )
        );
      }
    }

    //Procedimientos
    try {
      const { data: dataProcedimientos } = await getPanelData(
        "procedimientos",
        tipo,
        param_fechaIni,
        fechaFin
      );

      dispatch(
        onLoadListProcedPanel(
          formatearDataProcedRealizadosToTable(dataProcedimientos)
        )
      );

      dispatch(
        onChangeMsgPanelProced(`Procedimientos realizados ` + parametroBusq)
      );
    } catch (error) {
      if (error.response.data.message.includes("procedimientos")) {
        dispatch(onLoadListProcedPanel([]));
        dispatch(
          onChangeMsgPanelProced(
            "No se existen procedimientos " + parametroBusq
          )
        );
      }
    }
  };

  /***************************************************************************** */
  /***************************************************************************** */

  const startLoadGanancias = async (tipo, param_fechaIni, fechaFin) => {
    localStorage.setItem(
      "filtrosGanancias",
      JSON.stringify({ tipo, param_fechaIni, fechaFin })
    );

    dispatch(
      onChangeParametroBusqueda({
        tipo,
        param_fechaIni,
        fechaFin,
      })
    );

    const parametroBusq = switchDataDashboard(tipo, param_fechaIni, fechaFin);

    dispatch(onChangeMsgPanelGanan("Ganancias " + parametroBusq));
    //ingresos
    try {
      const { data: dataIngresos } = await getGananciasData(
        "ingresos",
        tipo,
        param_fechaIni,
        fechaFin
      );

      dispatch(
        onLoadListIngresoPanel(formatearDataIngresosToTableGan(dataIngresos))
      );

      dispatch(onChangeMsgPanelIngre("Ingresos " + parametroBusq));
    } catch (error) {
      if (error.response.data.message.includes("ingresos")) {
        dispatch(onLoadListIngresoPanel([]));
        dispatch(
          onChangeMsgPanelIngre("No se registran ingresos " + parametroBusq)
        );
      }
    }

    //totalDeIngreso
    try {
      const { data: totalIngresos } = await getGananciasData(
        "sum_ingresos",
        tipo,
        param_fechaIni,
        fechaFin
      );

      let valorIngreso = 0;
      if (Object.values(totalIngresos[0])[0] !== null) {
        valorIngreso = parseFloat(Object.values(totalIngresos[0])[0]);
      }
      dispatch(onLoadListTotalIngreso(valorIngreso));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }

    //gastos
    try {
      const { data: dataGastos } = await getGananciasData(
        "gastos",
        tipo,
        param_fechaIni,
        fechaFin
      );

      dispatch(onLoadListGastosPanel(formatearDataGastosToTable(dataGastos)));

      dispatch(onChangeMsgPanelGastos("Gastos " + parametroBusq));
    } catch (error) {
      if (error.response.data.message.includes("gastos")) {
        dispatch(onLoadListGastosPanel([]));
        dispatch(
          onChangeMsgPanelGastos("No se registran gastos " + parametroBusq)
        );
      }
    }

    //totalDeGastos
    try {
      const { data: totalGastos } = await getGananciasData(
        "sum_gastos",
        tipo,
        param_fechaIni,
        fechaFin
      );

      let valorGasto = 0;
      if (Object.values(totalGastos[0])[0] !== null) {
        valorGasto = parseFloat(Object.values(totalGastos[0])[0]);
      }

      dispatch(onLoadListTotalGastos(valorGasto));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  //
  //

  return {
    // * Propiedades
    listPacientesPanel,
    listConsultasPanel,
    listProcedimientosPanel,
    listGastosPanel,
    listIngresoPanel,
    totallistGastos,
    totallistIngreso,
    messagePanelPac,
    messagePanelCons,
    messagePanelProced,
    messagePanelIngre,
    messagePanelGastos,
    messagePanelGananc,
    parametrosBusqueda,
    // * Métodos
    startLoadPanel,
    startLoadGanancias,
  };
};
