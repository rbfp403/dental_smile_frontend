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
  SaveOutlined,
  SegmentOutlined,
  Subject,
} from "@mui/icons-material";

import { BsFileMedical } from "react-icons/bs";

import {
  ButtonCustom,
  CustomAlert,
  CustomAutocomplete,
  CustomDatePicker,
  CustomTimePicker,
  IconTextField,
} from "../../ui";

import {
  useAgendaStore,
  useConsultasStore,
  useTipConsStore,
} from "../../hooks";

//
//
//

export const FormModalCons = () => {
  //store
  const {
    consultaActiva,
    stateOpenFormCons,
    titleFormConsulta,
    errorMsgRegCons,
    changeStateFormCons,
    startSavingConsulta,
  } = useConsultasStore();

  const { startUpdatingCitaState } = useAgendaStore();

  const { tipoConsListBusq, startLoadTipConsList } = useTipConsStore();
  //lista de pacientes traida de la store

  useEffect(() => {
    startLoadTipConsList();
  }, []);

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //hook tipCons list
  const [stateTipConsList, setStateTipConsList] = useState(null);

  //hook date picker
  const [stateDatePicker, setStateDatePicker] = useState(new Date());
  //hook error en la fecha
  const [errorDate, setErrorDate] = useState(null);

  //hook time picker
  const [stateTimeIni, setStateTimeIni] = useState(new Date());
  //hook error en la hora
  const [errorHourInit, setErrorHourInit] = useState(null);

  //hook motivo consulta
  const [stateMotivo, setStateMotivo] = useState("");

  //hook problema consulta
  const [stateProbl, setStateProbl] = useState("");

  //hook txt btn
  const [txtButton, setTxtButton] = useState("");

  //cerrarModal
  const cerrarModal = () => {
    changeStateFormCons(false);
  };
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

  const resetInputText = () => {
    setStateTipConsList(null);
    setStateDatePicker(new Date());
    setStateTimeIni(new Date());
    setStateMotivo("");
    setStateProbl("");
  };
  //control formulario de registro y edición
  useEffect(() => {
    if (consultaActiva) {
      //setear datos
      const tipoConsulta = tipoConsListBusq.find(
        (tipCons) => tipCons.id === consultaActiva.id_tipoConsul
      );

      setStateTipConsList(tipoConsulta === undefined ? null : tipoConsulta);
      setStateDatePicker(consultaActiva.fecha_consulta_date);
      setStateTimeIni(consultaActiva.hora_consulta_date);
      setStateMotivo(consultaActiva.mot_consulta);
      setStateProbl(consultaActiva.probleAct_consulta);

      //
    } else {
      resetInputText();
    }
  }, [consultaActiva]);

  useEffect(() => {
    if (titleFormConsulta.includes("Editar")) {
      setTxtButton("Actualizar");
      setMsgAlert(`Se actualizaron los datos de la consulta 🙂.`);
      //
      // }
    } else {
      setTxtButton("Registrar");
      setMsgAlert(`Se registro una nueva consulta odontológica 🙂.`);
    }
  }, [titleFormConsulta]);

  //errores de fechas y horas
  const errorMsgDate = useMemo(() => {
    if (stateDatePicker === null) {
      return "Fecha inválida";
    } else {
      switch (errorDate) {
        case "minDate": {
          return "Fecha muy antigua";
        }
        case "maxDate": {
          return "Fecha muy lejana";
        }
        case "invalidDate": {
          return "Fecha inválida";
        }

        default: {
          return "";
        }
      }
    }
  }, [errorDate, stateDatePicker]);

  const errorMsgHourInit = useMemo(() => {
    if (errorHourInit === "invalidDate" || stateTimeIni === null) {
      return "Hora inválida";
    } else {
      return "";
    }
  }, [errorHourInit, stateTimeIni]);

  //funcion enviar los datos
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    //validaciones
    if (stateTipConsList === null) return;
    if (errorMsgDate !== "") return;
    if (errorMsgHourInit !== "") return;
    if (stateMotivo.length === 0) return;

    //enviando al custom hook

    if (titleFormConsulta.includes("Editar")) {
      startSavingConsulta({
        id: consultaActiva.id_consulta,
        id_tipoConsulta: stateTipConsList.id,
        stateDatePicker,
        stateTimeIni,
        stateMotivo,
        stateProbl,
      });
    } else {
      startSavingConsulta({
        id_tipoConsulta: stateTipConsList.id,
        stateDatePicker,
        stateTimeIni,
        stateMotivo,
        stateProbl,
      });
      if (consultaActiva.updateCita === true) {
        startUpdatingCitaState(
          consultaActiva.fecha_cita,
          consultaActiva.hora_inicio_cite,
          { esta_citaAgen: "Atendida" }
        );
      }
    }
  };
  //manejador de errores todos los campos
  useEffect(() => {
    if (errorMsgRegCons.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);

      //cuando el registro es exitoso
      if (!titleFormConsulta.includes("Editar")) {
        resetInputText();
      }
    }
    if (errorMsgRegCons.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegCons]);

  //

  return (
    <>
      <Dialog maxWidth="sm" open={stateOpenFormCons} onClose={cerrarModal}>
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
            {titleFormConsulta}
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
                gridTemplateAreas: `"tipCons tipCons dates"
              "motivo motivo motivo"
              "problema problema problema"
              "btnReg btnReg btnReg"
              `,
                rowGap: "25px",
                columnGap: "25px",
              }}
            >
              <Grid item gridArea="tipCons">
                <CustomAutocomplete
                  fullWidth
                  disablePortal
                  options={tipoConsListBusq}
                  getOptionLabel={(option) => option.label}
                  value={stateTipConsList}
                  onChange={(event, newValue) => {
                    setStateTipConsList(newValue);
                  }}
                  propsTextField={{
                    label: "Tipo de consulta:",
                    placeholder: "Seleccione un tipo de consulta",
                    error: stateTipConsList === null && formSubmitted,
                    helperText:
                      stateTipConsList === null
                        ? "Debe seleccionar un tipo de consulta"
                        : "",
                  }}
                  autoFocus
                  iconAutocomplete={<Subject />}
                  heightList="220px"
                />
              </Grid>

              <Grid
                item
                gridArea="dates"
                display="flex"
                flexDirection="column"
                rowGap="20px"
              >
                <CustomDatePicker
                  label={"Fecha:"}
                  views={["month", "day"]}
                  value={stateDatePicker}
                  onChange={(newValue) => {
                    setStateDatePicker(newValue);
                  }}
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
                <CustomTimePicker
                  ampm={false}
                  label={"Hora:"}
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

              <Grid item gridArea="motivo">
                <IconTextField
                  fullWidth
                  label="Motivo de consulta:"
                  type="text"
                  multiline
                  value={stateMotivo}
                  onChange={({ target }) => {
                    setStateMotivo(target.value);
                  }}
                  error={stateMotivo.trim().length === 0 && formSubmitted}
                  helperText={
                    stateMotivo.trim().length === 0
                      ? "Debe agregar un motivo de la cita"
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

              <Grid item gridArea="problema">
                <IconTextField
                  fullWidth
                  label="Problema Actual:"
                  type="text"
                  multiline
                  value={stateProbl}
                  onChange={({ target }) => {
                    setStateProbl(target.value);
                  }}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <BsFileMedical />
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
          title={"Registro no completado"}
          message={errorMsgRegCons.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </>
  );
};
