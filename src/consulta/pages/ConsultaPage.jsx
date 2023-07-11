import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Tabs, Typography } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { ButtonCustom, CustomTab, DeleteConfirm } from "../../ui";
import {
  DetalleConsultaPage,
  ExamenesConsultaPage,
  OdontogramaPage,
  SaludBucalPage,
  PlanesConsultaPage,
  DiagnosticoConsultaPage,
  TratamientoConsultaPage,
  PagosConsultaPage,
  RecursosFotograficosPage,
} from "./";

import {
  ConsInfoItem,
  IconoDetalle,
  IconoDiagnostico,
  IconoExamenes,
  IconoOdontograma,
  IconoPagos,
  IconoPlanes,
  IconoRecursos,
  IconoSaludBucal,
  IconoTratamiento,
} from "../components";
import {
  useConsultasStore,
  useDiagnosticosStore,
  useExamenesStore,
  useOdontogramaStore,
  usePacienteStore,
  usePagosStore,
  usePlanesStore,
  useRecursosFotosStore,
  useSaludBucalStore,
  useTratamientosStore,
  useUiStore,
} from "../../hooks";
import { invertDateFormat } from "../../agenda/helpers";

//
//
//
//

export const ConsultaPage = () => {
  //
  const navigate = useNavigate();

  const { hookTabsCons, handleChangeTabsCons, changePage } = useUiStore();
  const { pacienteActivo } = usePacienteStore();
  const {
    stateOpenDelCons,
    startLoadConsulta,
    consultaActiva,
    changeStateDelCons,
    startDeletingConsulta,
    startLoadSignVit,
  } = useConsultasStore();

  const { startLoadExamenes } = useExamenesStore();

  const { startLoadPlanes } = usePlanesStore();

  const { startLoadDiagnosticos } = useDiagnosticosStore();

  const { startLoadTratamientos } = useTratamientosStore();

  const { startLoadPagos } = usePagosStore();

  const { startLoadOdontogramas } = useOdontogramaStore();

  const { startLoadSaludBucalArr, startLoadingSBBox2 } = useSaludBucalStore();

  const { startLoadRecursosFoto } = useRecursosFotosStore();

  const { id_pac, id_cons } = useParams();

  //
  useEffect(() => {
    changePage();
    startLoadConsulta(id_pac, id_cons);
    handleChangeTabsCons(
      parseInt(localStorage.getItem("lastTabPacienteCons")) || 0
    );
  }, []);

  //
  useEffect(() => {
    if (consultaActiva) {
      startLoadSignVit();
      startLoadDiagnosticos();
      startLoadExamenes();
      startLoadPlanes();
      startLoadTratamientos();
      startLoadPagos();
      startLoadOdontogramas();
      startLoadSaludBucalArr();
      startLoadingSBBox2();
      startLoadRecursosFoto();
    }
  }, [consultaActiva]);

  const handleOpenFormDeleteCons = () => {
    changeStateDelCons(true);
  };

  const deleteRegisterConsulta = async () => {
    await startDeletingConsulta();
    navigate(`/pacientes/${pacienteActivo.id}/historial`);
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",

        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.3),rgba(250,250,250, 0.3)) , url(/assets/img/fondos/fondoConsulta2.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div
        className="animate__animated animate__fadeInDown animate__faster"
        style={{
          position: "sticky",
          width: "90%",
          margin: "0px auto",
          top: "0px",
          zIndex: "10000",
        }}
      >
        <Box
          display="flex"
          // justifyContent="space-between"

          flexDirection="column"
          // alignItems="center"

          boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
          sx={{
            // backgroundColor: "rgba(245, 247, 250, 0.9)",
            backgroundColor: "primary.main",
          }}
        >
          {/* tipo de consulta y btn elimar */}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="end"
            padding="15px"
            sx={{
              borderBottom: "2px solid white",
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="end">
              <img
                type="img/svg"
                width="55px"
                height="55px"
                src={`/assets/icons/consultaItem/icon_consulta_white.svg`}
                alt="dentist_date.svg"
              />
              <Typography
                color="white"
                fontWeight="bold"
                fontSize="22px"
                sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.20)  !important" }}
                justifyContent="space-between"
              >
                {consultaActiva && consultaActiva.tipo_tipoConsul}
              </Typography>
            </Box>
            <ButtonCustom
              txt_b_size="14px"
              altura="35px"
              colorf="transparent"
              colorh="transparent"
              colort="white"
              colorth="celesteNeon.main"
              flexDir="column-reverse"
              txt_b="Eliminar"
              fontW="bold"
              onClick={handleOpenFormDeleteCons}
              iconB={<DeleteOutlined />}
              propsXS={{ boxShadow: "none !important" }}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            padding="15px"
          >
            <ConsInfoItem
              icon_name="paciente"
              lblItem="Paciente"
              dataCons={pacienteActivo && pacienteActivo.nombre}
            />
            <ConsInfoItem
              icon_name="dias"
              lblItem="Tiempo transcurrido"
              dataCons={consultaActiva && consultaActiva.dias}
            />
            <ConsInfoItem
              icon_name="fecha"
              lblItem="Fecha de atención"
              dataCons={
                consultaActiva &&
                invertDateFormat(consultaActiva.fecha_consulta)
              }
            />
            <ConsInfoItem
              icon_name="hora"
              lblItem="Hora de atención"
              dataCons={consultaActiva && consultaActiva.hora_consulta}
            />
          </Box>

          <Tabs
            centered
            value={hookTabsCons}
            onChange={(event, newValue) => {
              handleChangeTabsCons(newValue);
            }}
            sx={{
              width: "100%",

              display: "flex",
              padding: "10px",
              backgroundColor: "myBgColor.main",

              "& .MuiTabs-fixed > .MuiTabs-indicator": {
                display: "none",
              },

              "& .MuiTabs-fixed > .MuiTabs-flexContainer": {
                columnGap: "15px",
              },
            }}
          >
            <CustomTab label="Detalles" icon={<IconoDetalle />} />
            <CustomTab label="Exámenes" icon={<IconoExamenes />} />
            <CustomTab label="Odontograma" icon={<IconoOdontograma />} />
            <CustomTab label="Salud Bucal" icon={<IconoSaludBucal />} />
            <CustomTab label="Planes" icon={<IconoPlanes />} />
            <CustomTab label="Diagnóstico" icon={<IconoDiagnostico />} />
            <CustomTab label="Tratamiento" icon={<IconoTratamiento />} />
            <CustomTab label="Imágenes" icon={<IconoRecursos />} />
            <CustomTab label="Pagos" icon={<IconoPagos />} />
          </Tabs>
        </Box>
      </div>
      <div style={{ width: "90%", margin: "30px auto 0px auto" }}>
        {hookTabsCons === 0 && <DetalleConsultaPage />}
        {hookTabsCons === 1 && <ExamenesConsultaPage />}
        {hookTabsCons === 2 && <OdontogramaPage />}
        {hookTabsCons === 3 && <SaludBucalPage />}
        {hookTabsCons === 4 && <PlanesConsultaPage />}
        {hookTabsCons === 5 && <DiagnosticoConsultaPage />}
        {hookTabsCons === 6 && <TratamientoConsultaPage />}
        {hookTabsCons === 7 && <RecursosFotograficosPage />}
        {hookTabsCons === 8 && <PagosConsultaPage />}
      </div>

      <DeleteConfirm
        stateOpen={stateOpenDelCons}
        setStateOpen={changeStateDelCons}
        message={
          <>
            ¿Está segura que desea eliminar la consulta de
            <span style={{ color: "#9c27b0" }}>
              {pacienteActivo !== null && ` ${pacienteActivo.nombre}`}
            </span>
            ?
          </>
        }
        funcionDelete={deleteRegisterConsulta}
      />
    </div>
  );
};
