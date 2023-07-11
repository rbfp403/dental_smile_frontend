import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DeleteForever, PersonAddAlt } from "@mui/icons-material";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
  Topbar,
} from "../../ui";
import { FormModalPac } from "../components";
import { useDataStore, usePacienteStore, useUiStore } from "../../hooks";

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

//
//
//
//

export const PacientesPage = () => {
  //store
  const { dataActiva } = useDataStore();

  //control form
  const [stateModalPac, setStateModalPac] = useState(false);

  const { changePage } = useUiStore();
  const {
    pacientesList,
    pacienteActivo,
    startLoadPacientes,
    startDeletingPaciente,
    changeTitleFormReg,
    changeDataPaciente,
  } = usePacienteStore();

  useEffect(() => {
    changePage();
    startLoadPacientes();
  }, []);

  useEffect(() => {
    if (dataActiva[0] === "Lista de pacientes") {
      changeDataPaciente(dataActiva[1]);
    }
  }, [dataActiva]);

  //funcion abrir modal registrar
  const openModalPaciente = () => {
    changeTitleFormReg("Registro de paciente");
    // changeModalFormReg(true);
    setStateModalPac(true);
  };
  //funcion abrir modal editar
  const openModalPacienteEdit = () => {
    changeTitleFormReg("Editar datos del paciente");
    // changeModalFormReg(true);
    setStateModalPac(true);
  };
  //controlDialog
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

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
  const deleteRegisterPaciente = async (selected = []) => {
    await startDeletingPaciente(selected);
    if (selected.length <= 1) {
      setMsgAlertDel("El registro del paciente fue eliminado.");
    } else {
      setMsgAlertDel("Los registros fueron eliminados exitosamente.");
    }
    handleOpenSnackbar();
  };

  const BtnToolbarTable = () => {
    return (
      <ButtonCustom
        altura={"40px"}
        colorf="white"
        colorh="black"
        colort="black"
        colorth="celesteNeon.main"
        txt_b={"Registrar Paciente"}
        fontW="bold"
        iconB={<PersonAddAlt />}
        onClick={openModalPaciente}
      />
    );
  };

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
      <Topbar />
      <Box
        margin="25px 20px 0px 20px"
        display="flex"
        justifyContent="end"
        padding="15px"
        borderRadius="10px"
        className="box-shadow animate__animated animate__fadeIn"
        sx={{
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        <CustomTable
          TABLE_HEAD={TABLE_HEAD}
          DATALIST={pacientesList}
          withToolbar
          withBoxSearch
          withButton
          iconosEnFila={false}
          btnToolbarTable={BtnToolbarTable}
          columnaABuscarPri="fecha"
          searchWhat={"Buscar pacientes ..."}
          txt_header={"Lista de pacientes"}
          bgColorPagination="rgba(255,255,255,0.7)"
          dataOmitida={9}
          openModalEdit={openModalPacienteEdit}
          funcionBtnTblDelete={handleOpenDialogDel}
          funcionDeleteVarious={deleteRegisterPaciente}
          routePaciente={(row) => `${row.id}/historial`}
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
