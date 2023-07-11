import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  DeleteOutline,
  EditCalendarOutlined,
  Event,
} from "@mui/icons-material";
import { MdPostAdd } from "react-icons/md";
import { ButtonCustom, CustomTable } from "../../ui";
import {
  useAgendaStore,
  useConsultasStore,
  useDataStore,
  useUiStore,
} from "../../hooks";

const TABLE_HEAD = [
  { id: "cuando", label: "¿Cuándo?", alignLeft: true },
  { id: "hora", label: "Hora", alignLeft: true },
  { id: "fecha", label: "Fecha", alignLeft: true },
  { id: "paciente", label: "Paciente", alignLeft: true },
  { id: "telefono", label: "Teléfono", alignLeft: true },
  { id: "edad", label: "Edad", alignLeft: true },
  { id: "motivo", label: "Motivo", alignLeft: true },
  { id: "estado", label: "Estado", alignLeft: true },
];

//
//
//

export const ViewAgendaTable = () => {
  //

  const navigate = useNavigate();

  const { dataActiva } = useDataStore();

  const { handleChangeTabs } = useUiStore();

  const { changeDataConsulta, changeStateFormCons, changeTitleFormCons } =
    useConsultasStore();

  const {
    citasListAgenda,

    changeStateFormAgenda,
    changeTitleFormAgenda,
    changeBlockPaciente,
    changeDataCite,
    changeStateDeleteCofirm,
    startDeletingCite,
  } = useAgendaStore();

  const handleOpenModalAgenda = () => {
    changeDataCite({
      start: new Date(),
      end: new Date(0, 0, 0, new Date().getHours() + 2),
    });
    changeTitleFormAgenda("Agendar cita odontológica");
    changeStateFormAgenda(true);
    changeBlockPaciente(false);
  };

  const openFormEditCite = () => {
    changeTitleFormAgenda("Editar cita odontológica");
    changeStateFormAgenda(true);
    changeBlockPaciente(false);
  };
  const openFormDeleteCite = () => {
    changeStateDeleteCofirm(true);
  };

  const deleteRegisterCites = async (selected = []) => {
    await startDeletingCite(selected);
  };

  const [citaCargada, setCitaCargada] = useState(false);

  const handleOpenFormCons = () => {
    setCitaCargada(false);
    changeDataConsulta({
      updateCita: true,
      fecha_cita: dataActiva[1].fecha,
      hora_inicio_cite: dataActiva[1].hora,
      //
      id_tipoConsul: null,
      fecha_consulta_date: dataActiva[1].start,
      hora_consulta_date: dataActiva[1].start,
      mot_consulta: dataActiva[1].motivo,
      probleAct_consulta: "",
    });
    navigate(`/pacientes/${dataActiva[1].id_paciente}/historial`);
    handleChangeTabs(2);
    changeTitleFormCons("Registrar consulta odontológica");
    changeStateFormCons(true);
  };

  useEffect(() => {
    if (dataActiva[0] === "Lista de citas agendadas") {
      changeDataCite(dataActiva[1]);
      if (citaCargada) {
        handleOpenFormCons();
      }
    }
  }, [dataActiva]);

  //
  const BtnToolbarTable = () => {
    return (
      <ButtonCustom
        altura={"40px"}
        colorf="white"
        colorh="black"
        colort="black"
        colorth="celesteNeon.main"
        txt_b={"Registrar cita"}
        fontW="bold"
        iconB={<MdPostAdd />}
        onClick={handleOpenModalAgenda}
      />
    );
  };
  const BtnInFila = ({ infoRow }) => {
    return (
      <>
        <Tooltip title="Editar">
          <IconButton
            sx={{ color: "black", ":hover": { color: "blueSecondary.main" } }}
            onClick={openFormEditCite}
          >
            <EditCalendarOutlined />
          </IconButton>
        </Tooltip>

        <Tooltip title="Eliminar">
          <IconButton
            sx={{ color: "black", ":hover": { color: "error.main" } }}
            onClick={openFormDeleteCite}
          >
            <DeleteOutline />
          </IconButton>
        </Tooltip>

        <Tooltip title="Atender">
          <IconButton
            sx={{ color: "black", ":hover": { color: "primary.main" } }}
            onClick={() => {
              setCitaCargada(true);
            }}
          >
            <Event />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  return (
    <Box display="flex" flexDirection="column" rowGap="20px" marginTop="20px">
      <CustomTable
        TABLE_HEAD={TABLE_HEAD}
        DATALIST={citasListAgenda}
        withToolbar
        withBoxSearch
        withButton
        iconosEnFila={true}
        btnToolbarTable={BtnToolbarTable}
        columnaABuscarPri="cuando"
        firstOrden="asc"
        searchWhat={"Buscar cita ..."}
        txt_header={"Lista de citas agendadas"}
        bgColorTable="rgba(255,255,255,0.9)"
        dataOmitida={6}
        funcionDeleteVarious={deleteRegisterCites}
        routePaciente={(row) => `/pacientes/${row.id_paciente}/historial`}
        BtnInFila={BtnInFila}
      />
    </Box>
  );
};
