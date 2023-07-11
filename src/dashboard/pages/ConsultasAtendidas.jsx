import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ConsultaPanelItem } from "../components";
import { useDashboardStore, useUiStore } from "../../hooks";

//
//
//
//

export const ConsultasAtendidas = () => {
  const { changePage } = useUiStore();
  const {
    messagePanelCons,
    listConsultasPanel,
    parametrosBusqueda,
    startLoadPanel,
  } = useDashboardStore();

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
          {messagePanelCons}
        </Typography>
      </Box>
      <Box
        className="animate__animated animate__fadeIn"
        display="flex"
        flexDirection="column"
        margin="0px 20px 0 20px"
        padding="15px"
        justifyContent="end"
        rowGap="25px"
      >
        {listConsultasPanel.map((cons, index) => (
          <ConsultaPanelItem key={index} consultaItem={cons} />
        ))}
      </Box>
    </div>
  );
};
