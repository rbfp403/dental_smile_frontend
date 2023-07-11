import { useEffect, useState } from "react";
import { Box, Portal, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { TbDentalBroken } from "react-icons/tb";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
} from "../../ui";
import { FormModalDiag } from "../components";
import { useDataStore, useDiagnosticosStore } from "../../hooks";

const TABLE_HEAD_DIAG = [
  {
    id: "enfermedad_diagnosticada",
    label: "Enfermedad diagnosticada",
    alignLeft: true,
  },
  { id: "codigoCIE", label: "Código CIE", alignLeft: true },
  {
    id: "presuntivo_definitivo",
    label: "Presuntivo/Definitivo",
    alignLeft: true,
  },
  { id: "descripcion", label: "Descripción", alignLeft: true },
];

//
//
//
export const DiagnosticoConsultaPage = () => {
  //store
  const { dataActiva } = useDataStore();
  const {
    diagnosticosList,
    diagActivo,
    changeDataDiag,
    startDeletingDiagnostico,
  } = useDiagnosticosStore();

  //hook abrir el formulario
  const [stateModalFormDiag, setStateModalFormDiag] = useState(false);

  //hook cambiar titulo del formulario
  const [titleFormDiag, setTitleFormDiag] = useState("");

  //hook controlDialog Eliminar
  const [openDialogDeleteDiag, setOpenDialogDeleteDiag] = useState(false);

  //hook abrir Alert de Eliminación
  const [stateSnackbar, setStateSnackbar] = useState(false);

  //hook mensaje de alerta despues de la eliminacion de un registro
  const [msgAlertDel, setMsgAlertDel] = useState("");

  //efecto secundario carga la data de la tabla al diagnostico activo
  useEffect(() => {
    if (dataActiva[0] === "diagnostico") {
      changeDataDiag(dataActiva[1]);
    }
  }, [dataActiva]);

  //abrir el modal para crear un diagnostico
  const openModalFormDiag = () => {
    setStateModalFormDiag(true);
    setTitleFormDiag("Registrar diagnóstico");
    changeDataDiag(null);
  };

  //abrir el modal para editar un diagnostico
  const openModalDiagEdit = () => {
    setStateModalFormDiag(true);
    setTitleFormDiag("Editar diagnóstico");
  };

  //abrir confirm dialog eliminar diagnostico
  const handleOpenDialogDelDiag = () => {
    setOpenDialogDeleteDiag(true);
  };

  //control alert
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //eliminar diagnostico
  const deleteDiagnostico = async () => {
    await startDeletingDiagnostico();
    setMsgAlertDel("El diagnóstico fue eliminado.");
    handleOpenSnackbar();
  };
  //
  return (
    <Box
      component="div"
      className="animate__animated animate__fadeInUp animate__faster"
      sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
    >
      {/* Diagnosticos  */}
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
            Diagnóstico
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
            iconB={<TbDentalBroken />}
            propsXS={{ boxShadow: "none !important" }}
            onClick={openModalFormDiag}
          />
        </Box>
        <CustomTable
          txt_header="diagnostico"
          TABLE_HEAD={TABLE_HEAD_DIAG}
          DATALIST={diagnosticosList}
          withToolbar={false}
          withCheckbox={false}
          iconosEnFila={false}
          columnaABuscarPri="enfermedad_diagnosticada"
          bgColorPagination="white"
          bgColorTable="rgba(255,255,255,0.8)"
          openModalEdit={openModalDiagEdit}
          funcionBtnTblDelete={handleOpenDialogDelDiag}
        />
      </Box>

      <FormModalDiag
        openModal={stateModalFormDiag}
        setOpenModal={setStateModalFormDiag}
        title={titleFormDiag}
      />

      <DeleteConfirm
        stateOpen={openDialogDeleteDiag}
        setStateOpen={setOpenDialogDeleteDiag}
        message={`¿Está segura que desea eliminar el diagnóstico ${
          diagActivo &&
          diagActivo.codigoCIE + "-" + diagActivo.enfermedad_diagnosticada
        }?`}
        funcionDelete={deleteDiagnostico}
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
