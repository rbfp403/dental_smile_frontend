import { useState, useEffect } from "react";
import {
  Box,
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
  NoteAddOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { FaNotesMedical } from "react-icons/fa";
import { GrUnorderedList } from "react-icons/gr";
import { ButtonCustom, CustomAlert, CustomAutocomplete } from "../../ui";
import {
  TxtCompFormTratam,
  FormModalProcedTratam,
  TxtProcedFormTratam,
  TxtPrescrFormTratam,
} from "./";
import {
  useDiagnosticosStore,
  usePlanesStore,
  useTratamientosStore,
} from "../../hooks";
import { formatDataTratamForm } from "../helpers";

//
//
//

export const FormModalTratam = ({ openModal, setOpenModal, title }) => {
  //store

  const { diagnosticosList } = useDiagnosticosStore();

  const { planesList } = usePlanesStore();

  const {
    tratamActivo,
    changeDataTratam,
    errorMsgRegTratam,
    startSavingTratamiento,
  } = useTratamientosStore();

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);
  //hook txt btn
  const [txtButton, setTxtButton] = useState("");

  //hook tipo tratamiento
  const [stateTipTratam, setStateTipTratam] = useState(null);

  //hook enfermedad
  const [stateCodigoCie, setStateCodigoCie] = useState(null);

  //hook complicaciones
  const [arrComplicaciones, setArrComplicaciones] = useState([]);

  //hook complicaciones eliminadas
  const [compDeleted, setCompDeleted] = useState([]);

  //hook handle open form proced
  const [stateFormProced, setStateFormProced] = useState(false);

  //hook procedimientos
  const [arrProcedimientos, setArrProcedimientos] = useState([]);

  //hook procedimientos eliminados
  const [proceDeleted, setProceDeleted] = useState([]);

  //hook prescripciones
  const [arrPrescripciones, setArrPrescripciones] = useState([]);

  //hook prescripciones eliminados
  const [prescDeleted, setPrescDeleted] = useState([]);

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
    setStateCodigoCie(null);
    setStateTipTratam(null);
    setArrComplicaciones([{ id: 0, txt_compli: "" }]);
    setArrProcedimientos([
      // { id: 0, cod_proced: "", nom_proced: "" }
    ]);
    setArrPrescripciones([{ id: 0, desc_presc: "", dosi_presc: "" }]);
    setCompDeleted([]);
    setProceDeleted([]);
    setPrescDeleted([]);
  };

  //cerrarModal
  const cerrarModal = () => {
    changeDataTratam(null);
    setOpenModal(false);
    resetInputText();
  };

  /**********************************COMPLICACIONES*********************************/
  const addComplication = () => {
    setArrComplicaciones([
      ...arrComplicaciones,
      { id: arrComplicaciones.length + compDeleted.length, txt_compli: "" },
    ]);
  };

  const updateComplication = (comp_id, txt) => {
    setArrComplicaciones(
      arrComplicaciones.map((comp) => {
        if (comp.id === comp_id) {
          return { ...comp, txt_compli: txt };
        }
        return comp;
      })
    );
  };
  const removeComplication = (comp_id, id_compli) => {
    setArrComplicaciones(
      arrComplicaciones.filter((comp) => comp.id !== comp_id)
    );

    setCompDeleted([...compDeleted, id_compli]);
  };

  /**********************************PROCEDIMIENTOS*********************************/

  const handleOpenProcedForm = () => {
    setStateFormProced(true);
  };
  const addProced = (cod, nom, id_pro) => {
    setArrProcedimientos([
      ...arrProcedimientos,
      {
        id: arrProcedimientos.length + proceDeleted.length,
        cod_proced: cod,
        nom_proced: nom,
        id_proced: id_pro,
      },
    ]);
  };

  const removeProced = (proc_id, id_tratam_proced) => {
    setArrProcedimientos(
      arrProcedimientos.filter((proced) => proced.id !== proc_id)
    );

    setProceDeleted([...proceDeleted, id_tratam_proced]);
  };

  /**********************************PRESCRIPCIONES *********************************/
  const addPrescription = () => {
    setArrPrescripciones([
      ...arrPrescripciones,
      {
        id: arrPrescripciones.length + prescDeleted.length,
        desc_presc: "",
        dosi_presc: "",
      },
    ]);
  };

  const updatePrescription = (presc_id, prop) => {
    setArrPrescripciones(
      arrPrescripciones.map((presc) => {
        if (presc.id === presc_id) {
          return { ...presc, ...prop };
        }
        return presc;
      })
    );
  };
  const removePrescription = (pre_id, id_presc) => {
    setArrPrescripciones(
      arrPrescripciones.filter((presc) => presc.id !== pre_id)
    );

    setPrescDeleted([...prescDeleted, id_presc]);
  };

  /********************control formulario de registro y edición********************/
  useEffect(() => {
    if (tratamActivo && title.includes("Editar")) {
      //cargar los componentes
      const enfermedadCie = diagnosticosList.find(
        (enferCie) => enferCie.codigoCIE === tratamActivo.codigoCIE
      );
      setStateCodigoCie(enfermedadCie === undefined ? null : enfermedadCie);

      const tipoTratam = planesList[1].find(
        (plan) => plan.id_tipoTratam === tratamActivo.id_tipoTratam
      );

      setStateTipTratam(tipoTratam === undefined ? null : tipoTratam);

      setArrComplicaciones(
        tratamActivo.complicaciones.length > 0
          ? formatDataTratamForm(tratamActivo.complicaciones)
          : [{ id: 0, txt_compli: "" }]
      );
      setArrProcedimientos(
        tratamActivo.procedimientos.length > 0
          ? formatDataTratamForm(tratamActivo.procedimientos)
          : []
      );
      setArrPrescripciones(
        tratamActivo.prescripciones.length > 0
          ? formatDataTratamForm(tratamActivo.prescripciones)
          : [{ id: 0, desc_presc: "", dosi_presc: "" }]
      );
    } else {
      resetInputText();
    }
  }, [tratamActivo, title]);

  /********************control formulario de registro y edición********************/
  useEffect(() => {
    if (title.includes("Editar")) {
      setTxtButton("Actualizar");
      setMsgAlert(`Se actualizaron los datos del tratamiento 🙂.`);
      //
      // }
    } else {
      setTxtButton("Registrar");
      setMsgAlert(`Se registro un nuevo tratamiento 🙂.`);
    }
  }, [title]);

  /************************ funcion enviar los datos ********************/
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    //enviando al custom hook

    const codigoCIE =
      stateCodigoCie !== null ? stateCodigoCie.codigoCIE : stateCodigoCie;

    const tipTratam =
      stateTipTratam !== null ? stateTipTratam.id_tipoTratam : stateTipTratam;

    startSavingTratamiento({
      codigoCIE,
      tipTratam,
      arrComplicaciones,
      compDeleted,
      arrProcedimientos,
      proceDeleted,
      arrPrescripciones,
      prescDeleted,
    });
  };

  /*******************manejador de errores todos los campos********************/
  useEffect(() => {
    if (errorMsgRegTratam.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);
    }
    if (errorMsgRegTratam.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegTratam]);

  return (
    <>
      <Dialog
        maxWidth="md"
        open={openModal}
        onClose={cerrarModal}
        sx={{
          "& .MuiPaper-root": {
            width: "660px",
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
                gridTemplateRows: "repeat(6, max-content)",
                gridTemplateAreas: `
                " tipoTratam tipoTratam ."
                ". codigoCie codigoCie"
              
              "complicaciones complicaciones complicaciones"
              
              "procedimientos procedimientos procedimientos"
              
              "prescripciones prescripciones prescripciones"
              "btns btns btns"
              `,
                rowGap: "20px",
                columnGap: "20px",
              }}
            >
              <Grid item gridArea="tipoTratam">
                <CustomAutocomplete
                  fullWidth
                  // disablePortal

                  options={planesList[1].filter(
                    (plan) => plan.tipoPlan === "Terapéutico"
                  )}
                  getOptionLabel={(option) =>
                    option.tipo_de_tratamiento + " - " + option.tratamiento
                  }
                  value={stateTipTratam}
                  onChange={(event, newValue) => {
                    setStateTipTratam(newValue);
                  }}
                  propsTextField={{
                    label: "Tipo de tratamiento:",
                    placeholder: "Seleccione el tipo de tratamiento",
                  }}
                  autoFocus
                  iconAutocomplete={
                    <img
                      type="img/svg"
                      width="25px"
                      height="25px"
                      src={`/assets/icons/formTratam/tipoTratamiento.svg`}
                    />
                  }
                  heightList="240px"
                />
              </Grid>

              <Grid item gridArea="codigoCie">
                <CustomAutocomplete
                  fullWidth
                  // disablePortal
                  options={diagnosticosList.filter(
                    (diag) => diag.codigoCIE.length > 0
                  )}
                  getOptionLabel={(option) =>
                    option.codigoCIE + " - " + option.enfermedad_diagnosticada
                  }
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
                  heightList="240px"
                />
              </Grid>

              <Grid
                item
                gridArea="complicaciones"
                display="flex"
                flexDirection="column"
              >
                <div>
                  <ButtonCustom
                    altura={"50px"}
                    colorf={"transparent"}
                    colorh={"transparent"}
                    colort={"primary.main"}
                    colorth={"blueSecondary.main"}
                    txt_b={"Complicaciones"}
                    flexDir="row"
                    txt_b_size="16px"
                    propsXS={{ boxShadow: "none !important" }}
                    iconB={<NoteAddOutlined />}
                    onClick={addComplication}
                  />
                </div>
                <Box display="flex" flexDirection="column" rowGap="8px">
                  {arrComplicaciones.map((comp) => (
                    <TxtCompFormTratam
                      data={comp}
                      fnDelete={removeComplication}
                      fnUpdate={updateComplication}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid
                item
                gridArea="procedimientos"
                display="flex"
                flexDirection="column"
              >
                <Box alignSelf="end">
                  <ButtonCustom
                    altura={"50px"}
                    colorf={"transparent"}
                    colorh={"transparent"}
                    colort={"primary.main"}
                    colorth={"blueSecondary.main"}
                    txt_b={"Procedimientos"}
                    flexDir="row"
                    txt_b_size="16px"
                    propsXS={{ boxShadow: "none !important" }}
                    iconB={<FaNotesMedical />}
                    onClick={handleOpenProcedForm}
                  />
                </Box>
                <Box display="flex" flexDirection="column" rowGap="8px">
                  {arrProcedimientos.map((proced) => (
                    <TxtProcedFormTratam
                      data={proced}
                      fnDelete={removeProced}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid
                item
                gridArea="prescripciones"
                display="flex"
                flexDirection="column"
              >
                <div>
                  <ButtonCustom
                    altura={"50px"}
                    colorf={"transparent"}
                    colorh={"transparent"}
                    colort={"primary.main"}
                    colorth={"blueSecondary.main"}
                    txt_b={"Prescripciones"}
                    flexDir="row"
                    txt_b_size="16px"
                    propsXS={{ boxShadow: "none !important" }}
                    onClick={addPrescription}
                    iconB={<GrUnorderedList />}
                  />
                </div>
                <Box display="flex" flexDirection="row" columnGap="200px">
                  <Typography>Prescripción</Typography>{" "}
                  <Typography>Dosis</Typography>
                </Box>
                <Box display="flex" flexDirection="column" rowGap="10px">
                  {arrPrescripciones.map((presc) => (
                    <TxtPrescrFormTratam
                      data={presc}
                      fnUpdate={updatePrescription}
                      fnDelete={removePrescription}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid
                item
                gridArea="btns"
                display="flex"
                justifyContent="end"
                columnGap="10px"
                marginTop="30px"
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

      <FormModalProcedTratam
        openModal={stateFormProced}
        setOpenModal={setStateFormProced}
        fnAddProced={addProced}
      />
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
          message={errorMsgRegTratam.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </>
  );
};
