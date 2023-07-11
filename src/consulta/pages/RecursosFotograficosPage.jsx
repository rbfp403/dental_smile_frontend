import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { ButtonCustom, DeleteConfirm } from "../../ui";
import { FormRecursoFoto, RecursoFotoItem } from "../components";
import { useRecursosFotosStore } from "../../hooks";

//
//
//
//
//

export const RecursosFotograficosPage = () => {
  //store
  const { recursosList, startDeletingRecursoFoto } = useRecursosFotosStore();

  //hooks
  const [stateDialog, setStateDialog] = useState(false);
  const [titleForm, setTitleForm] = useState("");
  const [openDialogDelRecurso, setOpenDialogDelRecurso] = useState(false);

  //funciones

  const abrirModal = () => {
    setStateDialog(true);
    setTitleForm("Registrar recurso fotográfico");
  };

  const abrirModalEdit = () => {
    setStateDialog(true);
    setTitleForm("Editar recurso fotográfico");
  };

  const abrirModalDelete = () => {
    setOpenDialogDelRecurso(true);
  };

  const deleteRecurso = async () => {
    await startDeletingRecursoFoto();
  };

  return (
    <Box
      component="div"
      className="animate__animated animate__fadeInUp animate__faster"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: "15px",
          backgroundColor: "primary.main",
          color: "white",
          padding: "10px 20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Recursos fotográficos de la consulta
        </Typography>
        <ButtonCustom
          altura="45px"
          txt_b_size="14px"
          flexDir="column-reverse"
          colorf="transparent"
          colorh="transparent"
          colort="white"
          colorth="celesteNeon.main"
          txt_b="Agregar"
          fontW="bold"
          iconB={<AddPhotoAlternate />}
          propsXS={{ boxShadow: "none !important" }}
          onClick={abrirModal}
        />
      </Box>

      <Box
        // sx={{ backgroundColor: "white" }}
        display="flex"
        flexDirection="column"
        rowGap="25px"
      >
        {recursosList.map((recurso, index) => {
          return (
            <RecursoFotoItem
              key={index}
              recursoFoto={recurso}
              fnOpenFormEdit={abrirModalEdit}
              fnOpenFormDel={abrirModalDelete}
            />
          );
        })}
      </Box>

      <FormRecursoFoto
        stateDialog={stateDialog}
        setStateDialog={setStateDialog}
        titleForm={titleForm}
      />

      <DeleteConfirm
        stateOpen={openDialogDelRecurso}
        setStateOpen={setOpenDialogDelRecurso}
        message={`¿Está segura que desea eliminar el recurso fotográfico?`}
        funcionDelete={deleteRecurso}
      />
    </Box>
  );
};
