import { useState, useEffect } from "react";

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
  AttachMoney,
  CancelOutlined,
  CheckCircleOutline,
  CloseOutlined,
  MonetizationOn,
  SaveOutlined,
} from "@mui/icons-material";

import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";

import { useGastosStore } from "../../hooks";

//
//
//

export const FormModalGasto = ({ openModal, setOpenModal, title }) => {
  //store

  const { gastoActivo, errorMsgRegGasto, startSavingGasto, changeDataGasto } =
    useGastosStore();

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //hook txt btn
  const [txtButton, setTxtButton] = useState("");

  //hook ingreso por
  const [stateGasto, setStateGasto] = useState("");

  //hook precio
  const [statePrecio, setStatePrecio] = useState("");

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
    setStateGasto("");
    setStatePrecio("");
  };

  //control formulario de registro y edición
  useEffect(() => {
    if (gastoActivo && title.includes("Editar")) {
      //cargar los componentes
      setStateGasto(gastoActivo.desc);
      setStatePrecio(gastoActivo.monto);
    } else {
      resetInputText();
    }
  }, [gastoActivo, title]);

  useEffect(() => {
    if (title.includes("Editar")) {
      setTxtButton("Actualizar");
      setMsgAlert(`Se actualizaron los datos del ingreso $ 🙂.`);
      //
      // }
    } else {
      setTxtButton("Registrar");
      setMsgAlert(`Se registró un nuevo ingreso $ 🙂.`);
    }
  }, [title]);

  //cerrarModal
  const cerrarModal = () => {
    setOpenModal(false);
    changeDataGasto(null);
    resetInputText();
  };

  //funcion enviar los datos
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    //validaciones
    if (stateGasto.length === 0) return;
    if (statePrecio.length === 0) return;

    //enviando al custom hook
    startSavingGasto({
      desc: stateGasto,
      monto: statePrecio,
    });
  };

  //manejador de errores todos los campos
  useEffect(() => {
    if (errorMsgRegGasto.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);
    }
    if (errorMsgRegGasto.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegGasto]);

  //

  return (
    <>
      <Dialog
        maxWidth="sm"
        open={openModal}
        onClose={cerrarModal}
        sx={{
          "& .MuiPaper-root": {
            width: "600px",
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
            <Grid
              container
              sx={{
                display: "grid",
                paddingTop: "15px",
                alignItems: "start",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, max-content)",
                gridTemplateAreas: ` ". .  monto""gasto_por gasto_por gasto_por "
             
              "btnReg btnReg btnReg"
              `,
                rowGap: "25px",
                columnGap: "25px",
              }}
            >
              <Grid item gridArea="monto" display="flex" alignItems="end">
                <IconTextField
                  fullWidth
                  label="Monto:"
                  type="number"
                  value={statePrecio}
                  onChange={({ target }) => {
                    setStatePrecio(target.value);
                  }}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  colorErr="celesteNeon.main"
                  helperText={statePrecio.length === 0 ? "Obligatorio" : ""}
                  iconEnd={
                    <Icon>
                      <AttachMoney />
                    </Icon>
                  }
                />
              </Grid>

              <Grid item gridArea="gasto_por">
                <IconTextField
                  fullWidth
                  rows={2}
                  label="Gasto por:"
                  type="text"
                  multiline
                  value={stateGasto}
                  onChange={({ target }) => {
                    setStateGasto(target.value);
                  }}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  colorErr="celesteNeon.main"
                  helperText={stateGasto.length === 0 ? "Obligatorio" : ""}
                  iconEnd={<MonetizationOn />}
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
          message={errorMsgRegGasto.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </>
  );
};
