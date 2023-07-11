import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { DeleteForever, ExpandMore } from "@mui/icons-material";
import { MdPostAdd } from "react-icons/md";
import {
  ButtonCustom,
  CustomAlert,
  CustomRangeDate,
  CustomSelect,
  DeleteConfirm,
} from "../../ui";
import { ProxCiteItem } from "../components";
import { AgendaModal } from "../../agenda/components";
import { useAgendaStore, usePacienteStore } from "../../hooks";
import { extraerFecha } from "../../agenda/helpers";

//
//
//
export const ProxCitasPagePaciente = () => {
  //

  const {
    futurasCitasList,
    startLoadFuturasCitas,
    errorLoadFutCitas,
    pacienteActivo,
  } = usePacienteStore();

  const {
    stateOpenFormAgenda,
    changeStateFormAgenda,
    changeTitleFormAgenda,
    changeBlockPaciente,
    changeDataCite,
    startDeletingCite,
    stateOpenDeleteConf,
    changeStateDeleteCofirm,
  } = useAgendaStore();

  //hooks
  //rangoDeFechas
  const [stateDatesRange, setStateDatesRange] = useState({
    fechaIni: "_",
    fechaFin: "_",
  });
  const setearFechas = (values) => {
    values === null
      ? setStateDatesRange({
          fechaIni: "_",
          fechaFin: "_",
        })
      : setStateDatesRange({
          fechaIni: extraerFecha(values[0]["$d"]).replaceAll("/", "-"),
          fechaFin: extraerFecha(values[1]["$d"]).replaceAll("/", "-"),
        });
  };

  //estado citas
  const [stateCita, setStateCita] = useState("Pendientes");

  const funcSearch = async () => {
    await startLoadFuturasCitas(
      stateCita.slice(0, stateCita.length - 1),
      stateDatesRange.fechaIni,
      stateDatesRange.fechaFin
    );
  };

  //estado de los expansion Panel
  const [arrayPanel, setArrayPanel] = useState({});
  const handlerPanel = (mes, isExpanded) => {
    setArrayPanel({ ...arrayPanel, [`${mes}`]: isExpanded });
  };

  useEffect(() => {
    funcSearch();
  }, [
    pacienteActivo,
    stateCita,
    stateDatesRange,
    stateOpenFormAgenda,
    stateOpenDeleteConf,
  ]);

  const handleOpenModalAgenda = () => {
    changeTitleFormAgenda("Agendar cita para " + pacienteActivo.nombre);
    changeStateFormAgenda(true);
    changeBlockPaciente(true);
    changeDataCite({
      start: new Date(),
      end: new Date(0, 0, 0, new Date().getHours() + 2),
    });
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
  const deleteRegisterCita = async () => {
    await startDeletingCite();
    funcSearch();
    handleOpenSnackbar();
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",

        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.2),rgba(250,250,250, 0.2)) , url(/assets/img/fondos/pacienteHistorial.jpg)",
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
            alignItems="end"
            justifyContent="center"
          >
            <Box display="flex" flexDirection="column">
              <Typography
                fontSize="12px"
                fontWeight="bold"
                color="primary.main"
              >
                Rango de Fechas:
              </Typography>
              <CustomRangeDate onChange={setearFechas} />
            </Box>

            <Box display="flex" flexDirection="column">
              <CustomSelect
                lblText="Estado de las citas:"
                altura="42px"
                ancho="135px"
                listOptions={["Pendientes", "Perdidas"]}
                value={stateCita}
                onChange={(event) => {
                  setStateCita(event.target.value);
                }}
              />
            </Box>
          </Box>

          <ButtonCustom
            altura={"60px"}
            colorf={"rgba(255,255,255,0.9)"}
            colorh={"primary.main"}
            colort={"primary.main"}
            colorth={"white"}
            txt_b={"Agendar cita"}
            flexDir="column-reverse"
            txt_b_size="15px"
            fontW="bold"
            propsXS={{ boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)" }}
            iconB={<MdPostAdd />}
            onClick={handleOpenModalAgenda}
          />
        </Box>
      </div>
      <div
        className="animate__animated animate__fadeInRight animate__faster"
        style={{ padding: "30px" }}
      >
        {futurasCitasList !== null ? (
          errorLoadFutCitas !== null ? (
            <Typography variant="h5" margin="40px">
              {errorLoadFutCitas}
            </Typography>
          ) : (
            futurasCitasList.map((citaFu) => {
              //longitud de los arreglos

              const longArrCite = citaFu[Object.keys(citaFu)[0]].length;
              if (longArrCite > 0) {
                const titleMes = Object.keys(citaFu)[0];
                return (
                  <Accordion
                    defaultExpanded={true}
                    key={titleMes}
                    expanded={arrayPanel[`${titleMes}`]}
                    onChange={(event, isExpanded) => {
                      handlerPanel(titleMes, isExpanded);
                    }}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.8)",
                      marginBottom: "20px",
                      boxShadow: "5px 7px 7px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      sx={{
                        borderBottom: "3px solid",
                        borderBottomColor:
                          stateCita === "Pendientes"
                            ? "blueSecondary.main"
                            : "error.main",

                        svg: {
                          color:
                            stateCita === "Pendientes"
                              ? "blueSecondary.main"
                              : "error.main",
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
                          color={
                            stateCita === "Pendientes"
                              ? "blueSecondary.main"
                              : "error.main"
                          }
                        >
                          {titleMes.replace("_", " ")}
                        </Typography>

                        <Typography
                          fontStyle="italic"
                          fontWeight="bold"
                          textTransform="capitalize"
                          fontSize="20px"
                          color={
                            stateCita === "Pendientes"
                              ? "blueSecondary.main"
                              : "error.main"
                          }
                        >{`(${longArrCite})`}</Typography>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "30px 20px 60px 20px ",
                      }}
                    >
                      <Box
                        width="95%"
                        display="flex"
                        flexDirection="column"
                        rowGap="20px"
                      >
                        {citaFu[Object.keys(citaFu)[0]].map((cita) => {
                          return (
                            <ProxCiteItem
                              key={cita.fecha_cita + cita.hora_inicio}
                              cita={cita}
                            />
                          );
                        })}
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
      <AgendaModal />

      <DeleteConfirm
        stateOpen={stateOpenDeleteConf}
        setStateOpen={changeStateDeleteCofirm}
        message={
          <>
            ¿Está segura que desea eliminar la cita agendada de
            <span style={{ color: "#9c27b0" }}>
              {pacienteActivo !== null && ` ${pacienteActivo.nombre}`}
            </span>
            ?
          </>
        }
        funcionDelete={deleteRegisterCita}
      />
      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message={"Cita eliminada"}
        colorbg="blueSecondary.main"
        colortxt="white"
        iconAlert={<DeleteForever sx={{ color: "white" }} />}
      />
    </div>
  );
};
