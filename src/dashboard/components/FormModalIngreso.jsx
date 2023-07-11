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
  SegmentOutlined,
} from "@mui/icons-material";

import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";

import { useIngresosStore } from "../../hooks";

//
//
//

export const FormModalIngreso = ({ openModal, setOpenModal, title }) => {
  //store

  const {
    ingresoActivo,
    errorMsgRegIngreso,
    startSavingIngreso,
    changeDataIngreso,
  } = useIngresosStore();

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //hook txt btn
  const [txtButton, setTxtButton] = useState("");

  //hook ingreso por
  const [stateIngreso, setStateIngreso] = useState("");

  //hook precio
  const [statePrecio, setStatePrecio] = useState("");

  //hook descripcion
  const [stateNota, setStateNota] = useState("");

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
    setStateIngreso("");
    setStatePrecio("");
    setStateNota("");
  };

  //control formulario de registro y edición
  useEffect(() => {
    if (ingresoActivo && title.includes("Editar")) {
      //cargar los componentes
      setStateIngreso(ingresoActivo.ingreso_por);
      setStatePrecio(ingresoActivo.monto);
      setStateNota(ingresoActivo.nota);
    } else {
      resetInputText();
    }
  }, [ingresoActivo, title]);

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
    changeDataIngreso(null);
    resetInputText();
  };

  //funcion enviar los datos
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    //validaciones
    if (stateIngreso.length === 0) return;
    if (statePrecio.length === 0) return;

    //enviando al custom hook
    startSavingIngreso({
      text_ingreso: stateIngreso,
      monto_ingreso: parseFloat(statePrecio),
      desc_ingreso: stateNota,
    });
  };

  //manejador de errores todos los campos
  useEffect(() => {
    if (errorMsgRegIngreso.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);
    }
    if (errorMsgRegIngreso.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegIngreso]);

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
                gridTemplateRows: "repeat(4, max-content)",
                gridTemplateAreas: `"pago_por pago_por pago_por " ". .  monto"
              "nota nota nota"
              "btnReg btnReg btnReg"
              `,
                rowGap: "25px",
                columnGap: "25px",
              }}
            >
              <Grid item gridArea="pago_por">
                <IconTextField
                  fullWidth
                  rows={2}
                  label="Ingreso por:"
                  type="text"
                  multiline
                  value={stateIngreso}
                  onChange={({ target }) => {
                    setStateIngreso(target.value);
                  }}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  colorErr="celesteNeon.main"
                  helperText={stateIngreso.length === 0 ? "Obligatorio" : ""}
                  iconEnd={<MonetizationOn />}
                />
              </Grid>

              <Grid
                item
                gridArea="monto"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="end"
              >
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

              <Grid item gridArea="nota">
                <IconTextField
                  fullWidth
                  rows={2}
                  label="Nota:"
                  type="text"
                  multiline
                  value={stateNota}
                  onChange={({ target }) => {
                    setStateNota(target.value);
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
          message={errorMsgRegIngreso.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </>
  );
};
