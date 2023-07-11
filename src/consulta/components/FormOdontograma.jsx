import { useState, useEffect } from "react";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Portal,
  Typography,
} from "@mui/material";

import {
  CancelOutlined,
  CheckCircleOutline,
  Close,
  DeleteOutlined,
  Restore,
  Save,
} from "@mui/icons-material";

import { ButtonCustom, CustomAlert, DeleteConfirm } from "../../ui";
import {
  IconoBorrar,
  IconoCaries,
  IconoCoronaApli,
  IconoCoronaNece,
  IconoEndodonciaApl,
  IconoEndodonciaNece,
  IconoExtracion,
  IconoObturacion,
  IconoPerdidaCarie,
  IconoPerdidaOtra,
  IconoProteFijaApli,
  IconoProteFijaNece,
  IconoProteRemoApli,
  IconoProteRemoNece,
  IconoProteTotalApli,
  IconoProteTotalNece,
  IconoSellaApli,
  IconoSellaNeces,
  PermanentTooth,
  TemporalTooth,
  SimbologiaOdontograma,
} from "./";
import { useOdontogramaStore } from "../../hooks";
import { changeSelectedIcon } from "../helpers";

//
//
//

export const FormOdontograma = ({ openModal, setOpenModal }) => {
  //store

  const {
    changeToolOdonto,
    startSavingOdontograma,
    errorMsgRegOdontog,
    startDeletingOdontograma,
    startLoadOdontogramas,
  } = useOdontogramaStore();

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //hook guardando odontograma
  const [startSaving, setStartSaving] = useState(false);

  //hook desahaciendo cambios
  const [startDelChanges, setStartDelChanges] = useState(false);

  //cerrarModal
  const cerrarModal = () => {
    changeToolOdonto(null);
    setOpenModal(false);
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

  //hook control Confirm Eliminar
  const [openConfirmDelOdon, setOpenConfirmDelOdon] = useState(false);

  //abrir confirm dialog eliminar diagnostico
  const handleOpenConfirmDelOdon = () => {
    cerrarModal();
    setOpenConfirmDelOdon(true);
  };

  //deshacerCambios
  const desahacerCambios = async () => {
    setStartDelChanges(true);
    await startLoadOdontogramas();
    setStartDelChanges(false);
  };

  //eliminar odontograma
  const deleteOdontograma = async () => {
    await startDeletingOdontograma();
  };

  //funcion enviar los datos
  const onSubmit = async (event) => {
    event.preventDefault();
    setStartSaving(true);
    setFormSubmitted(true);

    await startSavingOdontograma();
  };

  //manejador de errores todos los campos
  useEffect(() => {
    if (errorMsgRegOdontog.msg === "Sin errores" && formSubmitted) {
      handleOpenSnackbar();
      setFormSubmitted(false);
      setStartSaving(false);
      // cerrarModal();
    }
    if (errorMsgRegOdontog.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
      setStartSaving(false);
      // cerrarModal();
    }
  }, [errorMsgRegOdontog]);

  //

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xl"
        open={openModal}
        onClose={cerrarModal}
        sx={{
          "& .MuiPaper-root": {
            minHeight: "97%",
            minWidth: "97%",
            backgroundColor: "rgba(255,255,255,0.9)",
          },
        }}
      >
        <DialogTitle
          padding="15px !important"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="row"
            columnGap="40px"
            alignItems="end"
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "25px",
                fontStyle: "italic",
                textShadow: "0px 1px 1px rgba(0, 0, 0, 0.4)",
              }}
            >
              Odontograma
            </Typography>
          </Box>

          <Box display="flex" flexDirection="row" columnGap="15px">
            <ButtonCustom
              desactived={startSaving}
              altura="45px"
              txt_b_size="14px"
              flexDir="column-reverse"
              colorf="transparent"
              colorh="transparent"
              colort="primary.main"
              colorth="black"
              txt_b="Eliminar"
              fontW="bold"
              iconB={<DeleteOutlined />}
              propsXS={{ boxShadow: "none !important" }}
              onClick={handleOpenConfirmDelOdon}
            />
            {startDelChanges ? (
              <CircularProgress color="primary" />
            ) : (
              <ButtonCustom
                desactived={startSaving}
                altura="45px"
                txt_b_size="14px"
                flexDir="column-reverse"
                colorf="transparent"
                colorh="transparent"
                colort="primary.main"
                colorth="black"
                txt_b="Deshacer cambios"
                fontW="bold"
                iconB={<Restore />}
                propsXS={{ boxShadow: "none !important" }}
                onClick={desahacerCambios}
              />
            )}

            {startSaving ? (
              <CircularProgress color="primary" />
            ) : (
              <ButtonCustom
                altura="45px"
                txt_b_size="14px"
                flexDir="column-reverse"
                colorf="transparent"
                colorh="transparent"
                colort="primary.main"
                colorth="black"
                txt_b="Guardar"
                fontW="bold"
                iconB={<Save />}
                propsXS={{ boxShadow: "none !important" }}
                onClick={onSubmit}
              />
            )}
            <ButtonCustom
              desactived={startSaving}
              altura="45px"
              txt_b_size="14px"
              flexDir="column-reverse"
              colorf="transparent"
              colorh="transparent"
              colort="primary.main"
              colorth="black"
              txt_b="Cerrar"
              fontW="bold"
              iconB={<Close />}
              propsXS={{ boxShadow: "none !important" }}
              onClick={cerrarModal}
            />
          </Box>
        </DialogTitle>

        <DialogContent>
          <div>
            <Grid
              container
              sx={{
                display: "grid",
                backgroundColor: "transparent",
                // padding: "15px",
                gridTemplateColumns: "6% 30% 4% 30% 4% 26%", //"repeat(4, 1fr)",
                gridTemplateRows: "repeat(4, max-content)",
                gridTemplateAreas: `"labels_sup super_der . super_izq . tools" 
                ". piezasTemp_supD . piezasTemp_supI . tools"
        ". piezasTemp_infD . piezasTemp_infI . tools"
      "labels_inf infer_der . infer_izq . tools" 
      `,
                // rowGap: "20px",
              }}
            >
              <Grid
                item
                gridArea="labels_sup"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box display="flex" flexDirection="column" rowGap="10px">
                  <Typography sx={{ fontStyle: "italic", fontWeight: "bold" }}>
                    Recesión
                  </Typography>
                  <Typography sx={{ fontStyle: "italic", fontWeight: "bold" }}>
                    Movilidad
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                >
                  Maxilar superior
                </Typography>
              </Grid>

              <Grid
                item
                gridArea="super_der"
                display="flex"
                flexDirection="row"
                columnGap="5px"
                alignItems="row"
              >
                {[18, 17, 16, 15, 14, 13, 12, 11].map((ele) => {
                  return (
                    <PermanentTooth
                      key={ele}
                      numberTooth={ele}
                      flexDir={"column"}
                    />
                  );
                })}
              </Grid>

              <Grid
                item
                gridArea="super_izq"
                display="flex"
                flexDirection="row"
                columnGap="5px"
                alignItems="row"
              >
                {[21, 22, 23, 24, 25, 26, 27, 28].map((ele) => {
                  return (
                    <PermanentTooth
                      key={ele}
                      numberTooth={ele}
                      flexDir={"column"}
                    />
                  );
                })}
              </Grid>

              <Grid
                item
                gridArea="piezasTemp_supD"
                display="flex"
                flexDirection="row"
                columnGap="5px"
                alignItems="row"
                justifyContent="center"
              >
                {[55, 54, 53, 52, 51].map((ele) => {
                  return (
                    <TemporalTooth
                      key={ele}
                      numberTooth={ele}
                      flexDir={"column"}
                    />
                  );
                })}
              </Grid>

              <Grid
                item
                gridArea="piezasTemp_supI"
                display="flex"
                flexDirection="row"
                columnGap="5px"
                alignItems="row"
                justifyContent="center"
              >
                {[61, 62, 63, 64, 65].map((ele) => {
                  return (
                    <TemporalTooth
                      key={ele}
                      numberTooth={ele}
                      flexDir={"column"}
                    />
                  );
                })}
              </Grid>

              <Grid
                item
                gridArea="piezasTemp_infD"
                display="flex"
                flexDirection="row"
                columnGap="5px"
                alignItems="row"
                justifyContent="center"
              >
                {[85, 84, 83, 82, 81].map((ele) => {
                  return (
                    <TemporalTooth
                      key={ele}
                      numberTooth={ele}
                      flexDir={"column-reverse"}
                    />
                  );
                })}
              </Grid>

              <Grid
                item
                gridArea="piezasTemp_infI"
                display="flex"
                flexDirection="row"
                columnGap="5px"
                alignItems="row"
                justifyContent="center"
              >
                {[71, 72, 73, 74, 75].map((ele) => {
                  return (
                    <TemporalTooth
                      key={ele}
                      numberTooth={ele}
                      flexDir={"column-reverse"}
                    />
                  );
                })}
              </Grid>

              <Grid
                item
                gridArea="labels_inf"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                >
                  Maxilar inferior
                </Typography>
                <Box display="flex" flexDirection="column" rowGap="20px">
                  <Typography sx={{ fontStyle: "italic", fontWeight: "bold" }}>
                    Recesión
                  </Typography>
                  <Typography sx={{ fontStyle: "italic", fontWeight: "bold" }}>
                    Movilidad
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                gridArea="infer_der"
                display="flex"
                flexDirection="row"
                columnGap="5px"
                alignItems="row"
              >
                {[48, 47, 46, 45, 44, 43, 42, 41].map((ele) => {
                  return (
                    <PermanentTooth
                      key={ele}
                      numberTooth={ele}
                      flexDir={"column-reverse"}
                    />
                  );
                })}
              </Grid>

              <Grid
                item
                gridArea="infer_izq"
                display="flex"
                flexDirection="row"
                columnGap="5px"
                alignItems="row"
              >
                {[31, 32, 33, 34, 35, 36, 37, 38].map((ele) => {
                  return (
                    <PermanentTooth
                      key={ele}
                      numberTooth={ele}
                      flexDir={"column-reverse"}
                    />
                  );
                })}
              </Grid>

              <Grid
                item
                gridArea="tools"
                sx={{
                  backgroundColor: "transparent",
                }}
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    color: "primary.main",
                    padding: "5px",
                  }}
                >
                  Simbología del odontograma
                </Typography>

                <Grid
                  component="div"
                  className="contenedorIcons"
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  columnGap="10px"
                  // marginTop="20px"
                  onClick={() => {
                    changeSelectedIcon();
                  }}
                >
                  <SimbologiaOdontograma
                    idTool="carie"
                    title={"Carie"}
                    content={""}
                    Icono={IconoCaries}
                    fnSimbOdon={() => {
                      changeToolOdonto(1);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="obturacion"
                    title={"Obturación"}
                    content={""}
                    Icono={IconoObturacion}
                    fnSimbOdon={() => {
                      changeToolOdonto(2);
                    }}
                  />

                  <SimbologiaOdontograma
                    idTool="sellante_necesario"
                    title={"Sellante"}
                    content={"Necesario"}
                    Icono={IconoSellaNeces}
                    fnSimbOdon={() => {
                      changeToolOdonto(3);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="sellante_aplicado"
                    title={"Sellante"}
                    content={"Aplicado"}
                    Icono={IconoSellaApli}
                    fnSimbOdon={() => {
                      changeToolOdonto(4);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="extraccion_necesaria"
                    title={"Extracción"}
                    content={"Necesaria"}
                    Icono={IconoExtracion}
                    fnSimbOdon={() => {
                      changeToolOdonto(5);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="perdida_caries"
                    title={"Pérdida"}
                    content={"por caries"}
                    Icono={IconoPerdidaCarie}
                    fnSimbOdon={() => {
                      changeToolOdonto(6);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="perdida_otra"
                    title={"Pérdida"}
                    content={"por otra causa"}
                    Icono={IconoPerdidaOtra}
                    fnSimbOdon={() => {
                      changeToolOdonto(7);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="endodoncia_necesaria"
                    title={"Endodoncia"}
                    content={"Necesaria"}
                    Icono={IconoEndodonciaNece}
                    fnSimbOdon={() => {
                      changeToolOdonto(8);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="endodoncia_aplicada"
                    title={"Endodoncia"}
                    content={"Aplicada"}
                    Icono={IconoEndodonciaApl}
                    fnSimbOdon={() => {
                      changeToolOdonto(9);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="protesis_fija_nece"
                    title={"Prótesis fija"}
                    content={"Necesaria"}
                    Icono={IconoProteFijaNece}
                    fnSimbOdon={() => {
                      changeToolOdonto(10);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="protesis_fija_apli"
                    title={"Prótesis fija"}
                    content={"Aplicada"}
                    Icono={IconoProteFijaApli}
                    fnSimbOdon={() => {
                      changeToolOdonto(11);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="protesis_remo_nece"
                    title={"Prótesis removible"}
                    content={"Necesaria"}
                    Icono={IconoProteRemoNece}
                    fnSimbOdon={() => {
                      changeToolOdonto(12);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="protesis_remo_apli"
                    title={"Prótesis removible"}
                    content={"Aplicada"}
                    Icono={IconoProteRemoApli}
                    fnSimbOdon={() => {
                      changeToolOdonto(13);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="protesis_total_nece"
                    title={"Prótesis total"}
                    content={"Necesaria"}
                    Icono={IconoProteTotalNece}
                    fnSimbOdon={() => {
                      changeToolOdonto(14);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="protesis_total_apli"
                    title={"Prótesis total"}
                    content={"Aplicada"}
                    Icono={IconoProteTotalApli}
                    fnSimbOdon={() => {
                      changeToolOdonto(15);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="corona_necesaria"
                    title={"Corona"}
                    content={"Necesaria"}
                    Icono={IconoCoronaNece}
                    fnSimbOdon={() => {
                      changeToolOdonto(16);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="corona_aplicada"
                    title={"Corona"}
                    content={"Aplicada"}
                    Icono={IconoCoronaApli}
                    fnSimbOdon={() => {
                      changeToolOdonto(17);
                    }}
                  />
                  <SimbologiaOdontograma
                    idTool="borrar_icono"
                    title={"Borrar"}
                    content={""}
                    Icono={IconoBorrar}
                    fnSimbOdon={() => {
                      changeToolOdonto(18);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>

      <Portal>
        <DeleteConfirm
          stateOpen={openConfirmDelOdon}
          setStateOpen={setOpenConfirmDelOdon}
          message={`¿Está segura que desea eliminar el odontograma?`}
          funcionDelete={deleteOdontograma}
        />

        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message="Odontograma Actualizado"
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
        />

        <CustomAlert
          stateSnackbar={stateSnackbarError}
          handleCloseSnackbar={handleCloseSnackbarError}
          title={"No se realizaron los cambios"}
          message={errorMsgRegOdontog.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </div>
  );
};
