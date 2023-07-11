import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { DeleteForever, ExpandMore } from "@mui/icons-material";
import { FaNotesMedical } from "react-icons/fa";
import {
  ButtonCustom,
  CustomAlert,
  CustomDatePickerAntd,
  CustomRangeDate,
  DeleteConfirm,
} from "../../ui";
import { ConsultaItem, FormModalCons } from "../components";
import { useConsultasStore, usePacienteStore } from "../../hooks";
import { addZeroStr, arrMes } from "../../agenda/helpers";

//
//
//
export const HistorialPagePaciente = () => {
  //

  const { pacienteActivo } = usePacienteStore();

  const {
    consultasList,
    errorLoadConsultas,
    stateOpenDelCons,

    startLoadConsultas,
    startDeletingConsulta,
    changeStateFormCons,
    changeTitleFormCons,
    changeStateDelCons,
    changeDataConsulta,
  } = useConsultasStore();

  useEffect(() => {
    startLoadConsultas("no_filtros", "_", "_");
  }, [pacienteActivo]);

  //hooks
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

  // hook paneles
  const [arrayPanel, setArrayPanel] = useState({});

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
      startLoadConsultas("no_filtros", "_", "_");
    }
  };

  useEffect(() => {
    if (stateDatesRange.values !== null) {
      startLoadConsultas(
        "range",
        stateDatesRange.fechaIni,
        stateDatesRange.fechaFin
      );
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
      startLoadConsultas("no_filtros", "_", "_");
    }
  };

  useEffect(() => {
    if (statePickerYear.valueYear !== null) {
      startLoadConsultas("anio", statePickerYear.anioStr, "_");
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
      startLoadConsultas("no_filtros", "_", "_");
    }
  };

  useEffect(() => {
    if (statePickerMonth.valueMonth !== null) {
      const mesAnio =
        statePickerMonth.mesStr.split(" ")[1] +
        addZeroStr(arrMes.indexOf(statePickerMonth.mesStr.split(" ")[0]) + 1);

      startLoadConsultas("mes", mesAnio, "_");
    }
  }, [statePickerMonth]);

  //estado de los expansion Panel
  const handlerPanel = (mes, isExpanded = true) => {
    setArrayPanel({ ...arrayPanel, [`${mes}`]: isExpanded });
  };

  //abrir modal registrar consuta
  const handleOpenModalCons = () => {
    changeTitleFormCons("Registrar consulta odontológica");
    changeStateFormCons(true);
    changeDataConsulta(null);
  };

  //control alert
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //Confirm Dialog
  const deleteRegisterConsulta = async () => {
    await startDeletingConsulta();
    handleOpenSnackbar();
  };

  const customFormat = (value) => {
    return arrMes[value["$d"].getMonth()] + " " + value["$d"].getFullYear();
  };

  let iteratorColor = 0;
  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.3),rgba(250,250,250, 0.3)) , url(/assets/img/fondos/fondohistory.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="headerFutCitas animate__animated animate__fadeInDown animate__faster">
        <Box
          width="100%"
          padding="30px"
          display="flex"
          alignItems="center"
          flexDirection="row"
          alignContent="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="row"
            columnGap="10px"
            alignItems="center"
            justifyContent="center"
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

            <CustomRangeDate
              value={stateDatesRange.values}
              onChange={onChangeRangeDates}
            />
          </Box>

          <ButtonCustom
            altura={"50px"}
            colorf={"rgba(255,255,255,0.8)"}
            colorh={"primary.main"}
            colort={"primary.main"}
            colorth={"white"}
            txt_b={"Registrar consulta"}
            flexDir="row"
            txt_b_size="16px"
            fontW="bold"
            propsXS={{
              boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
              // width: "100px",
            }}
            iconB={<FaNotesMedical />}
            onClick={handleOpenModalCons}
          />
        </Box>
      </div>
      <div
        className="animate__animated animate__fadeInRight animate__faster"
        style={{ padding: "30px" }}
      >
        {consultasList !== null ? (
          errorLoadConsultas !== null ? (
            <Typography variant="h5" margin="20px">
              {errorLoadConsultas}
            </Typography>
          ) : (
            consultasList.map((consultasArr) => {
              //longitud de los arreglos

              const longArrCons =
                consultasArr[Object.keys(consultasArr)[0]].length;
              if (longArrCons > 0) {
                const titleMes = Object.keys(consultasArr)[0];
                return (
                  <Accordion
                    elevation={0}
                    key={titleMes}
                    defaultExpanded={true}
                    expanded={arrayPanel[`${titleMes}`]}
                    onChange={(event, isExpanded) => {
                      handlerPanel(titleMes, isExpanded);
                    }}
                    sx={{
                      backgroundColor: "transparent",
                      margin: "0px",
                      marginBottom: "20px",

                      "&:before": {
                        display: "none",
                      },

                      // boxShadow: "5px 7px 7px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        // borderTop: "2px solid",
                        // borderTopColor: "blueSecondary.main",
                        borderBottom: "3px solid",
                        borderBottomColor: "blueSecondary.main",
                        // backgroundColor: "rgba(255,255,255,0.2)",
                        svg: {
                          color: "blueSecondary.main",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          marginRight: "15px",
                        }}
                      >
                        <Typography
                          fontStyle="italic"
                          fontWeight="bold"
                          textTransform="capitalize"
                          fontSize="20px"
                          color="blueSecondary.main"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.2)",
                          }}
                        >
                          {titleMes.replace("_", " ")}
                        </Typography>

                        <Typography
                          fontStyle="italic"
                          fontWeight="bold"
                          textTransform="capitalize"
                          fontSize="20px"
                          color="blueSecondary.main"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.2)",
                          }}
                        >{`(${longArrCons})`}</Typography>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "30px 20px 40px 20px ",
                      }}
                    >
                      <Box
                        width="95%"
                        display="flex"
                        flexDirection="column"
                        rowGap="40px"
                      >
                        {consultasArr[Object.keys(consultasArr)[0]].map(
                          (consulta) => {
                            iteratorColor++;
                            return (
                              <ConsultaItem
                                iteratorColor={iteratorColor}
                                consultaItem={consulta}
                              />
                            );
                          }
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              }
            })
          )
        ) : (
          ""
        )}
      </div>
      <FormModalCons />

      <DeleteConfirm
        stateOpen={stateOpenDelCons}
        setStateOpen={changeStateDelCons}
        message={
          <>
            ¿Está segura que desea eliminar la consulta de
            <span style={{ color: "#9c27b0" }}>
              {pacienteActivo !== null && ` ${pacienteActivo.nombre}`}
            </span>
            ?
          </>
        }
        funcionDelete={deleteRegisterConsulta}
      />
      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message={"Consulta eliminada"}
        colorbg="blueSecondary.main"
        colortxt="white"
        iconAlert={<DeleteForever sx={{ color: "white" }} />}
      />
    </div>
  );
};
