import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { EditNoteOutlined } from "@mui/icons-material";
import { ButtonCustom } from "../../ui";
import { FormModalCons } from "../../historial/components";
import { ConsDetalleItem, FormModalSignVit } from "../components";
import { useConsultasStore } from "../../hooks";

//
//
//

export const DetalleConsultaPage = () => {
  //

  const [openModalSignVit, setOpenModalSignVit] = useState(false);

  const handleOpenFormSingVit = () => {
    setOpenModalSignVit(true);
  };
  const {
    consultaActiva,
    signosVitales,
    changeTitleFormCons,
    changeStateFormCons,
  } = useConsultasStore();

  const handleOpenFormEditCons = () => {
    changeTitleFormCons("Editar consulta odontológica");
    changeStateFormCons(true);
  };

  return (
    <>
      <Box
        component="div"
        className="animate__animated animate__fadeInUp animate__faster"
        display="flex"
        flexDirection="row"
        columnGap="30px"
      >
        {/* detalle consulta */}
        <Box
          flexBasis="73%"
          sx={{
            display: "grid",
            padding: "10px 20px 20px 20px",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, max-content)",
            gridTemplateAreas: `"detalle btnEdit"
              "motivo problema"`,
            rowGap: "20px",
            columnGap: "15px",
            backgroundColor: "myBgColor.main",
            boxShadow: "5px 7px 7px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Grid
            item
            gridArea="detalle"
            display="flex"
            flexDirection="column"
            rowGap="10px"
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",

                color: "primary.main",
              }}
            >
              Detalles
            </Typography>
            <ConsDetalleItem
              icon_name="icon_consulta_primary"
              lblItem="Tipo de consulta"
              dataCons={consultaActiva && consultaActiva.tipo_tipoConsul}
            />
          </Grid>
          <Grid
            item
            gridArea="btnEdit"
            display="flex"
            justifyContent="end"
            paddingTop="15px"
          >
            <ButtonCustom
              txt_b_size="14px"
              altura="35px"
              colorf="transparent"
              colorh="transparent"
              colort="blueSecondary.main"
              colorth="primary.main"
              flexDir="column-reverse"
              txt_b="Editar"
              fontW="bold"
              onClick={handleOpenFormEditCons}
              iconB={<EditNoteOutlined />}
              propsXS={{ boxShadow: "none !important" }}
            />
          </Grid>
          <Grid item gridArea="motivo">
            <ConsDetalleItem
              icon_name="motivo"
              lblItem="Motivo de consulta"
              dataCons={consultaActiva && consultaActiva.mot_consulta}
            />
          </Grid>
          <Grid item gridArea="problema">
            <ConsDetalleItem
              icon_name="problema"
              lblItem="Problema actual"
              dataCons={consultaActiva && consultaActiva.probleAct_consulta}
            />
          </Grid>
        </Box>

        {/* signos Vitales */}
        <Box
          flexBasis="27%"
          sx={{
            display: "flex",
            padding: "10px 20px 20px 20px",
            flexDirection: "column",
            rowGap: "15px",
            backgroundColor: "myBgColor.main",
            boxShadow: "5px 7px 7px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",

                color: "primary.main",
              }}
            >
              Signos vitales
            </Typography>
            <ButtonCustom
              txt_b_size="14px"
              altura="35px"
              colorf="transparent"
              colorh="transparent"
              colort="blueSecondary.main"
              colorth="primary.main"
              flexDir="column-reverse"
              txt_b="Editar"
              fontW="bold"
              onClick={handleOpenFormSingVit}
              iconB={<EditNoteOutlined />}
              propsXS={{ boxShadow: "none !important" }}
            />
          </Box>

          <ConsDetalleItem
            icon_name="temperatura"
            lblItem="Temperatura"
            dataCons={signosVitales && `${signosVitales.temp_signoVital} °C`}
          />
          <ConsDetalleItem
            icon_name="presionArterial"
            lblItem="Presión arterial"
            dataCons={
              signosVitales && `${signosVitales.presArt_signoVital} mm Hg`
            }
          />
          <ConsDetalleItem
            icon_name="frecuenciaCard"
            lblItem="Frecuencia cardíaca"
            dataCons={signosVitales && `${signosVitales.freCar_signoVital} ppm`}
          />
          <ConsDetalleItem
            icon_name="frecuenciaResp"
            lblItem="Frecuencia respiratoria"
            dataCons={signosVitales && `${signosVitales.freRes_signoVital} rpm`}
          />
        </Box>
      </Box>
      <FormModalCons />
      <FormModalSignVit
        openModalForm={openModalSignVit}
        setOpenModalForm={setOpenModalSignVit}
      />
    </>
  );
};
/* Tres valores: flex-grow | flex-shrink | flex-basis */
