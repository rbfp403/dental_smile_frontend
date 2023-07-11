import { Grid, Icon } from "@mui/material";
import {
  AccessTime,
  DeleteOutlined,
  EditOutlined,
  Event,
  PostAddOutlined,
  SegmentOutlined,
} from "@mui/icons-material";
import { ButtonCustom, IconTextField } from "../../ui";
import {
  useAgendaStore,
  useConsultasStore,
  usePacienteStore,
  useUiStore,
} from "../../hooks";

export const ProxCiteItem = ({ cita }) => {
  //

  const { handleChangeTabs } = useUiStore();

  const { changeStateFormCons, changeTitleFormCons, changeDataConsulta } =
    useConsultasStore();

  const {
    changeStateFormAgenda,
    changeTitleFormAgenda,
    changeBlockPaciente,
    changeDataCite,
    changeStateDeleteCofirm,
  } = useAgendaStore();

  const { pacienteActivo } = usePacienteStore();

  const handleOpenFormEditCite = () => {
    changeDataCite(cita);
    changeTitleFormAgenda(
      "Editar cita odontológica de " + pacienteActivo.nombre
    );
    changeStateFormAgenda(true);
    changeBlockPaciente(true);
  };

  const handleOpenFormDeleteCite = () => {
    changeDataCite(cita);
    changeStateDeleteCofirm(true);
  };

  const handleOpenFormCons = () => {
    handleChangeTabs(2);
    changeTitleFormCons("Registrar consulta odontológica");
    changeStateFormCons(true);

    changeDataConsulta({
      updateCita: true,
      fecha_cita: cita.fecha,
      hora_inicio_cite: cita.hora,

      //
      id_tipoConsul: null,
      fecha_consulta_date: cita.start,
      hora_consulta_date: cita.start,
      mot_consulta: cita.motivo,
      probleAct_consulta: "",
    });
  };

  return (
    <>
      <Grid
        container
        display="grid"
        borderColor="primary.main"
        boxShadow="3px 5px 5px rgba(0, 0, 0, 0.5)"
        sx={{
          //
          padding: "20px 0px",
          marginTop: "5px",
          borderRadius: "10px",
          backgroundColor: `${
            cita.estado === "Pendiente"
              ? "rgba(17, 100, 130, 0.1)"
              : "rgba(211, 47, 47, 0.1)"
          }`,
          gridTemplateColumns: "10% 75% 15%",
          gridTemplateRows: "repeat(3, max-content)",
          gridTemplateAreas: `"icono dates botones" 
              "icono motivo botones" 
              "icono motivo botones"`,
        }}
      >
        <Grid
          item
          gridArea="icono"
          display="flex"
          alignItems="start"
          justifyContent="center"
        >
          <img
            type="img/svg"
            width="60px"
            height="60px"
            src={`/assets/icons/proxCiteItem/dentist_date.svg`}
            alt="dentist_date.svg"
          />
        </Grid>

        <Grid
          item
          gridArea="dates"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          columnGap="20px"
        >
          <div>
            <IconTextField
              label="Fecha:"
              type="text"
              value={cita.fecha}
              colorIcon="primary.main"
              colorHover="primary.main"
              colorTxt="black"
              colorLabel="primary.main"
              font_we="bold"
              font_sty="italic"
              fontWlbl="bold"
              InputProps={{ readOnly: true }}
              propsXS={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "2px solid",
                    borderColor: "primary.main",
                  },
                },
                "&:hover fieldset": {
                  borderColor: "#602A90 !important ",
                },
                boxShadow: "none !important",
              }}
              iconEnd={
                <Icon>
                  <Event />
                </Icon>
              }
            />
          </div>
          <div>
            <IconTextField
              label="Hora Inicio:"
              type="text"
              value={cita.hora}
              colorIcon="primary.main"
              colorHover="primary.main"
              colorTxt="black"
              colorLabel="primary.main"
              font_we="bold"
              fontWlbl="bold"
              font_sty="italic"
              InputProps={{ readOnly: true }}
              propsXS={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "2px solid",
                    borderColor: "primary.main",
                  },
                },
                "&:hover fieldset": {
                  borderColor: "#602A90 !important ",
                },
                boxShadow: "none  !important",
              }}
              iconEnd={
                <Icon>
                  <AccessTime />
                </Icon>
              }
            />{" "}
          </div>
          <div>
            <IconTextField
              label="Hora Fin:"
              type="text"
              value={cita.hora_fin}
              colorIcon="primary.main"
              colorHover="primary.main"
              colorTxt="black"
              colorLabel="primary.main"
              font_we="bold"
              fontWlbl="bold"
              font_sty="italic"
              InputProps={{ readOnly: true }}
              propsXS={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "2px solid",
                    borderColor: "primary.main",
                  },
                },
                "&:hover fieldset": {
                  borderColor: "#602A90 !important ",
                },
                boxShadow: "none  !important",
              }}
              iconEnd={
                <Icon>
                  <AccessTime />
                </Icon>
              }
            />{" "}
          </div>
        </Grid>

        <Grid item gridArea="motivo">
          <div style={{ marginTop: "20px" }}>
            <IconTextField
              fullWidth
              label="Motivo de consulta:"
              multiline
              type="text"
              value={cita.motivo}
              colorIcon="primary.main"
              colorHover="primary.main"
              colorTxt="black"
              colorLabel="primary.main"
              font_we="bold"
              font_sty="italic"
              fontWlbl="bold"
              propsXS={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "2px solid",
                    borderColor: "primary.main",
                  },
                },
                "&:hover fieldset": {
                  borderColor: "#602A90 !important ",
                },
                boxShadow: "none  !important",
              }}
              InputProps={{ readOnly: true }}
              iconEnd={
                <Icon>
                  <SegmentOutlined />
                </Icon>
              }
            />
          </div>
        </Grid>

        <Grid
          item
          gridArea="botones"
          display="flex"
          flexDirection="column"
          rowGap="10px"
          alignItems="center"
          justifyContent="center"
        >
          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="primary.main"
            colorh="error.main"
            colorth="white"
            colort="white"
            txt_b="Eliminar"
            onClick={handleOpenFormDeleteCite}
            iconB={<DeleteOutlined />}
          />

          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="primary.main"
            colorh="blueSecondary.main"
            colorth="white"
            colort="white"
            txt_b="Editar"
            onClick={handleOpenFormEditCite}
            iconB={<EditOutlined />}
          />

          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="primary.main"
            colorh="black"
            colort="white"
            colorth="celesteNeon.main"
            txt_b="Atender"
            onClick={handleOpenFormCons}
            iconB={<PostAddOutlined />}
          />
        </Grid>
      </Grid>
    </>
  );
};
