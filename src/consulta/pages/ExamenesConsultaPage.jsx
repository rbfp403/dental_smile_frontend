import { useEffect, useState } from "react";
import { Box, Portal, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
} from "../../ui";
import { FormModalExam } from "../components";
import { useDataStore, useExamenesStore } from "../../hooks";

const TABLE_HEAD_EXAM = [
  { id: "region_afectada", label: "Región afectada", alignLeft: true },
  { id: "enfermedad", label: "Enfermedad", alignLeft: true },
  { id: "descripcion", label: "Descripción", alignLeft: true },
];

export const ExamenesConsultaPage = () => {
  //

  //store
  const { dataActiva } = useDataStore();

  const { examenesList, changeDataExamen, startDeletingExam } =
    useExamenesStore();

  //hook abrir el formulario
  const [stateModalFormExam, setStateModalFormExam] = useState(false);

  //hook cambiar titulo del formulario
  const [titleFormExa, setTitleFormExa] = useState("");

  //hook controlDialog Eliminar
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  //hook abrir Alert de Eliminación
  const [stateSnackbar, setStateSnackbar] = useState(false);

  //hook mensaje de alerta despues de la eliminacion de un registro
  const [msgAlertDel, setMsgAlertDel] = useState("");

  useEffect(() => {
    if (dataActiva[0] === "examenEsto") {
      changeDataExamen(dataActiva[1]);
    }
  }, [dataActiva]);

  //abrir el modal para crear un examen
  const openModalFormExam = () => {
    setStateModalFormExam(true);
    setTitleFormExa("Registrar examen estomatognático");
    changeDataExamen(null);
  };

  //abrir el modal para editar examen
  const openModalExamEdit = () => {
    setStateModalFormExam(true);
    setTitleFormExa("Editar examen estomatognático");
  };

  //abrir confirm dialog eliminar
  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

  //control alert
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //eliminar Examenes
  const deleteExamenes = async (selected = []) => {
    await startDeletingExam(selected);
    if (selected.length <= 1) {
      setMsgAlertDel("El examen estomatognático fue eliminado.");
    } else {
      setMsgAlertDel(
        "Los examenes estomatognáticos fueron eliminados exitosamente."
      );
    }
    handleOpenSnackbar();
  };

  return (
    <Box
      component="div"
      className="animate__animated animate__fadeInUp animate__faster"
      sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
    >
      <Box>
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
            Exámenes del sistema estomatognático
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
            iconB={<BsFileEarmarkMedicalFill />}
            propsXS={{ boxShadow: "none !important" }}
            onClick={openModalFormExam}
          />
        </Box>
        <CustomTable
          txt_header="examenEsto"
          TABLE_HEAD={TABLE_HEAD_EXAM}
          DATALIST={examenesList}
          withToolbar={false}
          withCheckbox={false}
          iconosEnFila={false}
          columnaABuscarPri="region_afectada"
          bgColorPagination="white"
          bgColorTable="rgba(255,255,255,0.8)"
          dataOmitida={3}
          openModalEdit={openModalExamEdit}
          funcionBtnTblDelete={handleOpenDialogDel}
          funcionDeleteVarious={deleteExamenes}
        />
      </Box>

      <FormModalExam
        openModal={stateModalFormExam}
        setOpenModal={setStateModalFormExam}
        title={titleFormExa}
      />

      <DeleteConfirm
        stateOpen={openDialogDelete}
        setStateOpen={setOpenDialogDelete}
        message="¿Está segura que desea eliminar el examen estomatognático?"
        funcionDelete={deleteExamenes}
      />

      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message={msgAlertDel}
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<DeleteForever sx={{ color: "white" }} />}
        />
      </Portal>
    </Box>
  );
};
