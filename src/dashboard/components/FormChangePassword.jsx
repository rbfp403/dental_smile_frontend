import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Portal,
  Typography,
} from "@mui/material";

import {
  CancelOutlined,
  CheckCircleOutline,
  CloseOutlined,
  SaveOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";

import { useAuthStore } from "../../hooks";

//
//
//

export const FormChangePassword = ({ openModal, setOpenModal }) => {
  //

  //store
  const { errorMsgAuth, logout, updatePassword } = useAuthStore();

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //hook actual contraseña
  const [stateActPass, setStateActPass] = useState("");

  //hook nueva Contraseña
  const [stateNewPass, setStateNewPass] = useState("");

  //control actual contraseña

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //control  nueva contraseña
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

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

  //limpiar los componentes del formulario
  const resetInputText = () => {
    setStateNewPass("");
    setStateActPass("");
  };

  //cerrarModal
  const cerrarModal = () => {
    setOpenModal(false);
    resetInputText();
  };

  //funcion enviar los datos
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (stateActPass === "") return;
    if (stateNewPass.length < 6) return;

    updatePassword(stateActPass, stateNewPass);
  };

  //manejador de errores todos los campos
  useEffect(() => {
    if (errorMsgAuth.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setTimeout(() => {
        logout();
      }, 2000);
    }
    if (errorMsgAuth.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
    }
    setFormSubmitted(false);
  }, [errorMsgAuth]);

  //

  return (
    <>
      <Dialog
        maxWidth="sm"
        open={openModal}
        onClose={cerrarModal}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "colorIconMolar.main",
            width: "400px",
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
              color: "white",
            }}
          >
            Cambiar contraseña
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
            <Grid
              container
              sx={{
                display: "grid",
                paddingTop: "15px",
                alignItems: "start",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, max-content)",
                gridTemplateAreas: ` "actPass actPass  actPass""newPass newPass newPass "  
              "btnReg btnReg btnReg"
              `,
                rowGap: "25px",
                columnGap: "25px",
              }}
            >
              <Grid item gridArea="actPass">
                <IconTextField
                  fullWidth
                  label="Contraseña actual"
                  type={showPassword ? "text" : "password"}
                  value={stateActPass}
                  onChange={({ target }) => {
                    setStateActPass(target.value);
                  }}
                  colorIcon="white"
                  colorHover="celesteNeon.main"
                  colorTxt="white"
                  colorLabel="white"
                  iconEnd={
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  }
                  helperText={
                    stateActPass.trim().length > 0 ? "" : "Campo requerido"
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
                  }}
                />
              </Grid>

              <Grid item gridArea="newPass">
                <IconTextField
                  fullWidth
                  label="Nueva contraseña"
                  type={showPassword2 ? "text" : "password"}
                  value={stateNewPass}
                  onChange={({ target }) => {
                    setStateNewPass(target.value);
                  }}
                  colorIcon="white"
                  colorHover="celesteNeon.main"
                  colorTxt="white"
                  colorLabel="white"
                  iconEnd={
                    <IconButton onClick={handleClickShowPassword2}>
                      {showPassword2 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  }
                  helperText={
                    stateNewPass.trim().length >= 6
                      ? ""
                      : "La contraseña debe ser mayor o igual a 6 caracteres"
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
                  }}
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
                  altura="40px"
                  colorf="white"
                  colorh="black"
                  colort="black"
                  colorth="celesteNeon.main"
                  fontW="bold"
                  txt_b="Cancelar"
                  iconB={<CancelOutlined />}
                  propsXS={{
                    border: "2px solid black",
                    boxShadow: "none !important",
                  }}
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
                  txt_b="Actualizar"
                  iconB={<SaveOutlined />}
                  propsXS={{
                    border: "2px solid black",
                    boxShadow: "none !important",
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Contraseña actualizada correctamente"}
          message="Ingrese con la nueva contraseña"
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
        />

        <CustomAlert
          stateSnackbar={stateSnackbarError}
          handleCloseSnackbar={handleCloseSnackbarError}
          title={""}
          message={errorMsgAuth.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </>
  );
};
