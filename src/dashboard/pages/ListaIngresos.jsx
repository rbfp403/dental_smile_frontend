import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Portal, Typography } from "@mui/material";
import { DeleteForever, MonetizationOn } from "@mui/icons-material";
import { FaRegFolderOpen } from "react-icons/fa";
import {
  ButtonCustom,
  CustomAlert,
  CustomCollapsibleTable,
  CustomDatePickerAntd,
  CustomRangeDate,
  CustomSelectMultiple,
  CustomTable,
  DeleteConfirm,
} from "../../ui";
import { FormModalIngreso } from "../components";
import { useDataStore, useIngresosStore, useUiStore } from "../../hooks";
import { addZeroStr, arrMes } from "../../agenda/helpers";

const TABLE_HEAD = [
  { id: "fecha", label: "Fecha" },
  { id: "paciente", label: "Paciente" },
  { id: "tipo_consulta", label: "Tipo de consulta" },
  { id: "motivo", label: "Motivo" },
  { id: "problema", label: "Problema" },
  { id: "total", label: "Total" },
];

const TABLE_HEAD_COLLAPSED = [
  { id: "ingreso_por", label: "Ingreso por" },
  { id: "monto", label: "Monto" },
  { id: "nota", label: "Nota" },
  { id: "fecha", label: "Fecha" },
  { id: "fecha_upd", label: "Fecha de actualización" },
];

const getParamIngreso1 = (tipIng) => {
  switch (tipIng) {
    case "Procedimiento":
      return "procedimientos";
    case "Tipo de consulta":
      return "tipos_consulta";
    case "Otro motivo":
      return "otro_motivo";
    default:
      break;
  }
};
const getParamIngreso2 = (tipIng) => {
  if (tipIng.includes("Procedimiento") && tipIng.includes("Tipo de consulta")) {
    return "proced_tipcons";
  }
  if (tipIng.includes("Procedimiento") && tipIng.includes("Otro motivo")) {
    return "proced_user";
  }
  if (tipIng.includes("Tipo de consulta") && tipIng.includes("Otro motivo")) {
    return "tipcons_user";
  }
};

//
//
//

export const ListaIngresos = () => {
  //store

  const {
    ingresosConsList,
    ingresosList,
    totalIngCons,
    totalIngresos,
    startIngresosConsList,
    startIngresosList,
    changeDataIngreso,
    startDeletingIngresos,
  } = useIngresosStore();

  const { dataActiva } = useDataStore();

  const { handleChangeTabsCons, changePage } = useUiStore();

  useEffect(() => {
    changePage();
    startIngresosConsList("consultas", "todos", "_", "_");
    startIngresosList("todos", "_", "_");
  }, []);

  //hook abrir el formulario
  const [stateModalFormIng, setStateModalFormIng] = useState(false);
  //hook cambiar titulo del formulario
  const [titleFormIng, setTitleFormIng] = useState("");

  //hook controlDialog Eliminar
  const [openDialogDeleteIng, setopenDialogDeleteIng] = useState(false);

  //hook alert eliminacion
  const [stateSnackbarErr, setStateSnackbarErr] = useState(false);

  //hook mensaje del alert de eliminacion
  const [msgAlertDel, setMsgAlertDel] = useState("");

  //rangoDeFechas
  const [stateDatesRange, setStateDatesRange] = useState({
    values: null,
    fechaIni: "_",
    fechaFin: "_",
  });

  //hook date año
  const [statePickerYear, setStatePickerYear] = useState({
    valueYear: null,
    anioStr: "",
  });

  //hook date mes
  const [statePickerMonth, setStatePickerMonth] = useState({
    valueMonth: null,
    mesStr: "",
  });

  //hook tipo de ingreso
  const [tipIngreso, setTipIngreso] = useState([]);
  // const [paramTI, setParamTI] = useState("consultas");

  //hook parametros fechas
  const [paramFecha, setParamFecha] = useState({
    fecha: "todos",
    prm1: "_",
    prm2: "_",
  });

  //abrir el modal para crear un ingreso
  const openModalFormIng = () => {
    setStateModalFormIng(true);
    setTitleFormIng("Registrar ingreso $");
    changeDataIngreso(null);
  };

  //abrir el modal para editar un ingreso
  const openModalEditIng = () => {
    setStateModalFormIng(true);
    setTitleFormIng("Editar ingreso $");
  };

  //abrir confirm dialog eliminar ingreso
  const handleOpenDialogDelIng = () => {
    // changeDataPago(dataPago);
    setopenDialogDeleteIng(true);
  };

  //manejadores alerta de eliminacion
  const handleCloseSnackbarErr = () => {
    setStateSnackbarErr(false);
  };
  const handleOpenSnackbarErr = () => {
    setStateSnackbarErr(true);
  };

  //eliminar pago
  const deleteIngreso = async (selected = []) => {
    await startDeletingIngresos(selected);
    if (selected.length <= 1) {
      setMsgAlertDel("El registro del ingreso fue eliminado.");
    } else {
      setMsgAlertDel("Los registros fueron eliminados exitosamente.");
    }
    handleOpenSnackbarErr();
  };

  useEffect(() => {
    if (dataActiva[0] === "Otros ingresos") {
      changeDataIngreso(dataActiva[1]);
    }
  }, [dataActiva]);

  /**********************************TIPO DE INGRESO********************************* */
  const getStylesTipIng = (option) => {
    return {
      fontWeight: tipIngreso.indexOf(option) === -1 ? "normal" : "bold",
    };
  };

  const handleTipIngreso = (event) => {
    const {
      target: { value },
    } = event;
    setTipIngreso(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    switch (tipIngreso.length) {
      case 0:
        startIngresosConsList(
          "consultas",
          paramFecha.fecha,
          paramFecha.prm1,
          paramFecha.prm2
        );
        break;

      case 1:
        startIngresosConsList(
          getParamIngreso1(tipIngreso[0]),
          paramFecha.fecha,
          paramFecha.prm1,
          paramFecha.prm2
        );
        break;

      case 2:
        startIngresosConsList(
          getParamIngreso2(tipIngreso),
          paramFecha.fecha,
          paramFecha.prm1,
          paramFecha.prm2
        );
        break;

      case 3:
        startIngresosConsList(
          "consultas",
          paramFecha.fecha,
          paramFecha.prm1,
          paramFecha.prm2
        );
        break;

      default:
        break;
    }
  }, [tipIngreso, paramFecha]);

  /*******************************************RANGO DE FECHA ******************************************************** */

  const onChangeRangeDates = (values, rangeString) => {
    //Limpiar los demas componentes

    setStatePickerYear({
      valueYear: null,
      anioStr: "",
    });
    setStatePickerMonth({
      valueMonth: null,
      mesStr: "",
    });
    setTipIngreso([]);

    //cambiar el rango de fecha
    setStateDatesRange({
      values,
      fechaIni: rangeString[0],
      fechaFin: rangeString[1],
    });

    if (values === null) {
      startIngresosConsList("consultas", "todos", "_", "_");
      setParamFecha({
        fecha: "todos",
        prm1: "_",
        prm2: "_",
      });
      startIngresosList("todos", "_", "_");
    }
  };

  useEffect(() => {
    if (stateDatesRange.values !== null) {
      const f1 = stateDatesRange.fechaIni + " 00:00:00";
      const f2 = stateDatesRange.fechaFin + " 23:59:59";
      startIngresosConsList("consultas", "range", f1, f2);
      setParamFecha({
        fecha: "range",
        prm1: f1,
        prm2: f2,
      });
      startIngresosList("range", f1, f2);
    }
  }, [stateDatesRange]);

  /*******************************************  AÑO  ******************************************************** */

  const onChangeYear = (date, dateString) => {
    //Limpiar los demas componentes
    setStateDatesRange({ ...stateDatesRange, values: null });
    setStatePickerMonth({
      valueMonth: null,
      mesStr: "",
    });
    setTipIngreso([]);

    //cambiar el año
    setStatePickerYear({
      valueYear: date,
      anioStr: dateString,
    });

    if (date === null) {
      startIngresosConsList("consultas", "todos", "_", "_");
      setParamFecha({
        fecha: "todos",
        prm1: "_",
        prm2: "_",
      });
      startIngresosList("todos", "_", "_");
    }
  };

  useEffect(() => {
    if (statePickerYear.valueYear !== null) {
      startIngresosConsList("consultas", "anio", statePickerYear.anioStr, "_");
      setParamFecha({
        fecha: "anio",
        prm1: statePickerYear.anioStr,
        prm2: "_",
      });
      startIngresosList("anio", statePickerYear.anioStr, "_");
    }
  }, [statePickerYear]);

  /*******************************************  MES  ******************************************************** */

  const onChangeMonth = (date, dateString) => {
    //Limpiar los demas componentes
    setStateDatesRange({ ...stateDatesRange, values: null });
    setStatePickerYear({
      valueYear: null,
      anioStr: "",
    });
    setTipIngreso([]);

    //cambiar el mes
    setStatePickerMonth({
      valueMonth: date,
      mesStr: dateString,
    });

    if (date === null) {
      startIngresosConsList("consultas", "todos", "_", "_");
      setParamFecha({
        fecha: "todos",
        prm1: "_",
        prm2: "_",
      });
      startIngresosList("todos", "_", "_");
    }
  };

  useEffect(() => {
    if (statePickerMonth.valueMonth !== null) {
      const mesAnio =
        statePickerMonth.mesStr.split(" ")[1] +
        addZeroStr(arrMes.indexOf(statePickerMonth.mesStr.split(" ")[0]) + 1);

      startIngresosConsList("consultas", "mes", mesAnio, "_");

      setParamFecha({
        fecha: "mes",
        prm1: mesAnio,
        prm2: "_",
      });

      startIngresosList("mes", mesAnio, "_");
    }
  }, [statePickerMonth]);

  /************************************************ */
  /************************************************ */

  const customFormat = (value) => {
    return arrMes[value["$d"].getMonth()] + " " + value["$d"].getFullYear();
  };
  const BtnInFila = ({ infoRow }) => {
    return (
      <Link
        component={RouterLink}
        to={`/pacientes/${infoRow.id_paciente}/historial/${infoRow.id}`}
        style={{ textDecoration: "none" }}
      >
        <ButtonCustom
          txt_b_size="13px"
          altura="35px"
          colorf="transparent"
          colorh="transparent"
          colort="blueSecondary.main"
          colorth="primary.main"
          flexDir="column-reverse"
          txt_b="Abrir"
          fontW="bold"
          onClick={() => {
            handleChangeTabsCons(8);
          }}
          iconB={<FaRegFolderOpen />}
          propsXS={{ boxShadow: "none !important" }}
        />
      </Link>
    );
  };

  const ComponentBtnTable = ({}) => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        columnGap="20px"
      >
        <CustomSelectMultiple
          lblText="Ingresos por:"
          altura="30px"
          // ancho="378px"

          ancho="auto"
          listOptions={["Procedimiento", "Tipo de consulta", "Otro motivo"]}
          value={tipIngreso}
          onChange={handleTipIngreso}
          fnGetStyles={getStylesTipIng}
        />

        <Typography color="white" fontWeight="bold" textAlign="center">
          Total <p>${totalIngCons.toFixed(2)}</p>
        </Typography>
      </Box>
    );
  };
  const BtnToolbarTable = () => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        columnGap="15px"
      >
        <ButtonCustom
          altura="45px"
          txt_b_size="14px"
          flexDir="column-reverse"
          colorf="transparent"
          colorh="transparent"
          colort="white"
          colorth="celesteNeon.main"
          txt_b="Nuevo ingreso"
          fontW="bold"
          iconB={<MonetizationOn />}
          propsXS={{ boxShadow: "none !important" }}
          onClick={openModalFormIng}
        />
        <Typography color="white" fontWeight="bold" textAlign="center">
          Total <p>${totalIngresos.toFixed(2)}</p>
        </Typography>
      </Box>
    );
  };
  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",

        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.2),rgba(250,250,250, 0.2)) , url(/assets/img/fondos/ingresos.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        padding="20px"
        display="flex"
        flexDirection="column"
        // justifyContent="space-between"
        // alignItems="start"
        rowGap="10px"
        sx={{ backgroundColor: "myBgColor.main" }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h5"
            fontStyle="italic"
            fontWeight="bold"
            color="primary.main"
          >
            Lista de ingresos
          </Typography>

          <Box
            display="flex"
            columnGap="10px"
            flexDirection="row"
            alignSelf="end"
          >
            {/* selector de mes */}
            <CustomDatePickerAntd
              placeholder="Mes/Año"
              value={statePickerMonth.valueMonth}
              onChange={onChangeMonth}
              format={customFormat}
              picker="month"
              sxProps={{ width: "175px" }}
            />

            {/* selector año */}
            <CustomDatePickerAntd
              placeholder="Año"
              value={statePickerYear.valueYear}
              onChange={onChangeYear}
              picker="year"
              sxProps={{ width: "130px" }}
            />

            {/* selector de rango de fechas */}
            <CustomRangeDate
              value={stateDatesRange.values}
              onChange={onChangeRangeDates}
            />
          </Box>
        </Box>
      </Box>

      <Box
        className="animate__animated animate__fadeInUp animate__faster"
        margin="30px 30px 0px 30px"
        // width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap="30px"
        // sx={{ backgroundColor: "rgba(255,255,255,0.9)" }}
      >
        <Box
          width="100%"
          className="box-shadow"
          sx={{
            backgroundColor: "rgba(255,255,255,0.9)",
            // padding: "10px",
            borderRadius: "5px",
          }}
        >
          <CustomCollapsibleTable
            TABLE_HEAD={TABLE_HEAD}
            DATALIST={ingresosConsList}
            withToolbar
            withBoxSearch
            withButton
            withCheckbox={false}
            iconosEnFila
            columnaABuscarPri="fecha"
            searchWhat={"Buscar ..."}
            txt_header={"Lista de ingresos por consulta"}
            dataOmitida={3}
            routePaciente={(row) => `/pacientes/${row.id_paciente}/historial`}
            BtnInFila={BtnInFila}
            titleTablaCollapsed="Pagos por consulta"
            TABLE_HEAD_COLLAPSED={TABLE_HEAD_COLLAPSED}
            propertyCollapsed="pagos"
            btnToolbarTable={ComponentBtnTable}
          />
        </Box>
        <Box
          width="100%"
          className="box-shadow"
          sx={{
            backgroundColor: "rgba(255,255,255,0.9)",
            // padding: "10px",
            borderRadius: "5px",
          }}
        >
          <CustomTable
            TABLE_HEAD={TABLE_HEAD_COLLAPSED}
            DATALIST={ingresosList}
            withToolbar
            withBoxSearch
            withButton
            iconosEnFila={false}
            columnaABuscarPri="fecha"
            searchWhat="Buscar..."
            txt_header="Otros ingresos"
            btnToolbarTable={BtnToolbarTable}
            openModalEdit={openModalEditIng}
            funcionBtnTblDelete={handleOpenDialogDelIng}
            funcionDeleteVarious={deleteIngreso}
          />
        </Box>
      </Box>
      <FormModalIngreso
        openModal={stateModalFormIng}
        setOpenModal={setStateModalFormIng}
        title={titleFormIng}
      />

      <Portal>
        <DeleteConfirm
          stateOpen={openDialogDeleteIng}
          setStateOpen={setopenDialogDeleteIng}
          message={"¿Está segura que desea eliminar el registro?"}
          funcionDelete={deleteIngreso}
        />

        <CustomAlert
          stateSnackbar={stateSnackbarErr}
          handleCloseSnackbar={handleCloseSnackbarErr}
          title={"Completado"}
          message={msgAlertDel}
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<DeleteForever sx={{ color: "white" }} />}
        />
      </Portal>
    </div>
  );
};
