import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import {
  CalendarMonth,
  ContactPage,
  MedicalInformation,
} from "@mui/icons-material";
import {
  InfoPagePaciente,
  HistorialPagePaciente,
  ProxCitasPagePaciente,
} from "./";
import { useAntecedenteStore, usePacienteStore, useUiStore } from "../../hooks";
//
//
//
export const PacienteHistorial = () => {
  //

  const { changePage, hookTabs, handleChangeTabs, savePacienteSidebar } =
    useUiStore();

  const { pacienteActivo, startLoadPaciente } = usePacienteStore();

  const { startLoadAntecedentes } = useAntecedenteStore();

  const { id_pac } = useParams();

  useEffect(() => {
    changePage();
    startLoadPaciente(id_pac);
    startLoadAntecedentes(id_pac);
    handleChangeTabs(parseInt(localStorage.getItem("lastTabPaciente")) || 0);
  }, []);

  useEffect(() => {
    if (pacienteActivo) {
      savePacienteSidebar({
        to: pacienteActivo.id,
        title: pacienteActivo.nombre,
        arrCons: [],
      });
    }
  }, [pacienteActivo]);

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="0px 20px"
        position="sticky"
        top="0px"
        zIndex="10000"
        boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
        sx={{
          backgroundColor: "myBgColor.main",
        }}
      >
        <Typography
          variant="h3"
          color="black"
          fontWeight="bold"
          fontSize="25px"
          fontStyle="italic"
          sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.20)  !important" }}
        >
          Paciente:{" "}
          <span style={{ color: "#9c27b0" }}>
            {pacienteActivo && pacienteActivo.nombre}
          </span>
        </Typography>

        <Tabs
          value={hookTabs}
          onChange={(event, newValue) => {
            handleChangeTabs(newValue);
          }}
        >
          <Tab
            sx={{ color: "black" }}
            icon={<ContactPage />}
            label="INFORMACIÓN"
          />
          <Tab
            sx={{ color: "black" }}
            icon={<CalendarMonth />}
            label="PRÓXIMAS CITAS"
          />
          <Tab
            sx={{ color: "black" }}
            icon={<MedicalInformation />}
            label="HISTORIAL"
          />
        </Tabs>
      </Box>

      <>
        {hookTabs === 0 && <InfoPagePaciente />}
        {hookTabs === 1 && <ProxCitasPagePaciente />}
        {hookTabs === 2 && <HistorialPagePaciente />}
      </>
    </div>
  );
};
