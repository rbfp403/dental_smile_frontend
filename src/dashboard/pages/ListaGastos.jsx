import { useState, useEffect } from "react";
import { Box, Portal, Typography } from "@mui/material";
import { DeleteForever, MonetizationOn } from "@mui/icons-material";
import {
  ButtonCustom,
  CustomAlert,
  CustomDatePickerAntd,
  CustomRangeDate,
  CustomTable,
  DeleteConfirm,
} from "../../ui";
import { FormModalGasto } from "../components";
import { useDataStore, useGastosStore, useUiStore } from "../../hooks";
import { addZeroStr, arrMes } from "../../agenda/helpers";

const TABLE_HEAD_GASTOS = [
  { id: "desc", label: "Gasto por" },
  { id: "monto", label: "Monto" },
  { id: "fecha", label: "Fecha" },
  { id: "fecha_upd", label: "Fecha de actualización" },
];

//
//
//
//
//

export const ListaGastos = () => {
  //store

  const { changePage } = useUiStore();
  const { dataActiva } = useDataStore();

  const {
    gastosList,
    totalGastos,
    startGastosList,
    changeDataGasto,
    startDeletingGasto,
  } = useGastosStore();

  useEffect(() => {
    changePage();
    startGastosList("todos", "_", "_");
  }, []);

  //hook abrir el formulario
  const [stateModalFormGasto, setStateModalFormGasto] = useState(false);

  //hook cambiar titulo del formulario
  const [titleFormGasto, setTitleFormGasto] = useState("");

  //hook controlDialog Eliminar
  const [openDialogDeleteGas, setOpenDialogDeleteGas] = useState(false);

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

  //abrir el modal para crear un ingreso
  const openModalFormGasto = () => {
    setStateModalFormGasto(true);
    setTitleFormGasto("Registrar gasto $");
    changeDataGasto(null);
  };

  //abrir el modal para editar un ingreso
  const openModalEditGastos = () => {
    setStateModalFormGasto(true);
    setTitleFormGasto("Editar gasto $");
  };

  //abrir confirm dialog eliminar ingreso
  const handleOpenDialogDelGas = () => {
    setOpenDialogDeleteGas(true);
  };

  //manejadores alerta de eliminacion
  const handleCloseSnackbarDel = () => {
    setStateSnackbarErr(false);
  };
  const handleOpenSnackbarDel = () => {
    setStateSnackbarErr(true);
  };

  //eliminar pago
  const deleteGastos = async (selected = []) => {
    await startDeletingGasto(selected);
    if (selected.length <= 1) {
      setMsgAlertDel("El registro del gasto fue eliminado.");
    } else {
      setMsgAlertDel("Los registros fueron eliminados exitosamente.");
    }
    handleOpenSnackbarDel();
  };

  useEffect(() => {
    if (dataActiva[0] === "Lista de gastos") {
      changeDataGasto(dataActiva[1]);
    }
  }, [dataActiva]);

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

    //cambiar el rango de fecha
    setStateDatesRange({
      values,
      fechaIni: rangeString[0],
      fechaFin: rangeString[1],
    });

    if (values === null) {
      startGastosList("todos", "_", "_");
    }
  };

  useEffect(() => {
    if (stateDatesRange.values !== null) {
      const f1 = stateDatesRange.fechaIni + " 00:00:00";
      const f2 = stateDatesRange.fechaFin + " 23:59:59";

      startGastosList("range", f1, f2);
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

    //cambiar el año
    setStatePickerYear({
      valueYear: date,
      anioStr: dateString,
    });

    if (date === null) {
      startGastosList("todos", "_", "_");
    }
  };

  useEffect(() => {
    if (statePickerYear.valueYear !== null) {
      startGastosList("anio", statePickerYear.anioStr, "_");
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

    //cambiar el mes
    setStatePickerMonth({
      valueMonth: date,
      mesStr: dateString,
    });

    if (date === null) {
      startGastosList("todos", "_", "_");
    }
  };

  useEffect(() => {
    if (statePickerMonth.valueMonth !== null) {
      const mesAnio =
        statePickerMonth.mesStr.split(" ")[1] +
        addZeroStr(arrMes.indexOf(statePickerMonth.mesStr.split(" ")[0]) + 1);
      startGastosList("mes", mesAnio, "_");
    }
  }, [statePickerMonth]);

  /************************************************ */
  /************************************************ */

  const customFormat = (value) => {
    return arrMes[value["$d"].getMonth()] + " " + value["$d"].getFullYear();
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
          txt_b="Nuevo gasto"
          fontW="bold"
          iconB={<MonetizationOn />}
          propsXS={{ boxShadow: "none !important" }}
          onClick={openModalFormGasto}
        />
        <Typography color="white" fontWeight="bold" textAlign="center">
          Total <p>${totalGastos.toFixed(2)}</p>
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
          "linear-gradient(rgba(250,250,250, 0.2),rgba(250,250,250, 0.2)) , url(/assets/img/fondos/gastos.jpg)",
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
            Lista de gastos
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
        className=" box-shadow animate__animated animate__fadeInUp animate__faster"
        margin="30px 30px 0px 30px"
        // width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        rowGap="30px"
        sx={{
          backgroundColor: "rgba(255,255,255,0.9)",
          // padding: "10px",
          borderRadius: "5px",
        }}
      >
        <CustomTable
          TABLE_HEAD={TABLE_HEAD_GASTOS}
          DATALIST={gastosList}
          withToolbar
          withBoxSearch
          withButton
          iconosEnFila={false}
          columnaABuscarPri="fecha_upd"
          searchWhat="Buscar..."
          txt_header="Lista de gastos"
          btnToolbarTable={BtnToolbarTable}
          openModalEdit={openModalEditGastos}
          funcionBtnTblDelete={handleOpenDialogDelGas}
          funcionDeleteVarious={deleteGastos}
        />
      </Box>
      <FormModalGasto
        openModal={stateModalFormGasto}
        setOpenModal={setStateModalFormGasto}
        title={titleFormGasto}
      />

      <Portal>
        <DeleteConfirm
          stateOpen={openDialogDeleteGas}
          setStateOpen={setOpenDialogDeleteGas}
          message={"¿Está segura que desea eliminar el registro?"}
          funcionDelete={deleteGastos}
        />

        <CustomAlert
          stateSnackbar={stateSnackbarErr}
          handleCloseSnackbar={handleCloseSnackbarDel}
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
