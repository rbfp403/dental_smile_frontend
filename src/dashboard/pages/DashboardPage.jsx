import { useEffect, useState } from "react";
import { Box, ToggleButtonGroup } from "@mui/material";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  ButtonCustom,
  CustomDatePickerAntd,
  CustomRangeDate,
  MyButtonInGroup,
  Topbar,
} from "../../ui";
import {
  CardDashboard,
  FormChangePassword,
  MenuListDashboard,
} from "../components";
import { useDashboardStore, useUiStore } from "../../hooks";
import { addZeroStr, arrMes } from "../../agenda/helpers";

/*************************************************************************************************** */

export const DashboardPage = () => {
  //
  const { changePage } = useUiStore();

  useEffect(() => {
    changePage();
  }, []);

  const {
    listPacientesPanel,
    listConsultasPanel,
    listProcedimientosPanel,
    totallistGastos,
    totallistIngreso,
    startLoadPanel,
    startLoadGanancias,
  } = useDashboardStore();

  //estado de consulta actual
  const [stateToogleBtns, setStateToogleBtns] = useState("sem_act");

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

  /*****************************************CONSULTAS ACTUALES ********************************************************** */
  const handleChangeToogleBtn = (event, newAlignment) => {
    setStateToogleBtns(newAlignment);
  };

  useEffect(() => {
    if (stateToogleBtns) {
      //Limpiar los demas componentes
      setStateDatesRange({ ...stateDatesRange, values: null });
      setStatePickerYear({
        valueYear: null,
        anioStr: "",
      });
      setStatePickerMonth({
        valueMonth: null,
        mesStr: "",
      });

      //Consultas por dia, semana, mes, ano actual
      startLoadPanel(stateToogleBtns, "_", "_");
      startLoadGanancias(stateToogleBtns, "_", "_");
    }
  }, [stateToogleBtns]);

  /*******************************************RANGO DE FECHA ******************************************************** */

  const onChangeRangeDates = (values, rangeString) => {
    //Limpiar los demas componentes
    setStateToogleBtns(null);
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

    if (!values) {
      setStateToogleBtns("sem_act");
    }
  };

  useEffect(() => {
    if (stateDatesRange.values !== null) {
      startLoadPanel(
        "range",
        stateDatesRange.fechaIni + " 00:00:00",
        stateDatesRange.fechaFin + " 23:59:59"
      );
      startLoadGanancias(
        "range",
        stateDatesRange.fechaIni + " 00:00:00",
        stateDatesRange.fechaFin + " 23:59:59"
      );
    }
  }, [stateDatesRange]);

  /*******************************************  AÑO  ******************************************************** */

  const onChangeYear = (date, dateString) => {
    //Limpiar los demas componentes
    setStateToogleBtns(null);
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

    if (!date) {
      setStateToogleBtns("sem_act");
    }
  };

  useEffect(() => {
    if (statePickerYear.valueYear !== null) {
      startLoadPanel("anio", statePickerYear.anioStr, "_");
      startLoadGanancias("anio", statePickerYear.anioStr, "_");
    }
  }, [statePickerYear]);

  /*******************************************  MES  ******************************************************** */

  const onChangeMonth = (date, dateString) => {
    //Limpiar los demas componentes
    setStateToogleBtns(null);
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

    if (!date) {
      setStateToogleBtns("sem_act");
    }
  };

  useEffect(() => {
    if (statePickerMonth.valueMonth !== null) {
      const mesAnio =
        statePickerMonth.mesStr.split(" ")[1] +
        addZeroStr(arrMes.indexOf(statePickerMonth.mesStr.split(" ")[0]) + 1);

      startLoadPanel("mes", mesAnio, "_");
      startLoadGanancias("mes", mesAnio, "_");
    }
  }, [statePickerMonth]);

  /*************************************************************************************************** */
  /*************************************************************************************************** */

  const customFormat = (value) => {
    return arrMes[value["$d"].getMonth()] + " " + value["$d"].getFullYear();
  };

  //change password

  const [stateFormChangePass, setStateFormChangePass] = useState(false);

  const openModalChangePassword = () => {
    setStateFormChangePass(true);
  };
  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.1),rgba(250,250,250, 0.1)), url(/assets/img/fondos/dashboardPage.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div style={{ backgroundColor: "#f5f7fa" }}>
        <Topbar />
      </div>
      <Box
        className="box-shadow animate__animated animate__fadeIn"
        margin="30px"
        padding="30px"
        display="flex"
        flexDirection="column"
        rowGap="20px"
        sx={{ backgroundColor: "rgba(255,255,255,0.9)" }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* botones dia, semana, mes, año */}
          <ToggleButtonGroup
            size="medium"
            exclusive
            value={stateToogleBtns}
            onChange={handleChangeToogleBtn}
            sx={{
              margin: "2px",
              height: "41px",
              boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
              ":hover": {
                boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <MyButtonInGroup value="dia_act" text={"Día"} />
            <MyButtonInGroup value="sem_act" text={"Semana"} />
            <MyButtonInGroup value="mes_act" text={"Mes"} />
            <MyButtonInGroup value="ani_act" text={"Año"} />
          </ToggleButtonGroup>

          {/* selector de fechas, año, rango de fecha */}
          <Box display="flex" flexDirection="row" columnGap="5px">
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

        {/* cardDashboard */}
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <CardDashboard
            iconName={"patient_bed3"}
            resultado={listPacientesPanel.length}
            label={"Pacientes"}
            route={"pacientes_data"}
          />
          <CardDashboard
            iconName={"calendar_molar"}
            resultado={listConsultasPanel.length}
            label={"Consultas"}
            route={"consultas_atendidas"}
          />
          <CardDashboard
            iconName={"tool_dentist3"}
            resultado={listProcedimientosPanel.length}
            label={"Procedimientos"}
            route={"procedimientos_realizados"}
          />
          <CardDashboard
            iconName={"ganancias3"}
            resultado={`$${parseFloat(
              totallistIngreso - totallistGastos
            ).toFixed(2)}`}
            label={"Ganancias"}
            route={"ganancias_data"}
          />
        </Box>
      </Box>

      <Box
        className="animate__animated animate__fadeIn"
        margin="30px 30px 0px 30px"
        display="flex"
        flexWrap="wrap"
        rowGap="15px"
        columnGap="15px"
      >
        <MenuListDashboard
          txtLabel={"Lista de procedimientos odontológicos"}
          route={"listaprocedimientosodon"}
        />
        <MenuListDashboard
          txtLabel={"Lista de tipos de consultas odontológicas"}
          route={"listatiposconsodon"}
        />
        <MenuListDashboard
          txtLabel={"Lista de tratamientos odontológicos"}
          route={"listatipostratam"}
        />
        <MenuListDashboard
          txtLabel={"Lista de tipos de pagos"}
          route={"listatipospagos"}
        />
        <MenuListDashboard
          txtLabel={"Lista de ingresos"}
          route={"listaingresos"}
        />
        <MenuListDashboard txtLabel={"Lista de gastos"} route={"listagastos"} />
      </Box>
      <Box display="flex" justifyContent="end" paddingRight="20px">
        <ButtonCustom
          altura={"42px"}
          colorf={"rgba(255,255,255,0.7)"}
          colorh={"primary.main"}
          colort={"primary.main"}
          colorth={"white"}
          txt_b={"Cambiar contraseña"}
          flexDir="row"
          txt_b_size="17px"
          // fontW="bold"
          propsXS={{ borderRadius: "5px !important" }}
          iconB={<RiLockPasswordLine />}
          onClick={openModalChangePassword}
        />
      </Box>
      <FormChangePassword
        openModal={stateFormChangePass}
        setOpenModal={setStateFormChangePass}
      />
    </div>
  );
};
