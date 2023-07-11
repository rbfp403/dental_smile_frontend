import { useState, useEffect } from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
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
} from "@mui/icons-material";

import {
  ButtonCustom,
  CustomAlert,
  CustomAutocomplete,
  IconTextField,
  RadioGroupCustom,
} from "../../ui";

import { usePlanesStore, useTipTratamStore } from "../../hooks";

const tipoExamenes = ["Rayos X", "Biometria", "Química Sanguinea", "Otro"];

//
//
//

export const FormModalPlan = ({ openModal, setOpenModal, title, tipoPlan }) => {
  //

  //store
  const { tipoTratamList, startLoadTipTratamList } = useTipTratamStore();

  const { planActivo, startSavingPlan, errorMsgRegCons } = usePlanesStore();

  //

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //hook txt btn
  const [txtButton, setTxtButton] = useState("");

  //hook tipo de tratamiento
  const [stateRadioTt, setStateRadioTt] = useState("");

  //hook tratamiento
  const [stateTratam, setStateTratam] = useState(null);

  //hook examen
  const [stateExamen, setStateExamen] = useState(null);

  //hook descripcion
  const [stateDescripcion, setStateDescripcion] = useState("");

  //cerrarModal
  const cerrarModal = () => {
    setOpenModal(false);
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

  //limpiar los componentes del formulario
  const resetInputText = () => {
    setStateRadioTt("");
    setStateTratam(null);
    setStateExamen(null);
    setStateDescripcion("");
  };

  //control formulario de registro y edición
  useEffect(() => {
    if (title.includes("Editar")) {
      setTxtButton("Actualizar");
      setMsgAlert(`Se actualizaron los datos del plan ${tipoPlan} 🙂.`);
      //
      // }
    } else {
      setTxtButton("Registrar");
      setMsgAlert(`Se registro un nuevo plan ${tipoPlan} 🙂.`);
    }
  }, [title]);

  //
  useEffect(() => {
    if (title.includes("Editar") && planActivo) {
      //cargar los componentes
      switch (tipoPlan) {
        case "de Diagnóstico":
          setStateExamen(planActivo.examen_solicitado);
          break;

        case "terapéutico":
          setStateRadioTt(planActivo.tipo_de_tratamiento);
          break;

        default:
          break;
      }
      setStateDescripcion(planActivo.descripcion);
    } else {
      resetInputText();
    }
  }, [planActivo, title]);

  //efecto secundario radio group tipo tratamiento
  useEffect(() => {
    let tipoConsulta = "";
    let param2 = "";
    switch (stateRadioTt) {
      case "":
        tipoConsulta = "todos";
        param2 = "_";
        break;
      case "Clínico":
        tipoConsulta = "tipo";
        param2 = "Clinico";
        break;
      case "Preventivo":
        tipoConsulta = "tipo";
        param2 = "Preventivo";
        break;
      case "Curativo":
        tipoConsulta = "tipo";
        param2 = "Curativo";
        break;

      default:
        break;
    }
    startLoadTipTratamList(tipoConsulta, param2);
  }, [stateRadioTt]);

  //efecto secundario tratamiento
  useEffect(() => {
    if (tipoPlan === "terapéutico" && planActivo) {
      //cargar los componentes
      const tratam = tipoTratamList.find(
        (ttram) => ttram.id === planActivo.id_tipoTratam
      );

      setStateTratam(tratam === undefined ? null : tratam);
    }
  }, [tipoTratamList, planActivo]);

  //

  //funcion enviar los datos
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    switch (tipoPlan) {
      case "de Diagnóstico":
        //validando
        if (stateExamen === null) return;

        //enviando al custom hook
        startSavingPlan("Diagnóstico", {
          tipPlan: "Diagnóstico",
          examen: stateExamen,
          id_trata: "",
          descripcion: stateDescripcion.trim(),
        });
        break;

      case "terapéutico":
        //validando
        if (stateTratam === null) return;

        //enviando al custom hook
        startSavingPlan("Terapéutico", {
          tipPlan: "Terapéutico",
          examen: "",
          id_trata: stateTratam.id,
          descripcion: stateDescripcion.trim(),
        });
        break;

      default:
        //validando
        if (stateDescripcion.trim().length === 0) return;

        //enviando al custom hook
        startSavingPlan("Educacional", {
          tipPlan: "Educacional",
          examen: "",
          id_trata: "",
          descripcion: stateDescripcion,
        });
        break;
    }
  };

  //manejador de errores todos los campos
  useEffect(() => {
    if (errorMsgRegCons.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);

      //cuando el registro es exitoso
      if (!title.includes("Editar")) {
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
      <Dialog
        maxWidth="md"
        open={openModal}
        onClose={cerrarModal}
        sx={{
          "& .MuiPaper-root": {
            width: "500px",
          },
        }}
      >
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
            {title}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "15px",
                alignItems: "end",
                rowGap: "25px",
                columnGap: "25px",
              }}
            >
              {tipoPlan === "terapéutico" && (
                <>
                  <Box
                    display="flex"
                    padding="10px"
                    borderRadius="5px"
                    flexDirection="row"
                    justifyContent="space-between"
                    boxShadow="1px 3px 3px rgba(0, 0, 0, 0.5)"
                    alignSelf="end"
                  >
                    <RadioGroupCustom
                      title="Tipo de tratamiento"
                      colorRadio="primary.main"
                      colorTxt="black"
                      fontSzlbl="12px"
                      colorLbl="#602A90"
                      fontSztxt="14px"
                      radioOptions={["Preventivo", "Clínico", "Curativo"]}
                      hookRadio={stateRadioTt}
                      setHookRadio={setStateRadioTt}
                    />
                  </Box>

                  <Box width="325px">
                    <CustomAutocomplete
                      fullWidth
                      // disablePortal
                      options={tipoTratamList}
                      getOptionLabel={(option) => option.tratamiento}
                      value={stateTratam}
                      onChange={(event, newValue) => {
                        setStateTratam(newValue);
                      }}
                      propsTextField={{
                        label: "Tratamiento:",
                        placeholder: "Seleccione un tratamiento",
                        error: stateTratam === null && formSubmitted,
                        helperText:
                          stateTratam === null
                            ? "Debe seleccionar un tratamiento"
                            : "",
                      }}
                      iconAutocomplete={
                        <img
                          type="img/svg"
                          width="25px"
                          height="25px"
                          src={`/assets/icons/formPlan/tratam.svg`}
                        />
                      }
                      heightList="260px"
                    />
                  </Box>
                </>
              )}

              {tipoPlan === "de Diagnóstico" && (
                <Box width="325px">
                  <CustomAutocomplete
                    fullWidth
                    // disablePortal
                    options={tipoExamenes}
                    value={stateExamen}
                    onChange={(event, newValue) => {
                      setStateExamen(newValue);
                    }}
                    propsTextField={{
                      label: "Examen solicitado:",
                      placeholder: "Seleccione un tipo de examen",
                      error: stateExamen === null && formSubmitted,
                      helperText:
                        stateExamen === null
                          ? "Debe seleccionar un tipo de examen"
                          : "",
                    }}
                    autoFocus
                    iconAutocomplete={
                      <img
                        type="img/svg"
                        width="25px"
                        height="25px"
                        src={`/assets/icons/formPlan/examenSol.svg`}
                      />
                    }
                    heightList="260px"
                  />
                </Box>
              )}
              <IconTextField
                fullWidth
                rows={4}
                label="Descripción:"
                type="text"
                multiline
                value={stateDescripcion}
                onChange={({ target }) => {
                  setStateDescripcion(target.value);
                }}
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

              <Box
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
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message={msgAlert}
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
        />

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
