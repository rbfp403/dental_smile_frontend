import { useMemo, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Portal,
  Typography,
} from "@mui/material";
import {
  CancelOutlined,
  CheckCircleOutline,
  CloseOutlined,
  PersonSearch,
  SaveOutlined,
  SegmentOutlined,
} from "@mui/icons-material";
import {
  ButtonCustom,
  CustomAlert,
  CustomAutocomplete,
  CustomDatePicker,
  CustomTimePicker,
  IconTextField,
} from "../../ui";
import { useAgendaStore, usePacienteStore } from "../../hooks";
import { extraerFecha, retornarHourWithNewDate } from "../helpers";

//
//
//

export const AgendaModal = () => {
  //

  //store
  const { pacientesListBusq, pacienteActivo } = usePacienteStore();

  //citaActiva

  const {
    titleFormAgenda,
    stateOpenFormAgenda,
    changeStateFormAgenda,
    activeCita,
    changeDataCite,
    startSavingCita,
    startUpdatingCita,
    errorRegCiteMessage,
    blockPaciente,
  } = useAgendaStore();

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //hook txt btn
  const [txtButton, setTxtButton] = useState("");

  //hook pacientes list
  const [statePacList, setStatePacList] = useState(0);
  const [statePacValue, setStatePacValue] = useState(null);
  //hook date picker
  const [stateDatePicker, setStateDatePicker] = useState(new Date());

  //hook time picker inicio
  const [stateTimeIni, setStateTimeIni] = useState(new Date());

  //hook time picker fin
  const [stateTimeFin, setStateTimeFin] = useState(new Date());

  //hook errores en las fechas
  const [errorDate, setErrorDate] = useState(null);
  const [errorHourInit, setErrorHourInit] = useState(null);
  const [errorHourFin, setErrorHourFin] = useState(null);

  //hook inputTextField
  const [stateMotivo, setStateMotivo] = useState("");

  //control alert
  const [msgAlert, setMsgAlert] = useState("");
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //control alert error
  const [stateSnackbarError, setStateSnackbarError] = useState(false);
  const handleCloseSnackbarError = () => {
    setStateSnackbarError(false);
  };
  const handleOpenSnackbarError = () => {
    setStateSnackbarError(true);
  };

  //cerrarModal
  const cerrarModal = () => {
    changeStateFormAgenda(false);
    changeDataCite(null);
    setErrorDate(null);
    setErrorHourInit(null);
    setErrorHourFin(null);
  };

  //efecto secundario de cambio de la consulta activa
  //extraer fecha, horaI, fechaF del activeCita
  useEffect(() => {
    //
    if (activeCita) {
      //en registro y edicion la fecha y horas ya se setean
      setStateDatePicker(activeCita.start);
      setStateTimeIni(activeCita.start);
      setStateTimeFin(activeCita.end);

      //editar cita
      if (activeCita.id_paciente !== undefined) {
        //
        setStatePacList(activeCita.id_paciente);
        setStatePacValue(
          pacientesListBusq.find(
            (paciente) => paciente.id === activeCita.id_paciente
          )
        );
        setStateMotivo(activeCita.motivo);
      }

      //registrar cita
      else {
        setStatePacList(0);
        setStatePacValue(null);
        setStateMotivo("");
      }
    }
  }, [activeCita]);

  useEffect(() => {
    if (titleFormAgenda.includes("Editar")) {
      setTxtButton("Actualizar");
      if (activeCita) {
        setMsgAlert(
          `Se actualizaron los datos de la cita de ${activeCita.paciente} 🙂.`
        );
      }
    } else {
      setTxtButton("Registrar");
      setMsgAlert(`Se agendó una nueva cita 🙂.`);
    }
  }, [titleFormAgenda, activeCita]);

  //handler del cambio en la fecha
  const onChangeDatePicker = (newValue) => {
    setStateDatePicker(newValue);
    setStateTimeIni((state) => retornarHourWithNewDate(state, newValue));
    setStateTimeFin((state) => retornarHourWithNewDate(state, newValue));
  };

  //errores de fechas y horas
  const errorMsgDate = useMemo(() => {
    switch (errorDate) {
      case "maxDate": {
        return "Fecha muy lejana";
      }
      case "invalidDate": {
        return "Fecha inválida";
      }
      case "disablePast": {
        return "Esta fecha ya pasó";
      }
      default: {
        return "";
      }
    }
  }, [errorDate]);

  const errorMsgHourInit = useMemo(() => {
    if (
      errorHourInit === "minTime" &&
      errorDate === null &&
      extraerFecha(stateDatePicker) === extraerFecha(new Date()) &&
      new Date().getHours() > 7
    )
      return "Esta hora ya pasó";
    else if (
      (errorHourInit === "minTime" || errorHourInit === "maxTime") &&
      errorDate === null
    ) {
      return "Esta hora esta fuera del rango del horario";
    } else {
      return "";
    }
  }, [errorHourInit, errorDate]);

  const errorMsgHourFin = useMemo(() => {
    if (errorHourFin === "minTime") {
      return "La hora de fin mínima solo puede ser 15 minutos despues de la hora de inicio";
    } else if (errorHourFin === "maxTime") {
      return "Esta hora esta fuera del rango del horario";
    } else {
      return "";
    }
  }, [errorHourFin]);

  //

  //funcion enviar los datos
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    //validaciones

    if (!blockPaciente) {
      if (statePacList === 0) return;
    }
    if (errorDate !== null) return;
    if (errorHourInit !== null) return;
    if (errorHourFin !== null) return;
    if (stateMotivo.length === 0) return;

    //enviando al custom hook

    if (titleFormAgenda.includes("Editar")) {
      startUpdatingCita(activeCita.fecha, activeCita.hora, {
        statePacList: !blockPaciente ? statePacList : pacienteActivo.id,
        stateDatePicker,
        stateTimeIni,
        stateTimeFin,
        stateMotivo,
      });
    } else {
      startSavingCita({
        statePacList: !blockPaciente ? statePacList : pacienteActivo.id,
        stateDatePicker,
        stateTimeIni,
        stateTimeFin,
        stateMotivo,
      });
    }
  };

  //manejador de errores todos los campos
  useEffect(() => {
    if (errorRegCiteMessage.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);
    }
    if (errorRegCiteMessage.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorRegCiteMessage]);

  //
  return (
    <>
      <Dialog maxWidth="sm" open={stateOpenFormAgenda} onClose={cerrarModal}>
        <DialogTitle
          padding="16px 10px 16px  20px !important"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              fontStyle: "italic",
              textShadow: "0px 1px 1px rgba(0, 0, 0, 0.4)",
            }}
          >
            {titleFormAgenda}
          </Typography>

          <IconButton onClick={cerrarModal}>
            <CloseOutlined style={{ fontSize: "25px", color: "#602a90" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <form
            onSubmit={onSubmit}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <Grid
              container
              sx={{
                display: "grid",
                paddingTop: "15px",
                alignItems: "start",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(4, max-content)",
                gridTemplateAreas: !blockPaciente
                  ? `"paciente paciente paciente"
              "fecha horaIni horaFin"
              "motivo motivo motivo"
              "btnReg btnReg btnReg "
              `
                  : `"fecha horaIni horaFin"
              "motivo motivo motivo"
              "btnReg btnReg btnReg "
              `,
                rowGap: "30px",
                columnGap: "10px",
              }}
            >
              {!blockPaciente && (
                <Grid item gridArea="paciente">
                  <CustomAutocomplete
                    fullWidth
                    disablePortal
                    options={pacientesListBusq}
                    getOptionLabel={(option) => option.label}
                    value={statePacValue}
                    onChange={(event, newValue) => {
                      setStatePacValue(newValue);
                      newValue !== null
                        ? setStatePacList(newValue.id)
                        : setStatePacList(0);
                    }}
                    propsTextField={{
                      label: "Pacientes:",
                      placeholder: "Seleccione un paciente",
                      error: statePacList === 0 && formSubmitted,
                      helperText:
                        statePacList === 0
                          ? "Debe seleccionar un paciente de la lista"
                          : "",
                    }}
                    autoFocus
                    iconAutocomplete={<PersonSearch />}
                    heightList="220px"
                  />
                </Grid>
              )}
              <Grid item gridArea="fecha">
                <CustomDatePicker
                  label={"Fecha:"}
                  views={["year", "month", "day"]}
                  disablePast
                  value={stateDatePicker}
                  onChange={onChangeDatePicker}
                  onError={(newError) => {
                    setErrorDate(newError);
                  }}
                  slotProps={{
                    textField: {
                      helperText: errorMsgDate,
                      error: errorMsgDate !== "" && formSubmitted,
                    },
                  }}
                />
              </Grid>

              <Grid item gridArea="horaIni">
                <CustomTimePicker
                  // disablePast
                  minTime={
                    extraerFecha(stateDatePicker) ===
                      extraerFecha(new Date()) && new Date().getHours() > 7
                      ? new Date(0, 0, 0, new Date().getHours())
                      : new Date(0, 0, 0, 7)
                  }
                  maxTime={new Date(0, 0, 0, 20)}
                  ampm={false}
                  label={"Hora Inicio:"}
                  value={stateTimeIni}
                  onChange={(newValue) => {
                    setStateTimeIni(newValue);
                  }}
                  onError={(newError) => {
                    setErrorHourInit(newError);
                  }}
                  slotProps={{
                    textField: {
                      helperText: errorMsgHourInit,
                      error: errorMsgHourInit !== "" && formSubmitted,
                    },
                  }}
                />
              </Grid>

              <Grid item gridArea="horaFin">
                <CustomTimePicker
                  minTime={new Date(15 * 60000 + stateTimeIni.getTime())}
                  maxTime={new Date(0, 0, 0, 20)}
                  ampm={false}
                  label={"Hora Fin:"}
                  value={stateTimeFin}
                  onChange={(newValue) => {
                    setStateTimeFin(newValue);
                  }}
                  onError={(newError) => {
                    setErrorHourFin(newError);
                  }}
                  slotProps={{
                    textField: {
                      helperText: errorMsgHourFin,
                      error: errorMsgHourFin !== "" && formSubmitted,
                    },
                  }}
                />
              </Grid>

              <Grid item gridArea="motivo">
                <IconTextField
                  fullWidth
                  label="Motivo de consulta:"
                  type="text"
                  multiline
                  name="moti_citaAgen"
                  value={stateMotivo}
                  onChange={({ target }) => {
                    setStateMotivo(target.value);
                  }}
                  error={stateMotivo.trim().length === 0 && formSubmitted}
                  helperText={
                    stateMotivo.trim().length === 0
                      ? "Debe agregar el motivo de la cita"
                      : ""
                  }
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <SegmentOutlined />
                    </Icon>
                  }
                />
              </Grid>

              <Grid
                item
                gridArea="btnReg"
                display="flex"
                flexDirection="row"
                columnGap="10px"
                rowGap="10px"
                justifyContent="center"
              >
                <ButtonCustom
                  altura={"40px"}
                  colorf={"white"}
                  colorh={"btnHoverInForm.main"}
                  colort={"black"}
                  txt_b={"Cancelar"}
                  colorth={"white"}
                  propsXS={{ border: "1px solid black" }}
                  iconB={<CancelOutlined />}
                  onClick={cerrarModal}
                />

                <ButtonCustom
                  tipoBtn="submit"
                  altura="40px"
                  colorf="primary.main"
                  colorh="btnHoverInForm.main"
                  colort="white"
                  txt_b={txtButton}
                  iconB={<SaveOutlined />}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message={msgAlert}
        colorbg="blueSecondary.main"
        colortxt="white"
        iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
      />

      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbarError}
          handleCloseSnackbar={handleCloseSnackbarError}
          title={"Agendamiento no completado"}
          message={errorRegCiteMessage.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </>
  );
};
