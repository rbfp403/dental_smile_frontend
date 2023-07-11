import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Typography } from "@mui/material";
import { FaRegFolderOpen } from "react-icons/fa";
import { ButtonCustom, CustomTable } from "../../ui";
import { useDashboardStore, useUiStore } from "../../hooks";

const TABLE_HEAD = [
  { id: "fecha", label: "Fecha", alignLeft: true },
  { id: "procedimiento", label: "Procedimiento", alignLeft: true },
  { id: "paciente", label: "Paciente", alignLeft: true },
  { id: "consulta", label: "Consulta", alignLeft: true },
  { id: "tratamiento", label: "Tratamiento", alignLeft: true },
  { id: "pago", label: "Pago", alignLeft: true },
];

export const ProcedRealizados = () => {
  const { handleChangeTabsCons, changePage } = useUiStore();

  const {
    messagePanelProced,
    listProcedimientosPanel,
    parametrosBusqueda,
    startLoadPanel,
  } = useDashboardStore();

  const handleOpenCons = () => {
    handleChangeTabsCons(6);
  };

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
    actualizarListaPac();
  }, []);

  const BtnInFila = ({ infoRow }) => {
    return (
      <Link
        component={RouterLink}
        to={`/pacientes/${infoRow.id_paciente}/historial/${infoRow.id_consulta}`}
        style={{ textDecoration: "none" }}
      >
        <ButtonCustom
          txt_b_size="13px"
          altura="35px"
          colorf="transparent"
          colorh="transparent"
          colort="blueSecondary.main"
          colorth="primary.main"
          flexDir="column-reverse"
          txt_b="Abrir"
          fontW="bold"
          onClick={handleOpenCons}
          iconB={<FaRegFolderOpen />}
          propsXS={{ boxShadow: "none !important" }}
        />
      </Link>
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
      {/* <Topbar /> */}
      <Box padding="30px">
        <Typography variant="h5" fontWeight="bold">
          {messagePanelProced}
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
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
      >
        <CustomTable
          TABLE_HEAD={TABLE_HEAD}
          DATALIST={listProcedimientosPanel}
          withToolbar
          withCheckbox={false}
          withBoxSearch
          withButton={false}
          iconosEnFila
          columnaABuscarPri="fecha"
          searchWhat={"Buscar ..."}
          txt_header={"Lista de procedimientos realizados"}
          dataOmitida={3}
          bgColorPagination="rgba(255,255,255,0.8)"
          routePaciente={(row) => `/pacientes/${row.id_paciente}/historial`}
          BtnInFila={BtnInFila}
        />
      </Box>
    </div>
  );
};
