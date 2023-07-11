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
  Payments,
  SaveOutlined,
} from "@mui/icons-material";
import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";
import { useForm, useTipPagoStore } from "../../hooks";
import { formValidationsTipPago } from "../helpers";

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

export const FormTipPago = ({
  openModalForm = false,
  setOpenModalForm,
  title,
}) => {
  //
  //customs hook store
  const { tipoPagoActivo, startSavingTipPago, errorMsgRegTipoPago } =
    useTipPagoStore();

  //hooks
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [msgAlert, setMsgAlert] = useState("");

  const [txtButton, setTxtButton] = useState("");

  const formDataPac = useMemo(() => {
    if (title.toUpperCase().includes("EDITAR")) {
      setMsgAlert(`Se actualizaron los datos del tipo de pago 🙂.`);
      setTxtButton("Actualizar");
      if (tipoPagoActivo) {
        return {
          dataForm: {
            id_proced: tipoPagoActivo.id_proced,
            id_tipoConsul: tipoPagoActivo.id_tipoConsul,
            id: tipoPagoActivo.id,
            tipo_de_pago: tipoPagoActivo.tipo_de_pago,
            precio: tipoPagoActivo.precio.toString(),
          },
          formValidationsTipPago,
        };
      } else {
        return {
          dataForm: {},
          formValidationsTipPago: {},
        };
      }
    } else {
      setMsgAlert(`Tipo de pago registrado con éxito 🙂.`);
      setTxtButton("Registrar");

      return {
        dataForm: {
          tipo_de_pago: "",
          precio: "",
        },
        formValidationsTipPago,
      };
    }
  }, [title, tipoPagoActivo]);

  //custom hook form
  const { formState, formValidation, onInputChange, isFormValid } = useForm(
    formDataPac.dataForm,
    formDataPac.formValidationsTipPago
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
    startSavingTipPago(formState);
  };

  //efecto secundario para comprobar errores en el registro y actualizacion
  useEffect(() => {
    if (errorMsgRegTipoPago.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);
    }

    if (errorMsgRegTipoPago.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegTipoPago]);

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
                label="Tipo de pago:"
                type="text"
                multiline
                name="tipo_de_pago"
                value={formState.tipo_de_pago}
                onChange={onInputChange}
                helperText={formValidation.tipo_de_pagoValid}
                colorIcon="white"
                colorHover="celesteNeon.main"
                colorTxt="white"
                colorLabel="white"
                fontWlbl="bold"
                colorErr="celesteNeon.main"
                iconEnd={
                  <Icon>
                    <Payments />
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
          message={errorMsgRegTipoPago.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </div>
  );
};
