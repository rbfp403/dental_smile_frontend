import { forwardRef, useState, useEffect } from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Portal,
  Slide,
  Typography,
} from "@mui/material";
import {
  CancelOutlined,
  CheckCircleOutline,
  CloseOutlined,
  SaveOutlined,
  Subject,
} from "@mui/icons-material";
import {
  ButtonCustom,
  CustomAlert,
  IconTextField,
  RadioGroupCustom,
} from "../../ui";
import { useTipTratamStore } from "../../hooks";

//
//
//
//
//
//
const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});

export const FormTipTratam = ({
  openModalForm = false,
  setOpenModalForm,
  title,
}) => {
  //
  //customs hook store
  const { tipoTratamActivo, startSavingTipTratam, errorMsgRegTipoTratam } =
    useTipTratamStore();

  //hooks
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [msgAlert, setMsgAlert] = useState("");

  const [txtButton, setTxtButton] = useState("");

  const [stateRadioTt, setStateRadioTt] = useState("");

  const [stateTratamiento, setStateTratamiento] = useState("");

  useEffect(() => {
    if (title.toUpperCase().includes("EDITAR")) {
      setMsgAlert(`Se actualizaron los datos del tratamiento 🙂.`);
      setTxtButton("Actualizar");
      if (tipoTratamActivo) {
        setStateRadioTt(tipoTratamActivo.tipo_de_tratamiento);
        setStateTratamiento(tipoTratamActivo.tratamiento);
      }
    } else {
      setMsgAlert(`Tratamiento registrado con éxito 🙂.`);
      setTxtButton("Registrar");
      setStateRadioTt("");
      setStateTratamiento("");
    }
  }, [title, tipoTratamActivo]);

  const cerrarModal = () => {
    setOpenModalForm(false);
  };

  //control alert
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

  //control envio del formulario
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (stateTratamiento === "") return;
    if (stateRadioTt === "") return;

    startSavingTipTratam({
      ...tipoTratamActivo,
      tipo_de_tratamiento: stateRadioTt,
      tratamiento: stateTratamiento.trim(),
    });
  };

  //efecto secundario para comprobar errores en el registro y actualizacion
  useEffect(() => {
    if (errorMsgRegTipoTratam.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);
    }

    if (errorMsgRegTipoTratam.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegTipoTratam]);

  //
  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openModalForm}
        onClose={cerrarModal}
        TransitionComponent={Transition}
        keepMounted
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "colorIconMolar.main",
          },
        }}
      >
        <DialogTitle
          display="flex"
          padding="16px 10px 16px  20px !important"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          columnGap="50px"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              fontStyle: "italic",
              textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
              color: "white",
            }}
          >
            {title}
          </Typography>

          <IconButton onClick={cerrarModal}>
            <CloseOutlined style={{ fontSize: "25px", color: "white" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <form
            onSubmit={onSubmit}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <Box
              display="flex"
              border="2px solid white"
              padding="10px"
              borderRadius="5px"
              flexDirection="row"
              justifyContent="space-between"
              boxShadow="3px 5px 5px rgba(0, 0, 0, 0.5)"
            >
              <RadioGroupCustom
                title="Tipo de tratamiento"
                colorRadio="celesteNeon.main"
                colorTxt="white"
                colorLbl="white"
                fontwlbl="bold"
                fontSzlbl="16px"
                fontSztxt="15px"
                radioOptions={["Preventivo", "Clínico", "Curativo"]}
                hookRadio={stateRadioTt}
                setHookRadio={setStateRadioTt}
              />

              {stateRadioTt === "" ? (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#02ECEE",
                  }}
                >
                  Opción requerida
                </p>
              ) : (
                ""
              )}
            </Box>

            <Box
              display="flex"
              margin="20px 0px"
              flexDirection="column"
              rowGap="20px"
            >
              <IconTextField
                fullWidth
                label="Tratamiento:"
                type="text"
                multiline
                name="tratamiento"
                value={stateTratamiento}
                onChange={(event) => {
                  setStateTratamiento(event.target.value);
                }}
                helperText={
                  stateTratamiento.trim().length > 0 ? "" : "Campo requerido"
                }
                colorIcon="white"
                colorHover="celesteNeon.main"
                colorTxt="white"
                colorLabel="white"
                fontWlbl="bold"
                colorErr="celesteNeon.main"
                iconEnd={
                  <Icon>
                    <Subject />
                  </Icon>
                }
                propsXS={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "2px solid",
                      borderColor: "white",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& fieldset": {
                      border: "2px solid",
                      borderColor: "white",
                    },
                  },
                  "& .MuiOutlinedInput-root.Mui-error": {
                    "& fieldset": {
                      border: "2px solid",
                      borderColor: "white",
                    },
                  },
                  "&:hover fieldset": {
                    borderColor: "white !important ",
                  },
                  boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
                }}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              paddingTop="10px"
              columnGap="15px"
              justifyContent="center"
            >
              <ButtonCustom
                altura="40px"
                colorf="white"
                colorh="black"
                colort="black"
                colorth="celesteNeon.main"
                fontW="bold"
                txt_b="Cancelar"
                iconB={<CancelOutlined />}
                propsXS={{ border: "2px solid black" }}
                onClick={cerrarModal}
              />

              <ButtonCustom
                tipoBtn="submit"
                altura="40px"
                colorf="white"
                colorh="black"
                colort="black"
                colorth="celesteNeon.main"
                fontW="bold"
                txt_b={txtButton}
                iconB={<SaveOutlined />}
                propsXS={{ border: "2px solid black" }}
              />
            </Box>
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
          message={errorMsgRegTipoTratam.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </div>
  );
};
