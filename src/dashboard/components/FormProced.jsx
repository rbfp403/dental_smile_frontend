import { forwardRef, useMemo, useState, useEffect } from "react";
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
  AttachMoney,
  CancelOutlined,
  CheckCircleOutline,
  CloseOutlined,
  SaveOutlined,
  Subject,
} from "@mui/icons-material";
import { FaNotesMedical } from "react-icons/fa";
import { TbMedicalCross } from "react-icons/tb";
import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";
import { FormChooseProced } from "./";
import { useForm, useProcedStore } from "../../hooks";
import { formValidationsProced } from "../helpers";

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

export const FormProced = ({
  openModalForm = false,
  setOpenModalForm,
  title,
}) => {
  //
  //customs hook store
  const { procedActivo, startSavingProced, errorMsgRegProced } =
    useProcedStore();

  //hooks
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [msgAlert, setMsgAlert] = useState("");

  const [txtButton, setTxtButton] = useState("");

  const [stateModalChoose, setStateModalChoose] = useState(false);

  const [statePositionForm, setStatePositionForm] = useState({ left: null });

  const [stateNomenProced, setStateNomenProced] = useState({
    codigo: "",
    procedimiento: "",
  });

  const formDataPac = useMemo(() => {
    // ACTUALIZAR
    if (title.toUpperCase().includes("EDITAR")) {
      setMsgAlert(
        `Se actualizaron los datos del procedimiento odontológico 🙂.`
      );
      setTxtButton("Actualizar");
      if (procedActivo) {
        setStateNomenProced({
          codigo: procedActivo.codigo,
          procedimiento: procedActivo.procedimiento,
        });
        return {
          dataForm: {
            ...procedActivo,
            precio: procedActivo.precio.toString(),
          },
          formValidationsProced,
        };
      } else {
        return {
          dataForm: {},
          formValidationsProced: {},
        };
      }
    } else {
      setMsgAlert(`Procedimiento odontológico registrado con éxito 🙂.`);
      setTxtButton("Registrar");
      setStateNomenProced({
        codigo: "",
        procedimiento: "",
      });
      return {
        dataForm: {
          precio: "",
          descripcion: "",
        },
        formValidationsProced,
      };
    }
  }, [title, procedActivo]);

  //custom hook form
  const { formState, formValidation, onInputChange, isFormValid } = useForm(
    formDataPac.dataForm,
    formDataPac.formValidationsProced
  );

  const cerrarModal = () => {
    setOpenModalForm(false);
    setStateNomenProced({
      codigo: "",
      procedimiento: "",
    });
  };

  const handleOpenFormChoose = () => {
    setStateModalChoose(true);
    setStatePositionForm({ left: 10 });
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

    const formStateNew = {
      ...formState,
      ...stateNomenProced,
    };

    startSavingProced(formStateNew);
  };

  //efecto secundario para comprobar errores en el registro y actualizacion
  useEffect(() => {
    if (errorMsgRegProced.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);
    }

    if (errorMsgRegProced.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegProced]);

  //
  return (
    <div>
      <Dialog
        maxWidth="md"
        fullWidth
        open={openModalForm}
        onClose={cerrarModal}
        TransitionComponent={Transition}
        keepMounted
        sx={{
          "& .MuiPaper-root": {
            width: "750px",
            backgroundColor: "colorIconMolar.main",
            position: "absolute",
            left: statePositionForm.left,
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
            <Grid
              container
              sx={{
                display: "grid",
                paddingTop: "5px",
                gridTemplateColumns: "repeat(5, 1fr)",
                gridTemplateRows: "repeat(4, max-content)",
                gridTemplateAreas: `". . . codigo codigo"
                "proced proced proced proced proced"
                "precio descr descr descr descr "
                ". . . . ." 
                "btns btns btns btns btns" `,
                rowGap: "20px",
                columnGap: "20px",
                alignItems: "start",
              }}
            >
              <Grid item gridArea="codigo">
                <IconTextField
                  fullWidth
                  label="Código:"
                  type="text"
                  name="codigo"
                  value={stateNomenProced.codigo}
                  onChange={(event) => {
                    setStateNomenProced({
                      ...stateNomenProced,
                      codigo: event.target.value,
                    });
                  }}
                  InputProps={{ readOnly: true }}
                  colorIcon="celesteNeon.main"
                  colorHover="celesteNeon.main"
                  colorTxt="white"
                  colorLabel="celesteNeon.main"
                  fontWlbl="bold"
                  colorErr="celesteNeon.main"
                  iconEnd={
                    <IconButton onClick={handleOpenFormChoose}>
                      <TbMedicalCross
                        style={{
                          color: "#02ECEE",
                        }}
                      />
                    </IconButton>
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
              </Grid>
              <Grid item gridArea="proced">
                <IconTextField
                  fullWidth
                  label="Procedimiento:"
                  type="text"
                  multiline
                  name="procedimiento"
                  value={stateNomenProced.procedimiento}
                  onChange={(event) => {
                    setStateNomenProced({
                      ...stateNomenProced,
                      procedimiento: event.target.value,
                    });
                  }}
                  helperText={
                    stateNomenProced.procedimiento.length > 0
                      ? ""
                      : "Campo requerido"
                  }
                  colorIcon="white"
                  colorHover="celesteNeon.main"
                  colorTxt="white"
                  colorLabel="white"
                  fontWlbl="bold"
                  colorErr="celesteNeon.main"
                  align_Txt="justify"
                  iconEnd={
                    <Icon>
                      <FaNotesMedical />
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
              </Grid>
              <Grid item gridArea="precio">
                <IconTextField
                  fullWidth
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
              </Grid>
              <Grid item gridArea="descr">
                <IconTextField
                  fullWidth
                  label="Descripción:"
                  type="text"
                  multiline
                  name="descripcion"
                  value={formState.descripcion}
                  onChange={onInputChange}
                  helperText={formValidation.descripcionValid}
                  colorIcon="white"
                  colorHover="celesteNeon.main"
                  colorTxt="white"
                  colorLabel="white"
                  fontWlbl="bold"
                  colorErr="celesteNeon.main"
                  align_Txt="justify"
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
              </Grid>

              <Grid
                item
                gridArea="btns"
                display="flex"
                justifyContent="end"
                columnGap="10px"
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
          message={errorMsgRegProced.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
      <FormChooseProced
        openModalForm={stateModalChoose}
        setOpenModalForm={setStateModalChoose}
        positionModalFather={setStatePositionForm}
        changeNomedProced={setStateNomenProced}
      />
    </div>
  );
};
