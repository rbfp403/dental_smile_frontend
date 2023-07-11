import { forwardRef, useMemo, useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Portal,
  Slide,
  Typography,
} from "@mui/material";
import {
  AttachMoney,
  CancelOutlined,
  CheckCircleOutline,
  CloseOutlined,
  SaveOutlined,
  Subject,
} from "@mui/icons-material";
import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";
import { useForm, useTipConsStore } from "../../hooks";
import { formValidationsTipCons } from "../helpers";

//
//
//
//
//
//
const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});

export const FormTipCons = ({
  openModalForm = false,
  setOpenModalForm,
  title,
}) => {
  //
  //customs hook store
  const { tipoConsActivo, startSavingTipCons, errorMsgRegTipoCons } =
    useTipConsStore();

  //hooks
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [msgAlert, setMsgAlert] = useState("");

  const [txtButton, setTxtButton] = useState("");

  const formDataPac = useMemo(() => {
    if (title.toUpperCase().includes("EDITAR")) {
      setMsgAlert(`Se actualizaron los datos del tipo de consulta 🙂.`);
      setTxtButton("Actualizar");
      if (tipoConsActivo) {
        return {
          dataForm: {
            ...tipoConsActivo,
            precio: tipoConsActivo.precio.toString(),
          },
          formValidationsTipCons,
        };
      } else {
        return {
          dataForm: {},
          formValidationsTipCons: {},
        };
      }
    } else {
      setMsgAlert(`Tipo de consulta registrado con éxito 🙂.`);
      setTxtButton("Registrar");

      return {
        dataForm: {
          tipo_de_consulta: "",
          precio: "",
        },
        formValidationsTipCons,
      };
    }
  }, [title, tipoConsActivo]);

  //custom hook form
  const { formState, formValidation, onInputChange, isFormValid } = useForm(
    formDataPac.dataForm,
    formDataPac.formValidationsTipCons
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
  //control alert error
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
    startSavingTipCons(formState);
  };

  //efecto secundario para comprobar errores en el registro y actualizacion
  useEffect(() => {
    if (errorMsgRegTipoCons.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);
    }

    if (errorMsgRegTipoCons.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegTipoCons]);

  //
  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openModalForm}
        onClose={cerrarModal}
        TransitionComponent={Transition}
        keepMounted
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "colorIconMolar.main",
          },
        }}
      >
        <DialogTitle
          display="flex"
          padding="16px 10px 16px  20px !important"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          columnGap="50px"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              fontStyle: "italic",
              textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
              color: "white",
            }}
          >
            {title}
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
            <Box
              display="flex"
              margin="10px 0px"
              flexDirection="column"
              rowGap="20px"
            >
              <IconTextField
                fullWidth
                label="Tipo de consulta:"
                type="text"
                multiline
                name="tipo_de_consulta"
                value={formState.tipo_de_consulta}
                onChange={onInputChange}
                helperText={formValidation.tipo_de_consultaValid}
                colorIcon="white"
                colorHover="celesteNeon.main"
                colorTxt="white"
                colorLabel="white"
                fontWlbl="bold"
                colorErr="celesteNeon.main"
                iconEnd={
                  <Icon>
                    <Subject />
                  </Icon>
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

                  boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
                }}
              />
              <div style={{ display: "flex", justifyContent: "right" }}>
                <IconTextField
                  label="Precio:"
                  type="number"
                  name="precio"
                  value={formState.precio}
                  onChange={onInputChange}
                  helperText={formValidation.precioValid}
                  colorIcon="white"
                  colorHover="celesteNeon.main"
                  colorTxt="white"
                  colorLabel="white"
                  fontWlbl="bold"
                  colorErr="celesteNeon.main"
                  iconEnd={
                    <Icon>
                      <AttachMoney />
                    </Icon>
                  }
                  propsXS={{
                    width: "25%",
                    "& .MuiOutlinedInput-root": {
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
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& fieldset": {
                        border: "2px solid",
                        borderColor: "white",
                      },
                    },
                    "&:hover fieldset": {
                      borderColor: "white !important ",
                    },

                    boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
                  }}
                />
              </div>

              <Box
                display="flex"
                flexDirection="row"
                paddingTop="10px"
                columnGap="15px"
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
                  propsXS={{ border: "2px solid black" }}
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
                  txt_b={txtButton}
                  iconB={<SaveOutlined />}
                  propsXS={{ border: "2px solid black" }}
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
          message={errorMsgRegTipoCons.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </div>
  );
};
