import { useMemo, useState, useEffect } from "react";

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
} from "@mui/icons-material";

import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";

import { useConsultasStore, useForm } from "../../hooks";

//
//
//

export const FormModalSignVit = ({
  openModalForm = false,
  setOpenModalForm,
}) => {
  //store
  const { signosVitales, errorMsgRegCons, startSavingSignVit } =
    useConsultasStore();

  //cerrarModal
  const cerrarModal = () => {
    setOpenModalForm(false);
  };

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  //control formulario de registro y edición
  const formDataPac = useMemo(() => {
    if (signosVitales && signosVitales.id_signoVital) {
      return {
        dataForm: {
          ...signosVitales,
        },
      };
    } else {
      return {
        dataForm: {
          temp_signoVital: "",
          presArt_signoVital: "",
          freCar_signoVital: "",
          freRes_signoVital: "",
        },
      };
    }
  }, [signosVitales]);

  //custom hook useForm
  const { formState, onInputChange } = useForm(formDataPac.dataForm);

  //funcion enviar los datos
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    startSavingSignVit(formState);
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
    }
  }, [errorMsgRegCons]);

  //

  return (
    <>
      <Dialog maxWidth="sm" open={openModalForm} onClose={cerrarModal}>
        <DialogTitle
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          columnGap="40px"
          padding="16px 10px 16px  20px !important"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              fontStyle: "italic",
              textShadow: "0px 1px 1px rgba(0, 0, 0, 0.4)",
            }}
          >
            Editar signos vitales
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
                alignItems: "center",
                justifyContent: "center",
                rowGap: "20px",
              }}
            >
              <IconTextField
                fullWidth
                label="Temperatura:"
                type="number"
                name="temp_signoVital"
                value={formState.temp_signoVital}
                onChange={onInputChange}
                colorIcon="primary.main"
                colorHover="btnHoverInForm.main"
                colorTxt="black"
                colorLabel="primary.main"
                iconEnd={
                  <>
                    <Typography>°C</Typography>
                    <Icon sx={{ marginLeft: "7px" }}>
                      <img
                        type="img/svg"
                        width="25px"
                        height="25px"
                        src={`/assets/icons/consultaDetalle/temperatura.svg`}
                      />
                    </Icon>
                  </>
                }
              />
              <IconTextField
                fullWidth
                label="Presión arterial:"
                type="text"
                name="presArt_signoVital"
                value={formState.presArt_signoVital}
                onChange={onInputChange}
                colorIcon="primary.main"
                colorHover="btnHoverInForm.main"
                colorTxt="black"
                colorLabel="primary.main"
                iconEnd={
                  <>
                    <Typography>mm Hg</Typography>
                    <Icon sx={{ marginLeft: "7px" }}>
                      <img
                        type="img/svg"
                        width="25px"
                        height="25px"
                        src={`/assets/icons/consultaDetalle/presionArterial.svg`}
                      />
                    </Icon>
                  </>
                }
              />
              <IconTextField
                fullWidth
                label="Frecuencia cardíaca:"
                type="number"
                name="freCar_signoVital"
                value={formState.freCar_signoVital}
                onChange={onInputChange}
                colorIcon="primary.main"
                colorHover="btnHoverInForm.main"
                colorTxt="black"
                colorLabel="primary.main"
                iconEnd={
                  <>
                    <Typography>ppm</Typography>
                    <Icon sx={{ marginLeft: "7px" }}>
                      <img
                        type="img/svg"
                        width="25px"
                        height="25px"
                        src={`/assets/icons/consultaDetalle/frecuenciaCard.svg`}
                      />
                    </Icon>
                  </>
                }
              />
              <IconTextField
                fullWidth
                label="Frecuencia respiratoria:"
                type="number"
                name="freRes_signoVital"
                value={formState.freRes_signoVital}
                onChange={onInputChange}
                colorIcon="primary.main"
                colorHover="btnHoverInForm.main"
                colorTxt="black"
                colorLabel="primary.main"
                iconEnd={
                  <>
                    <Typography>rpm</Typography>
                    <Icon sx={{ marginLeft: "7px" }}>
                      <img
                        type="img/svg"
                        width="25px"
                        height="25px"
                        src={`/assets/icons/consultaDetalle/frecuenciaResp.svg`}
                      />
                    </Icon>
                  </>
                }
              />

              <Box
                display="flex"
                flexDirection="row"
                columnGap="10px"
                marginTop="10px"
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
                  txt_b="Actualizar"
                  iconB={<SaveOutlined />}
                />
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message="Se actualizaron los signos vitales 🙂"
        colorbg="blueSecondary.main"
        colortxt="white"
        posHor="center"
        iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
      />

      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbarError}
          handleCloseSnackbar={handleCloseSnackbarError}
          title={"Signos vitales no actualizados"}
          message={errorMsgRegCons.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </>
  );
};
