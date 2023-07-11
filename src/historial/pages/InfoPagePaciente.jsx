import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { FaUserEdit } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
} from "../../ui";
import { FormModalAntec, PacInfoItem } from "../components";
import { FormModalPac } from "../../pacientes/components";
import {
  useAntecedenteStore,
  useDataStore,
  usePacienteStore,
} from "../../hooks";

const TABLE_HEAD = [
  { id: "tip_antecedente", label: "Tipo de antecedente", alignLeft: true },
  { id: "des_antecedente", label: "Descripción", alignLeft: true },
];
const TABLE_HEAD_2 = [
  { id: "par_antecedente", label: "Parentesco", alignLeft: true },
  { id: "tip_antecedente", label: "Tipo de antecedente", alignLeft: true },
  { id: "des_antecedente", label: "Descripción", alignLeft: true },
];
//
//
//
//

export const InfoPagePaciente = () => {
  const { pacienteActivo, startDeletingPaciente, changeTitleFormReg } =
    usePacienteStore();

  const { antecedentes, changeDataAntecedente, startDeletingAntecedente } =
    useAntecedenteStore();

  const { dataActiva } = useDataStore();

  const navigate = useNavigate();

  useEffect(() => {
    changeTitleFormReg("Editar datos del paciente");
  }, []);

  //control form paciente

  const [stateModalPac, setStateModalPac] = useState(false);
  const openModalPacienteEdit = () => {
    setStateModalPac(true);
  };
  //controlDialog paciente
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };
  const deleteRegisterPaciente = () => {
    startDeletingPaciente();
    navigate("/pacientes");
  };

  //contro form antecedentes
  useEffect(() => {
    if (dataActiva[0] === "Antecedente") {
      changeDataAntecedente(dataActiva[1]);
    }
  }, [dataActiva]);

  const [stateModalAnt, setStateModalAnt] = useState(false);
  const [titleAnte, setTitleAnte] = useState("");
  const [showParent, setShowParent] = useState(false);
  const openModalAnteceReg = () => {
    setTitleAnte("Registro de antecedente personal");
    setShowParent(false);
    setStateModalAnt(true);
  };

  const openModalAnteceFaReg = () => {
    setTitleAnte("Registro de antecedente familiar");
    setShowParent(true);
    setStateModalAnt(true);
  };

  const openModalAnteceEdit = () => {
    setTitleAnte("Editar antecedente personal");
    setShowParent(false);
    setStateModalAnt(true);
  };
  const openModalAnteceFaEdit = () => {
    setTitleAnte("Editar antecedente familiar");
    setShowParent(true);
    setStateModalAnt(true);
  };

  //control dialog antecedente
  const [openDialogAnteced, setOpenDialogAnteced] = useState(false);

  const handleOpenAntecedDel = () => {
    setOpenDialogAnteced(true);
  };

  //control alert
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  const deleteRegisterAnteced = () => {
    startDeletingAntecedente();
    handleOpenSnackbar();
  };

  return (
    <Box
      padding="20px"
      sx={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: " url(/assets/img/fondos/agendarCita.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        rowGap="30px"
      >
        {/**datos personales */}
        <div className="animate__animated animate__fadeInRight animate__faster">
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            rowGap="7px"
          >
            <Box
              // position="sticky"
              // top="72px"
              // zIndex="10000"
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
              padding="0px 10px"
              // sx={{ backgroundColor: "rgba(250,250,250, 0.6)" }}
              sx={{ backgroundColor: "myBgColor.main" }}
              // sx={{ backgroundColor: "white" }}
            >
              <Typography variant="h6">Datos personales</Typography>

              <div>
                <ButtonCustom
                  altura={"60px"}
                  colorf={"transparent"}
                  colorh={"transparent"}
                  colort={"blueSecondary.main"}
                  txt_b={"Editar"}
                  flexDir="column-reverse"
                  colorth={"secondary.main"}
                  txt_b_size="14px"
                  propsXS={{ boxShadow: "none !important" }}
                  onClick={openModalPacienteEdit}
                  iconB={<FaUserEdit />}
                />
                <ButtonCustom
                  altura={"60px"}
                  colorf={"transparent"}
                  colorh={"transparent"}
                  colort={"error.main"}
                  txt_b={"Eliminar"}
                  flexDir="column-reverse"
                  colorth={"secondary.main"}
                  txt_b_size="14px"
                  propsXS={{ boxShadow: "none !important" }}
                  onClick={handleOpenDialogDel}
                  iconB={<TiUserDelete />}
                />
              </div>
            </Box>
            <Paper
              elevation={5}
              sx={{
                width: "100%",
                padding: "20px",
                margin: "0px 20px",
                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
                backgroundColor: "rgba(250,250,250, 0.8)",
              }}
            >
              <Grid
                container
                sx={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridTemplateRows: "repeat(3, max-content)",
                  rowGap: "15px",
                  columnGap: "10px",
                  gridTemplateAreas: `"nombre cedula responsable " 
              "edad email responsable "
              "sexo telefono  fechas "`,
                }}
              >
                {pacienteActivo && (
                  <>
                    <PacInfoItem
                      gridArea={"nombre"}
                      lblItem={"Paciente"}
                      dataPac={pacienteActivo.nombre}
                    />

                    <PacInfoItem
                      gridArea={"cedula"}
                      lblItem={"Cédula"}
                      dataPac={pacienteActivo.cedula}
                    />
                    <PacInfoItem
                      gridArea={"responsable"}
                      lblItem={"Responsable"}
                      dataPac={
                        <>
                          <span style={{ display: "block" }}>
                            {pacienteActivo.nomRes}
                          </span>
                          <span style={{ display: "block" }}>
                            {pacienteActivo.parRes}
                          </span>
                          <span style={{ display: "block" }}>
                            {pacienteActivo.telRes}
                          </span>
                        </>
                      }
                    />
                    <PacInfoItem
                      gridArea={"edad"}
                      lblItem={"Edad"}
                      dataPac={pacienteActivo.edad}
                    />
                    <PacInfoItem
                      gridArea={"email"}
                      lblItem={"Email"}
                      dataPac={pacienteActivo.email}
                    />
                    <PacInfoItem
                      gridArea={"sexo"}
                      lblItem={"Sexo"}
                      dataPac={pacienteActivo.sexo}
                    />
                    <PacInfoItem
                      gridArea={"telefono"}
                      lblItem={"Teléfono"}
                      dataPac={pacienteActivo.telefono}
                    />
                  </>
                )}
                <Grid
                  item
                  gridArea="fechas"
                  display="flex"
                  flexDirection="column"
                  alignItems="end"
                >
                  <Typography sx={{ color: "grey", fontWeight: "bold" }}>
                    Fecha de registro:
                    <span
                      style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {pacienteActivo ? ` ${pacienteActivo.fecha}` : ""}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "grey", fontWeight: "bold" }}>
                    Fecha de actualización:
                    <span
                      style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {pacienteActivo ? ` ${pacienteActivo.fecha_upd}` : ""}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </div>

        {/* antecedentes personales */}
        <div
          className="animate__animated animate__fadeInLeft animate__faster"
          style={{ width: "1092px" }}
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            rowGap="7px"
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
              padding="0px 10px"
              sx={{ backgroundColor: "myBgColor.main" }}
            >
              <Typography variant="h6">Antecedentes personales</Typography>
              <ButtonCustom
                altura={"60px"}
                colorf={"transparent"}
                colorh={"transparent"}
                colort={"primary.main"}
                txt_b={"Agregar"}
                flexDir="column-reverse"
                colorth={"secondary.main"}
                txt_b_size="14px"
                propsXS={{ boxShadow: "none !important" }}
                onClick={openModalAnteceReg}
                iconB={<MdPostAdd />}
              />
            </Box>

            {antecedentes[0].length > 0 ? (
              <CustomTable
                txt_header="Antecedente"
                bgColorTable="white"
                TABLE_HEAD={TABLE_HEAD}
                DATALIST={antecedentes[0]}
                withToolbar={false}
                withCheckbox={false}
                iconosEnFila={false}
                dataOmitida={3}
                openModalEdit={openModalAnteceEdit}
                funcionBtnTblDelete={handleOpenAntecedDel}
                // funcionDeleteVarious={deleteRegisterPaciente}
              />
            ) : (
              <h4>Sin antecedentes personales</h4>
            )}
          </Box>
        </div>

        {/* antecedentes familiares */}
        <div
          className="animate__animated animate__fadeInLeft animate__faster"
          style={{ width: "1092px" }}
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            rowGap="7px"
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
              padding="0px 10px"
              sx={{ backgroundColor: "myBgColor.main" }}
            >
              <Typography variant="h6">Antecedentes familiares</Typography>
              <ButtonCustom
                altura={"60px"}
                colorf={"transparent"}
                colorh={"transparent"}
                colort={"primary.main"}
                txt_b={"Agregar"}
                flexDir="column-reverse"
                colorth={"secondary.main"}
                txt_b_size="14px"
                propsXS={{ boxShadow: "none !important" }}
                onClick={openModalAnteceFaReg}
                iconB={<MdPostAdd />}
              />
            </Box>

            {antecedentes[1].length > 0 ? (
              <CustomTable
                txt_header="Antecedente"
                bgColorTable="white"
                TABLE_HEAD={TABLE_HEAD_2}
                DATALIST={antecedentes[1]}
                withToolbar={false}
                withCheckbox={false}
                iconosEnFila={false}
                dataOmitida={2}
                openModalEdit={openModalAnteceFaEdit}
                funcionBtnTblDelete={handleOpenAntecedDel}
                // funcionDeleteVarious={deleteRegisterPaciente}
              />
            ) : (
              <h4>Sin antecedentes familiares</h4>
            )}
          </Box>
        </div>
      </Box>

      {pacienteActivo !== null ? (
        <FormModalPac
          openModalForm={stateModalPac}
          setOpenModalForm={setStateModalPac}
        />
      ) : (
        ""
      )}

      <FormModalAntec
        openModalForm={stateModalAnt}
        setOpenModalForm={setStateModalAnt}
        title={titleAnte}
        showParent={showParent}
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

      <DeleteConfirm
        stateOpen={openDialogAnteced}
        setStateOpen={setOpenDialogAnteced}
        message="¿Está segura que desea eliminar el registro del antecedente?"
        funcionDelete={deleteRegisterAnteced}
      />

      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message="Antecedente eliminado"
        colorbg="blueSecondary.main"
        colortxt="white"
        iconAlert={<DeleteForever sx={{ color: "white" }} />}
      />
    </Box>
  );
};
