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

import { useExamenesStore } from "../../hooks";

const regionesAfectadas = [
  "Labios",
  "Mejillas",
  "Maxilar Superior",
  "Maxilar Inferior",
  "Lengua",
  "Paladar",
  "Piso",
  "Carillos",
  "Glándulas salivales",
  "Oro Faringe",
  "A.T.M",
  "Ganglios",
];

//
//
//

export const FormModalExam = ({ openModal, setOpenModal, title }) => {
  //store
  const {
    examenActivo,
    enfermedadesCieList,
    startLoadEnfermedadesCie,
    errorMsgRegCons,
    startSavingExamen,
  } = useExamenesStore();

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);
  //hook txt btn
  const [txtButton, setTxtButton] = useState("");

  //hook region afectada
  const [stateRegAfec, setStateRegAfec] = useState(null);

  //hook enfermedad
  const [stateCodigoCie, setStateCodigoCie] = useState(null);

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
    setStateRegAfec(null);
    setStateCodigoCie(null);
    setStateDescripcion("");
  };

  //control formulario de registro y edición
  useEffect(() => {
    if (examenActivo && title.includes("Editar")) {
      //cargar los componentes
      const enfermedadCie = enfermedadesCieList.find(
        (enferCie) => enferCie.id === examenActivo.codigoCIE
      );

      setStateCodigoCie(enfermedadCie === undefined ? null : enfermedadCie);
      setStateRegAfec(examenActivo.region_afectada);
      setStateDescripcion(examenActivo.descripcion);
    } else {
      resetInputText();
    }
  }, [examenActivo, title]);

  useEffect(() => {
    if (title.includes("Editar")) {
      setTxtButton("Actualizar");
      setMsgAlert(`Se actualizaron los datos del examen estomatognático 🙂.`);
      //
      // }
    } else {
      setTxtButton("Registrar");
      setMsgAlert(`Se registro un nuevo examen estomatognático 🙂.`);
    }
  }, [title]);

  useEffect(() => {
    startLoadEnfermedadesCie();
  }, []);

  //funcion enviar los datos
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    //validaciones
    if (stateRegAfec === null) return;
    const codigoCIE = stateCodigoCie === null ? "" : stateCodigoCie.id;

    //enviando al custom hook

    startSavingExamen({
      region_afectada: stateRegAfec,
      codigoCIE,
      descripcion: stateDescripcion.trim(),
    });
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
            width: "650px",
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
                gridTemplateAreas: `"region codigoCie codigoCie"
              "descripcion descripcion descripcion"
              "btnReg btnReg btnReg"
              `,
                rowGap: "25px",
                columnGap: "25px",
              }}
            >
              <Grid item gridArea="region">
                <CustomAutocomplete
                  fullWidth
                  // disablePortal
                  options={regionesAfectadas}
                  getOptionLabel={(option) => option}
                  value={stateRegAfec}
                  onChange={(event, newValue) => {
                    setStateRegAfec(newValue);
                  }}
                  propsTextField={{
                    label: "Región afectada:",
                    placeholder: "Seleccione la región afectada",
                    error: stateRegAfec === null && formSubmitted,
                    helperText:
                      stateRegAfec === null
                        ? "Debe seleccionar una región afectada"
                        : "",
                  }}
                  autoFocus
                  iconAutocomplete={
                    <img
                      type="img/svg"
                      width="25px"
                      height="25px"
                      src={`/assets/icons/formExamen/region_afectada.svg`}
                    />
                  }
                  heightList="260px"
                />
              </Grid>

              <Grid item gridArea="codigoCie">
                <CustomAutocomplete
                  fullWidth
                  // disablePortal
                  options={enfermedadesCieList}
                  getOptionLabel={(option) => option.id + " " + option.label}
                  value={stateCodigoCie}
                  onChange={(event, newValue) => {
                    setStateCodigoCie(newValue);
                  }}
                  propsTextField={{
                    label: "Código CIE:",
                    placeholder: "Seleccione el código CIE de la enfermedad",
                  }}
                  autoFocus
                  iconAutocomplete={
                    <img
                      type="img/svg"
                      width="25px"
                      height="25px"
                      src={`/assets/icons/formExamen/enfermedadCie.svg`}
                    />
                  }
                  heightList="260px"
                />
              </Grid>

              <Grid item gridArea="descripcion">
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
