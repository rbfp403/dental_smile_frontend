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
  SaveOutlined,
  SegmentOutlined,
} from "@mui/icons-material";

import {
  ButtonCustom,
  CustomAlert,
  CustomAutocomplete,
  IconTextField,
} from "../../ui";

import { usePagosStore, useTipPagoStore } from "../../hooks";

//
//
//

export const FormModalPago = ({ openModal, setOpenModal, title }) => {
  //store

  const { tipoPagosList, startLoadTipPagoList } = useTipPagoStore();

  const { pagoActivo, errorMsgRegCons, changeDataPago, startSavingPago } =
    usePagosStore();

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //hook txt btn
  const [txtButton, setTxtButton] = useState("");

  //hook tipo de pago
  const [stateTipPago, setStateTipPago] = useState(null);
  const [stateTipPagoStr, setStateTipPagoStr] = useState("");

  //hook precio
  const [statePrecio, setStatePrecio] = useState("");

  //hook descripcion
  const [stateDescripcion, setStateDescripcion] = useState("");

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
    setStateTipPago(null);
    setStateTipPagoStr("");
    setStatePrecio("");
    setStateDescripcion("");
  };

  //cargar lista de tipos de pago
  useEffect(() => {
    startLoadTipPagoList("todos");
  }, []);

  //control formulario de registro y edición
  useEffect(() => {
    if (title.includes("Editar") && pagoActivo) {
      //cargar los componentes
      const tipPago = tipoPagosList.find(
        (tPago) => tPago.tipo_de_pago === pagoActivo.pago_por
      );

      setStateTipPago(
        tipPago === undefined
          ? { id: 0, tipo_de_pago: pagoActivo.pago_por, precio: 0 }
          : tipPago
      );
      setStatePrecio(pagoActivo.monto);
      setStateDescripcion(
        pagoActivo.desc_ingreso === undefined ? "" : pagoActivo.desc_ingreso
      );
    } else {
      resetInputText();
    }
  }, [pagoActivo, title]);

  useEffect(() => {
    if (title.includes("Editar")) {
      setTxtButton("Actualizar");
      setMsgAlert(`Se actualizaron los datos del pago 🙂.`);
      //
      // }
    } else {
      setTxtButton("Registrar");
      setMsgAlert(`Se registró un nuevo pago de consulta 🙂.`);
    }
  }, [title]);

  //cerrarModal
  const cerrarModal = () => {
    setOpenModal(false);
    changeDataPago(null);
    resetInputText();
  };

  //funcion enviar los datos
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    //validaciones
    if (stateTipPagoStr.length === 0) return;
    if (statePrecio.length === 0) return;

    const id_tra_pro = pagoActivo ? pagoActivo.id_tratam_proced : null;

    //enviando al custom hook
    startSavingPago({
      pago_por: stateTipPagoStr,
      monto: parseFloat(statePrecio),
      desc_ingreso: stateDescripcion,
      id_tratam_proced: id_tra_pro,
    });
  };

  //manejador de errores todos los campos
  useEffect(() => {
    if (errorMsgRegCons.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);
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
                <CustomAutocomplete
                  fullWidth
                  freeSolo
                  options={tipoPagosList}
                  getOptionLabel={(option) => option.tipo_de_pago}
                  // inputValue={stateTipPago}
                  value={stateTipPago}
                  onChange={(event, newValue) => {
                    setStateTipPago(newValue);
                    if (newValue !== null) {
                      setStatePrecio(newValue.precio.toString());
                    } else {
                      setStatePrecio("0");
                    }
                  }}
                  onInputChange={(event, newValue) => {
                    setStateTipPagoStr(newValue);
                  }}
                  propsTextField={{
                    label: "Pago por:",
                    placeholder: "Seleccione un tipo de pago",
                    error:
                      stateTipPago &&
                      stateTipPago.length === 0 &&
                      formSubmitted,
                    helperText:
                      !stateTipPago && stateTipPagoStr.length === 0
                        ? "Obligatorio"
                        : "",
                  }}
                  autoFocus
                  iconAutocomplete={
                    <img
                      type="img/svg"
                      width="30px"
                      height="30px"
                      src={`/assets/icons/formPago/pago_por.svg`}
                    />
                  }
                  heightList="240px"
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
                  rows={4}
                  label="Nota:"
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
          message={errorMsgRegCons.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </>
  );
};
