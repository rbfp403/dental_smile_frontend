import { useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Grid, Portal, Typography } from "@mui/material";
import {
  CancelOutlined,
  CheckCircleOutline,
  Restore,
  Save,
} from "@mui/icons-material";
import { ButtonCustom, CustomAlert, RadioGroupCustom } from "../../ui";
import { RowSaludBucal } from "../components";
import { useSaludBucalStore } from "../../hooks";

const piezasList = [
  { fila: 1, piezas: ["Ausente", "16", "17", "55"] },
  { fila: 2, piezas: ["Ausente", "11", "21", "51"] },
  { fila: 3, piezas: ["Ausente", "26", "27", "65"] },
  { fila: 4, piezas: ["Ausente", "36", "37", "75"] },
  { fila: 5, piezas: ["Ausente", "31", "41", "71"] },
  { fila: 6, piezas: ["Ausente", "46", "47", "85"] },
];

export const SaludBucalPage = () => {
  //

  //store
  const {
    saludBucalActual,
    startLoadSaludBucalArr,
    startSavingSaludBucal,
    errorMsgRegSaludB,
    startUpdatingSaludBucal,
    dataSaludBucal,
  } = useSaludBucalStore();

  //hooks
  const [stateEnfePerio, setStateEnfePerio] = useState("");
  const [stateMalOclus, setStateMalOclus] = useState("");
  const [stateFluorosis, setStateFluorosis] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [msgAlert, setMsgAlert] = useState("");
  //hook guardando indice simplificado
  const [startSaving, setStartSaving] = useState(false);

  useEffect(() => {
    if (dataSaludBucal) {
      setStateEnfePerio(dataSaludBucal.enfermedad_periodontal);
      setStateMalOclus(dataSaludBucal.mal_oclusion);
      setStateFluorosis(dataSaludBucal.fluorosis);
    }
  }, [dataSaludBucal]);

  const desahacerCambios = async () => {
    await startLoadSaludBucalArr();
  };

  const guardarCambios = async () => {
    setStartSaving(true);
    setFormSubmitted(true);
    setMsgAlert("Índices de Higiene Oral Simplificado actualizados");
    await startSavingSaludBucal();
    setStartSaving(false);
  };

  const actualizarForm2SalB = async () => {
    setFormSubmitted(true);
    setMsgAlert(
      "Índices de Enfermedad Periodontal, Mal Oclusión, Fluorosis actualizados"
    );
    await startUpdatingSaludBucal({
      stateEnfePerio,
      stateMalOclus,
      stateFluorosis,
    });
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

  //manejador de errores todos los campos
  useEffect(() => {
    if (errorMsgRegSaludB.msg === "Sin errores" && formSubmitted) {
      handleOpenSnackbar();
      setFormSubmitted(false);
    }
    if (errorMsgRegSaludB.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegSaludB]);

  const totales = useMemo(() => {
    if (saludBucalActual.piezas.length > 0) {
      let sumPlaca = 0,
        sumCalculo = 0,
        sumGengivitis = 0,
        totalFilas = 0;

      for (const pza of saludBucalActual.piezas) {
        if (pza.pieza !== "" && pza.pieza !== "Ausente") {
          totalFilas++;
          sumPlaca = sumPlaca + pza.placa;
          sumCalculo = sumCalculo + pza.calculo;
          sumGengivitis = sumGengivitis + pza.gingivitis;
        }
      }

      return {
        promPlaca: parseFloat(sumPlaca / totalFilas).toFixed(2),
        promCalculos: parseFloat(sumCalculo / totalFilas).toFixed(2),
        promGengivitis: parseFloat(sumGengivitis / totalFilas).toFixed(2),
      };
    }
  }, [saludBucalActual]);

  return (
    <Box
      component="div"
      className="animate__animated animate__fadeInUp animate__faster"
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
      }}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box
          display="flex"
          flexDirection="column"
          rowGap="15px"
          flexBasis="60%"
          sx={{
            boxShadow: "5px 7px 7px rgba(0, 0, 0, 0.5)",
            backgroundColor: "myBgColor.main",
            padding: "20px",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between
         "
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "primary.main",
                // textAlign: "center",
              }}
            >
              Índices de Higiene Oral Simplificado
            </Typography>
            <div>
              <ButtonCustom
                desactived={startSaving}
                altura="45px"
                txt_b_size="14px"
                flexDir="column-reverse"
                colorf="transparent"
                colorh="transparent"
                colort="blueSecondary.main"
                colorth="primary.main"
                txt_b="Deshacer cambios"
                fontW="bold"
                iconB={<Restore />}
                propsXS={{ boxShadow: "none !important" }}
                onClick={desahacerCambios}
              />
              {startSaving ? (
                <CircularProgress
                  size="30px"
                  sx={{ color: "#116482", padding: "0px" }}
                />
              ) : (
                <ButtonCustom
                  altura="45px"
                  txt_b_size="14px"
                  flexDir="column-reverse"
                  colorf="transparent"
                  colorh="transparent"
                  colort="blueSecondary.main"
                  colorth="primary.main"
                  txt_b="Guardar"
                  fontW="bold"
                  iconB={<Save />}
                  propsXS={{ boxShadow: "none !important" }}
                  onClick={guardarCambios}
                />
              )}
            </div>
          </Box>

          <Grid
            container
            display="grid"
            justifyItems="center"
            gridTemplateColumns="repeat(4, 1fr)"
            columnGap="20px"
            rowGap="15px"
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "primary.main",
              }}
            >
              Pieza Dental
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "primary.main",
              }}
            >
              Placa
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "primary.main",
              }}
            >
              Cálculo
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "primary.main",
              }}
            >
              Gingivitis
            </Typography>

            {piezasList.map((piezas, index) => {
              return <RowSaludBucal key={index} piezasList={piezas} />;
            })}

            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "primary.main",
                justifySelf: "end",
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {totales && isNaN(totales) ? totales.promPlaca : ""}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {totales && isNaN(totales) ? totales.promCalculos : ""}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {totales && isNaN(totales) ? totales.promGengivitis : ""}
            </Typography>
          </Grid>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          rowGap="10px"
          flexBasis="35%"
          sx={{
            boxShadow: "5px 7px 7px rgba(0, 0, 0, 0.5)",
            backgroundColor: "myBgColor.main",
            padding: "20px",
          }}
          alignItems="center"
        >
          <div style={{ display: "flex", alignSelf: "end" }}>
            <ButtonCustom
              altura="45px"
              txt_b_size="14px"
              flexDir="column-reverse"
              colorf="transparent"
              colorh="transparent"
              colort="blueSecondary.main"
              colorth="primary.main"
              txt_b="Guardar"
              fontW="bold"
              iconB={<Save />}
              propsXS={{ boxShadow: "none !important" }}
              onClick={actualizarForm2SalB}
            />
          </div>
          <div style={{ padding: "10px 0px" }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              Enfermedad Periodontal
            </Typography>

            <RadioGroupCustom
              radioOptions={["Ausente", "Leve", "Moderada", "Severa"]}
              hookRadio={stateEnfePerio}
              setHookRadio={setStateEnfePerio}
              fontSzlbl="15px"
              colorTxt="black"
              fontw="bold"
              styleRadioGroup={{
                display: "flex",
                flexWrap: "nowrap",

                "& .MuiFormControlLabel-root > .MuiButtonBase-root": {
                  padding: "0px 10px",
                },
              }}
            />
          </div>
          <div style={{ padding: "10px 0px" }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              Mal Oclusión
            </Typography>
            <RadioGroupCustom
              radioOptions={["Ausente", "Angle I", "Angle II", "Angle III"]}
              hookRadio={stateMalOclus}
              setHookRadio={setStateMalOclus}
              fontSzlbl="15px"
              colorTxt="black"
              fontw="bold"
              styleRadioGroup={{
                display: "flex",
                flexWrap: "nowrap",

                "& .MuiFormControlLabel-root > .MuiButtonBase-root": {
                  padding: "0px 10px",
                },
              }}
            />
          </div>
          <div style={{ padding: "10px 0px" }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              Fluorosis
            </Typography>
            <RadioGroupCustom
              radioOptions={["Ausente", "Leve", "Moderada", "Severa"]}
              hookRadio={stateFluorosis}
              setHookRadio={setStateFluorosis}
              fontSzlbl="15px"
              colorTxt="black"
              fontw="bold"
              styleRadioGroup={{
                display: "flex",
                flexWrap: "nowrap",

                "& .MuiFormControlLabel-root > .MuiButtonBase-root": {
                  padding: "0px 10px",
                },
              }}
            />
          </div>
        </Box>
      </Box>
      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Actualizado"}
          message={msgAlert}
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
        />

        <CustomAlert
          stateSnackbar={stateSnackbarError}
          handleCloseSnackbar={handleCloseSnackbarError}
          title={"No se realizaron los cambios"}
          message={errorMsgRegSaludB.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </Box>
  );
};
