import { forwardRef, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
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
} from "@mui/icons-material";
import { MdOutlineDescription } from "react-icons/md";
import { RiParentLine } from "react-icons/ri";
import {
  ButtonCustom,
  CustomAlert,
  IconTextField,
  SelectedCustom,
} from "../../ui";
import { useAntecedenteStore, useForm } from "../../hooks";
import { formValidations } from "../helpers";

//
//
//
//
//
//
const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="left" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});

export const FormModalAntec = ({
  openModalForm = false,
  setOpenModalForm,
  title,
  showParent,
}) => {
  //
  //store
  const { antecedenteActivo, errorRegAntecedente, startSavingAntecedente } =
    useAntecedenteStore();

  //hooks
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [msgAlert, setMsgAlert] = useState("");

  const [txtButton, setTxtButton] = useState("");

  const formDataPac = useMemo(() => {
    if (title.toUpperCase().includes("EDITAR")) {
      setMsgAlert(
        `Se actualizaron los datos del antecedente ${
          showParent ? "familiar" : "personal"
        }. 🙂`
      );
      setTxtButton("Actualizar");

      if (antecedenteActivo) {
        return {
          dataForm: {
            ...antecedenteActivo,
            par_antecedente:
              antecedenteActivo.par_antecedente === null
                ? ""
                : antecedenteActivo.par_antecedente,
          },
          formValidations,
        };
      } else {
        return {
          dataForm: {},
          formValidations: {},
        };
      }
    } else {
      setMsgAlert(
        `Antecedente ${
          showParent ? "familiar" : "personal"
        } registrado con éxito 🙂.`
      );
      setTxtButton("Registrar");

      return {
        dataForm: {
          par_antecedente: "",
          tip_antecedente: "",
          des_antecedente: "",
        },
        formValidations,
      };
    }
  }, [title, antecedenteActivo]);

  //
  const { formState, formValidation, onInputChange, isFormValid } = useForm(
    formDataPac.dataForm,
    formDataPac.formValidations
  );

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
    if (!isFormValid) return;

    const formStateFormateado = {
      ...formState,
      par_antecedente: showParent ? formState.par_antecedente : null,
    };

    startSavingAntecedente(formStateFormateado);
  };

  useEffect(() => {
    if (errorRegAntecedente.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);

      // if (!title.toUpperCase().includes("EDITAR")) {
      //   formDataPac.dataForm = {
      //     par_antecedente: "",
      //     tip_antecedente: "",
      //     des_antecedente: "",
      //   };
      // }
    }

    if (errorRegAntecedente.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorRegAntecedente]);

  const tipoAnteced = [
    "Alergia antibiótica",
    "Alergia anestesia",
    "Hemorragia",
    "VIH/sida",
    "Tuberculosis",
    "Asma",
    "Diabetes",
    "Hipertensión",
    "Enfermedad Cardiaca",
    "Otro",
  ];
  //
  return (
    <div>
      <Dialog
        maxWidth="sm"
        open={openModalForm}
        onClose={cerrarModal}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle
          display="flex"
          padding="16px 10px 16px  20px !important"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          columnGap="15px"
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
                paddingTop: "5px",
                alignItems: "center",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "repeat(4, max-content)",
                gridTemplateAreas: `"parentesco"
              "tipo"
              "descripcion"
              "btnReg"`,
                rowGap: "15px",
                columnGap: "10px",
              }}
            >
              {showParent && (
                <Grid item gridArea="parentesco">
                  <IconTextField
                    autoFocus
                    fullWidth
                    label="Parentesco:"
                    type="text"
                    name="par_antecedente"
                    value={formState.par_antecedente}
                    onChange={onInputChange}
                    error={
                      !!formValidation.par_antecedenteValid && formSubmitted
                    }
                    helperText={formValidation.par_antecedenteValid}
                    colorIcon="primary.main"
                    colorHover="btnHoverInForm.main"
                    colorTxt="black"
                    colorLabel="primary.main"
                    iconEnd={
                      <Icon>
                        <RiParentLine />
                      </Icon>
                    }
                  />
                </Grid>
              )}

              <Grid item gridArea="tipo">
                <SelectedCustom
                  txt_label="Tipo de Antecedente:"
                  opciones={tipoAnteced}
                  txt_validation={formValidation.tip_antecedenteValid}
                  name="tip_antecedente"
                  value={formState.tip_antecedente}
                  onChange={onInputChange}
                  error={!!formValidation.tip_antecedenteValid && formSubmitted}
                />
              </Grid>

              <Grid item gridArea="descripcion">
                <IconTextField
                  fullWidth
                  label="Descripción:"
                  type="text"
                  multiline
                  name="des_antecedente"
                  value={formState.des_antecedente}
                  onChange={onInputChange}
                  error={!!formValidation.des_antecedenteValid && formSubmitted}
                  helperText={formValidation.des_antecedenteValid}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <MdOutlineDescription />
                    </Icon>
                  }
                />
              </Grid>

              <Grid
                item
                gridArea="btnReg"
                display="flex"
                flexDirection="row"
                columnGap="15px"
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
          message={errorRegAntecedente.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </div>
  );
};
