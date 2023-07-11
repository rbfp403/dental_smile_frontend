import { useState } from "react";
import { Box, CardMedia, Divider, Grid, Typography } from "@mui/material";
import { DeleteOutlined, EditNoteOutlined } from "@mui/icons-material";
import { ButtonCustom } from "../../ui";
import { ViewRecursoFoto } from "./";
import { useRecursosFotosStore } from "../../hooks";
//
//
//

export const RecursoFotoItem = ({
  recursoFoto,
  fnOpenFormEdit,
  fnOpenFormDel,
}) => {
  //store
  const { changeDataRecuroFoto } = useRecursosFotosStore();

  //hook
  const [opeViewFoto, setOpeViewFoto] = useState(false);
  const [stateDataFoto, setStateDataFoto] = useState({});

  //handlers
  const handleOpenFormRecursoEdit = () => {
    changeDataRecuroFoto(recursoFoto);
    fnOpenFormEdit();
  };

  const handleOpenFormRecursoDel = () => {
    changeDataRecuroFoto(recursoFoto);
    fnOpenFormDel();
  };

  const handleOpenFotoView = (dataFoto) => {
    setStateDataFoto(dataFoto);
    setOpeViewFoto(true);
  };
  return (
    <Box
      className="box-shadow"
      padding="15px"
      display="flex"
      flexDirection="column"
      rowGap="10px"
      sx={{ backgroundColor: "myBgColor.main" }}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex" flexDirection="column" maxWidth="85%">
          <Typography
            fontWeight="bold"
            fontSize="18px"
            color="primary.main"
            sx={{
              wordWrap: "break-word",
            }}
          >
            {recursoFoto.titulo}
          </Typography>
          <Typography fontWeight="bold" fontSize="16px" color="black">
            {recursoFoto.fecha_recurso}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          columnGap="10px"
          alignItems="center"
        >
          <ButtonCustom
            txt_b_size="14px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort="blueSecondary.main"
            colorth="primary.main"
            flexDir="column-reverse"
            txt_b="Editar"
            fontW="bold"
            onClick={handleOpenFormRecursoEdit}
            iconB={<EditNoteOutlined />}
            propsXS={{ boxShadow: "none !important" }}
          />
          <ButtonCustom
            txt_b_size="14px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort="error.main"
            colorth="primary.main"
            flexDir="column-reverse"
            txt_b="Eliminar"
            fontW="bold"
            onClick={handleOpenFormRecursoDel}
            iconB={<DeleteOutlined />}
            propsXS={{ boxShadow: "none !important" }}
          />
        </Box>
      </Box>

      <Divider sx={{ borderBottomWidth: 2, borderColor: "black" }} />
      <Typography
        fontWeight="bold"
        fontSize="15px"
        color="black"
        sx={{
          wordWrap: "break-word",
        }}
      >
        {recursoFoto.descripcion}
      </Typography>

      <Grid container spacing={2}>
        {recursoFoto.fotos.length > 0 &&
          recursoFoto.fotos.map((foto, index) => (
            <Grid item xs={4} key={index}>
              <CardMedia
                component="img"
                image={foto.url}
                alt={foto.url}
                sx={{
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleOpenFotoView({
                    url: foto.url,
                    titulo: recursoFoto.titulo,
                    descr: recursoFoto.descripcion,
                    fecha: recursoFoto.fecha_recurso,
                  });
                }}
              />
            </Grid>
          ))}
      </Grid>
      <ViewRecursoFoto
        stateDialog={opeViewFoto}
        setStateDialog={setOpeViewFoto}
        dataFoto={stateDataFoto}
      />
    </Box>
  );
};
