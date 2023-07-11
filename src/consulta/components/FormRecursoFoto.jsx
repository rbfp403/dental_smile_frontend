import { useEffect, useRef, useState } from "react";
import {
  Box,
  CardMedia,
  CircularProgress,
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
  Close,
  CloseOutlined,
  DeleteOutline,
  Save,
  UploadOutlined,
} from "@mui/icons-material";
import { MdOutlineTitle, MdSubtitles } from "react-icons/md";
import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";
import { useRecursosFotosStore } from "../../hooks";

//
//
//

export const FormRecursoFoto = ({ stateDialog, setStateDialog, titleForm }) => {
  //store
  const {
    startSavingRecursoFoto,
    errorMsgRegRecurso,
    recursoActivo,
    changeDataRecuroFoto,
  } = useRecursosFotosStore();
  //hooks
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [stateTitle, setStateTitle] = useState("");
  const [stateDescription, setStateDescription] = useState("");
  const fileInputRef = useRef();
  const [arrImgSelect, setArrImgSelect] = useState([]);
  const [arrImgUrlDel, setArrImgUrlDel] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);

  const [msgTypeFileProblem, setMsgTypeFileProblem] = useState(false);

  //cargarDatos
  useEffect(() => {
    if (recursoActivo) {
      setStateTitle(recursoActivo.titulo);
      setStateDescription(recursoActivo.descripcion);
      setSelectedImages(recursoActivo.fotos);
      setArrImgSelect(recursoActivo.fotos);
      setArrImgUrlDel([]);
    }
  }, [recursoActivo]);

  //handlers
  const resetInput = () => {
    setStateTitle("");
    setStateDescription("");
    setSelectedImages([]);
    setArrImgSelect([]);
    setArrImgUrlDel([]);
  };

  const cerrarModal = () => {
    resetInput();
    changeDataRecuroFoto(null);
    setStateDialog(false);
  };

  const cleanArrImages = () => {
    setSelectedImages([]);
    setArrImgSelect([]);
  };

  const handleImageDelete = (index, image) => {
    if (typeof image === "object") {
      setArrImgUrlDel([...arrImgUrlDel, image.id]);
    }

    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      // if (updatedImages.length > 0) {
      updatedImages.splice(index, 1);
      return updatedImages;
      // } else {
      //   return [];
      // }
    });

    setArrImgSelect((prevImages) => {
      const updatedImages = [...prevImages];
      // if (index !== 0) {
      updatedImages.splice(index, 1);
      return updatedImages;
      // } else {
      //   return [];
      // }
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      if (
        file.size < 10485760 &&
        (file.name.includes(".jpg") || file.name.includes(".jpeg"))
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const image = e.target.result;
          setSelectedImages((prevImages) => [...prevImages, image]);
          setArrImgSelect((prevImages) => [...prevImages, file]);
        };
        reader.readAsDataURL(file);

        //
      } else {
        setMsgTypeFileProblem(true);
      }
    });
  };

  //funcion enviar los datos
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setFormSubmitted(true);

    const recursoData = {
      stateTitle,
      stateDescription,
      arrImgSelect,
    };

    await startSavingRecursoFoto(recursoData, arrImgUrlDel);
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
    if (errorMsgRegRecurso.msg === "Sin errores" && formSubmitted) {
      handleOpenSnackbar();
      setFormSubmitted(false);
      setIsSaving(false);
      cerrarModal();
    }
    if (errorMsgRegRecurso.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
      setIsSaving(false);
    }
  }, [errorMsgRegRecurso]);

  return (
    <Dialog
      maxWidth="xl"
      open={stateDialog}
      onClose={cerrarModal}
      sx={{
        "& .MuiPaper-root": {
          height: "90%",
          width: "90%",
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "5px",
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
          {titleForm}
        </Typography>

        <Box display="flex" flexDirection="row" columnGap="10px">
          {isSaving ? (
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
            desactived={isSaving}
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

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          paddingTop: "16px",
        }}
      >
        <Box display="flex" flexDirection="row" columnGap="20px">
          <Box display="flex" flexDirection="column" flexBasis="40%">
            <Typography fontWeight="bold" fontSize="17px" color="primary.main">
              Título
            </Typography>
            <IconTextField
              fullWidth
              multiline
              label=""
              type="text"
              placeholder="Ingrese un título"
              value={stateTitle}
              onChange={({ target }) => {
                setStateTitle(target.value);
              }}
              colorIcon="primary.main"
              colorHover="btnHoverInForm.main"
              colorTxt="black"
              colorLabel="primary.main"
              iconEnd={
                <Icon>
                  <MdOutlineTitle />
                </Icon>
              }
            />
          </Box>
          <Box display="flex" flexDirection="column" flexBasis="60%">
            <Typography fontWeight="bold" fontSize="17px" color="primary.main">
              Descripción
            </Typography>
            <IconTextField
              fullWidth
              multiline
              label=""
              type="text"
              placeholder="Ingrese una descripción"
              value={stateDescription}
              onChange={({ target }) => {
                setStateDescription(target.value);
              }}
              colorIcon="primary.main"
              colorHover="btnHoverInForm.main"
              colorTxt="black"
              colorLabel="primary.main"
              iconEnd={
                <Icon>
                  <MdSubtitles />
                </Icon>
              }
            />
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          paddingTop="20px"
          alignItems="center"
        >
          <div>
            <Typography fontWeight="bold" fontSize="17px" color="primary.main">
              Fotografías
            </Typography>
            {msgTypeFileProblem && (
              <Typography
                fontWeight="bold"
                fontSize="14px"
                color="primary.main"
              >
                {"Solo se permiten archivos JPEG (.jpg), no superiores a 10MB."}
              </Typography>
            )}
          </div>
          <div>
            <input
              // accept="image/*"
              accept=".jpg"
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />

            <IconButton
              color="primary"
              onClick={cleanArrImages}
              sx={{
                ":hover": {
                  color: "black",
                },
              }}
            >
              <DeleteOutline />
            </IconButton>

            <IconButton
              color="primary"
              onClick={() => fileInputRef.current.click()}
              sx={{
                ":hover": {
                  color: "black",
                },
              }}
            >
              <UploadOutlined />
            </IconButton>
          </div>
        </Box>
        <Grid container spacing={2}>
          {selectedImages.length > 0 &&
            selectedImages.map((image, index) => (
              <Grid item xs={6} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography color="primary" fontWeight="bold">
                      {typeof image === "string" ? "Nueva" : ""}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        handleImageDelete(index, image);
                      }}
                    >
                      <CloseOutlined
                        style={{ fontSize: "25px", color: "#602a90" }}
                      />
                    </IconButton>
                  </Box>
                  <CardMedia
                    component="img"
                    // image={image}
                    image={typeof image === "object" ? image.url : image}
                    alt={`Uploaded ${index}`}
                    sx={{
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message="Recurso Fotográfico actualizado"
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
        />

        <CustomAlert
          stateSnackbar={stateSnackbarError}
          handleCloseSnackbar={handleCloseSnackbarError}
          title={"No se realizaron los cambios"}
          message={errorMsgRegRecurso.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </Dialog>
  );
};
