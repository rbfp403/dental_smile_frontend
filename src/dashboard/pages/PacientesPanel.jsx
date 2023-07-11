import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { CustomAlert, CustomTable, DeleteConfirm } from "../../ui";
import { FormModalPac } from "../../pacientes/components";
import {
  useDashboardStore,
  useDataStore,
  usePacienteStore,
  useUiStore,
} from "../../hooks";

const TABLE_HEAD = [
  { id: "nombre", label: "Nombre", alignLeft: true },
  { id: "cedula", label: "Cédula", alignLeft: true },
  { id: "edad", label: "Edad", alignLeft: true },
  { id: "sexo", label: "Sexo", alignLeft: true },
  { id: "telefono", label: "Teléfono", alignLeft: true },
  { id: "email", label: "Email", alignLeft: true },
  { id: "responsable", label: "Responsable", alignLeft: true },
  { id: "fecha", label: "Fecha", alignLeft: true },
];

export const PacientesPanel = () => {
  //control form
  const { dataActiva } = useDataStore();

  const { changeDataPaciente } = usePacienteStore();

  const { changePage } = useUiStore();

  const {
    messagePanelPac,
    listPacientesPanel,
    parametrosBusqueda,
    startLoadPanel,
  } = useDashboardStore();

  const { pacienteActivo, startDeletingPaciente, changeTitleFormReg } =
    usePacienteStore();

  const actualizarListaPac = () => {
    if (JSON.stringify(parametrosBusqueda) === "{}") {
      const filtrosLS = JSON.parse(localStorage.getItem("filtrosPanel"));
      startLoadPanel(
        filtrosLS.tipo,
        filtrosLS.param_fechaIni,
        filtrosLS.fechaFin
      );
    } else {
      startLoadPanel(
        parametrosBusqueda.tipo,
        parametrosBusqueda.param_fechaIni,
        parametrosBusqueda.fechaFin
      );
    }
  };

  useEffect(() => {
    changePage();
  }, []);

  useEffect(() => {
    if (dataActiva[0] === "Lista de pacientes") {
      changeDataPaciente(dataActiva[1]);
    }
  }, [dataActiva]);

  //hook modal form paciente
  const [stateModalPac, setStateModalPac] = useState(false);

  //funcion abrir modal editar
  const openModalPacienteEdit = () => {
    changeTitleFormReg("Editar datos del paciente");
    setStateModalPac(true);
  };

  //
  //controlDialog
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

  //
  //control alert
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  const [msgAlertDel, setMsgAlertDel] = useState("");

  //funcion eliminar registro paciente y eliminar varios registros
  const deleteRegisterPaciente = (selected = []) => {
    startDeletingPaciente(selected);
    if (selected.length <= 1) {
      setMsgAlertDel("El registro del paciente fue eliminado.");
    } else {
      setMsgAlertDel("Los registros fueron eliminados exitosamente.");
    }
    handleOpenSnackbar();
  };

  //con cada cierre y apertura de los modales se actualiza la lista,
  // cuando se eliminan varios se setea a null el pacienteActivo
  useEffect(() => {
    actualizarListaPac();
  }, [stateModalPac, openDialogDelete, pacienteActivo]);

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.1),rgba(250,250,250, 0.1)) , url(/assets/img/fondos/pacientesPage.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {/* <Topbar /> */}
      <Box padding="30px">
        <Typography variant="h5" fontWeight="bold">
          {messagePanelPac}
        </Typography>
      </Box>
      <Box
        margin="0px 20px 0 20px"
        padding="15px"
        borderRadius="10px"
        display="flex"
        justifyContent="end"
        className="box-shadow animate__animated animate__fadeIn"
        sx={{
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <CustomTable
          TABLE_HEAD={TABLE_HEAD}
          DATALIST={listPacientesPanel}
          withToolbar
          withBoxSearch
          withButton={false}
          iconosEnFila={false}
          columnaABuscarPri="fecha"
          searchWhat={"Buscar pacientes ..."}
          txt_header={"Lista de pacientes"}
          // bgHeaderColor={""}
          dataOmitida={9}
          bgColorPagination="rgba(255,255,255,0.7)"
          openModalEdit={openModalPacienteEdit}
          funcionBtnTblDelete={handleOpenDialogDel}
          funcionDeleteVarious={deleteRegisterPaciente}
          routePaciente={(row) => `/pacientes/${row.id}/historial`}
        />

        <FormModalPac
          openModalForm={stateModalPac}
          setOpenModalForm={setStateModalPac}
        />

        <DeleteConfirm
          stateOpen={openDialogDelete}
          setStateOpen={setOpenDialogDelete}
          message={
            <>
              ¿Está segura que desea eliminar el registro de
              <span style={{ color: "#9c27b0" }}>
                {pacienteActivo !== null &&
                  ` ${pacienteActivo.nombre} - ${pacienteActivo.cedula}`}
              </span>
              ?
            </>
          }
          funcionDelete={deleteRegisterPaciente}
        />

        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message={msgAlertDel}
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<DeleteForever sx={{ color: "white" }} />}
        />
      </Box>
    </div>
  );
};
