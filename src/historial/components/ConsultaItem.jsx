import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardMedia, Grid, Typography } from "@mui/material";
import { DeleteOutlined, EditNoteOutlined } from "@mui/icons-material";
import { FaRegFolderOpen } from "react-icons/fa";
import { ButtonCustom, CustomStandardTF } from "../../ui";
import { ViewRecursoFoto } from "../../consulta/components";
import { useConsultasStore, usePacienteStore, useUiStore } from "../../hooks";
import { invertDateFormat } from "../../agenda/helpers";

//
//
//
//

export const ConsultaItem = ({ consultaItem, iteratorColor }) => {
  const navigate = useNavigate();

  //store
  const {
    changeDataConsulta,
    changeStateFormCons,
    changeTitleFormCons,
    changeStateDelCons,
  } = useConsultasStore();

  const { handleChangeTabsCons, saveConsultaSidebar } = useUiStore();

  const { pacienteActivo } = usePacienteStore();

  //hook
  const [opeViewFoto, setOpeViewFoto] = useState(false);
  const [stateDataFoto, setStateDataFoto] = useState({});

  const colorChoose = iteratorColor % 2 > 0 ? true : false;

  const handleOpenFormEditCons = () => {
    changeDataConsulta(consultaItem);
    changeTitleFormCons("Editar consulta odontológica");
    changeStateFormCons(true);
  };

  const handleOpenFormDeleteCons = () => {
    changeDataConsulta(consultaItem);
    changeStateDelCons(true);
  };

  const handleOpenCons = () => {
    changeDataConsulta(consultaItem);
    handleChangeTabsCons(0);
    navigate(`${consultaItem.id_consulta}`);
    saveConsultaSidebar({
      id_pac: pacienteActivo.id,
      id_con: consultaItem.id_consulta,
      fecha: consultaItem.fecha_consulta,
      tipoCons: consultaItem.tipo_tipoConsul,
    });
  };

  const handleOpenFotoView = (dataFoto) => {
    setStateDataFoto(dataFoto);
    setOpeViewFoto(true);
  };

  const diagnosticosStr = consultaItem.diagnosticos.reduce((acc, diag) => {
    const diagnostico = diag.Diagnosticos.split("-");

    acc = `${acc}\n${
      diagnostico[0] +
      " - " +
      diagnostico[1].slice(0, 2) +
      diagnostico[1].slice(2).toLowerCase() +
      `${diagnostico[2] === undefined ? "" : " - " + diagnostico[2]}`
    }`;

    return acc;
  }, "");

  const planesDiag = consultaItem.planesD.reduce((acc, planAct) => {
    acc = `${acc}\n${planAct.PlanesDiag}`;
    return acc;
  }, "");

  const planesTera = consultaItem.planesT.reduce((acc, planAct) => {
    acc = `${acc}\n Tratamiento ${planAct.tipo_tipoTratam} - ${
      planAct.tratam_tipoTratam
    } ${planAct.desc_planDiag === null ? "" : " - " + planAct.desc_planDiag}`;
    return acc;
  }, "");

  const planesEdu = consultaItem.planesE.reduce((acc, planAct) => {
    acc = `${acc}\n${planAct.desc_planDiag}`;
    return acc;
  }, "");

  //
  return (
    <>
      <Grid
        container
        display="grid"
        boxShadow="3px 5px 5px rgba(0, 0, 0, 0.5)"
        sx={{
          //

          padding: "20px 0px",
          marginTop: "5px",
          borderRadius: "10px",
          transitionProperty: "transform",

          transition: "all 0.1s ease-in-out",

          ":hover": {
            transform: "scale(1.04)",
          },

          backgroundColor: colorChoose ? "primary.main" : "white",

          gridTemplateColumns: "8% 62% 20% 10%",
          gridTemplateRows: "repeat(2, max-content)",
          gridTemplateAreas: `". . infoCons infoCons" 
              "icono info info botones"`,

          rowGap: "15px",
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
            width="65px"
            height="65px"
            src={`/assets/icons/consultaItem/icon_consulta_${
              colorChoose ? "white" : "primary"
            }.svg`}
            alt="dentist_date.svg"
          />
        </Grid>

        <Grid
          item
          gridArea="infoCons"
          display="flex"
          flexDirection="row"
          alignItems="start"
          justifyContent="end"
          paddingRight="15px"
          columnGap="15px"
        >
          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: colorChoose ? "white" : "primary.main",
              color: colorChoose ? "black" : "white",
              fontWeight: colorChoose && "bold",
              padding: "0.5px 4px",
            }}
          >
            {consultaItem.hora_consulta}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: colorChoose ? "white" : "primary.main",
              color: colorChoose ? "black" : "white",
              fontWeight: colorChoose && "bold",
              padding: "0.5px 4px",
            }}
          >
            {invertDateFormat(consultaItem.fecha_consulta)}
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: colorChoose ? "white" : "primary.main",
              color: colorChoose ? "black" : "white",
              fontWeight: colorChoose && "bold",
              padding: "0.5px 4px",
            }}
          >
            {consultaItem.dias}
          </Typography>
        </Grid>

        <Grid
          item
          gridArea="info"
          display="flex"
          rowGap="15px"
          flexDirection="column"
        >
          <CustomStandardTF
            value={consultaItem.tipo_tipoConsul}
            helperText="Tipo de consulta"
            colorTxt={colorChoose ? "white" : "black"}
            colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
            colorBrd={colorChoose ? "white" : "#602A90"}
          />
          <CustomStandardTF
            multiline
            value={consultaItem.mot_consulta}
            helperText="Motivo"
            colorTxt={colorChoose ? "white" : "black"}
            colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
            colorBrd={colorChoose ? "white" : "#602A90"}
          />

          {consultaItem.probleAct_consulta.length > 0 && (
            <CustomStandardTF
              multiline
              value={consultaItem.probleAct_consulta}
              helperText="Problema"
              colorTxt={colorChoose ? "white" : "black"}
              colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
              colorBrd={colorChoose ? "white" : "#602A90"}
            />
          )}

          {consultaItem.planesD.length > 0 && (
            <CustomStandardTF
              multiline
              value={planesDiag}
              helperText="Planes de Diagnóstico"
              colorTxt={colorChoose ? "white" : "black"}
              colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
              colorBrd={colorChoose ? "white" : "#602A90"}
            />
          )}

          {consultaItem.planesT.length > 0 && (
            <CustomStandardTF
              multiline
              value={planesTera}
              helperText="Planes Terapéuticos"
              colorTxt={colorChoose ? "white" : "black"}
              colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
              colorBrd={colorChoose ? "white" : "#602A90"}
            />
          )}

          {consultaItem.planesE.length > 0 && (
            <CustomStandardTF
              multiline
              value={planesEdu}
              helperText="Planes Educacionales"
              colorTxt={colorChoose ? "white" : "black"}
              colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
              colorBrd={colorChoose ? "white" : "#602A90"}
            />
          )}

          {diagnosticosStr.length > 0 && (
            <CustomStandardTF
              multiline
              value={diagnosticosStr}
              helperText="Diagnóstico"
              colorTxt={colorChoose ? "white" : "black"}
              colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
              colorBrd={colorChoose ? "white" : "#602A90"}
            />
          )}

          {consultaItem.tratamientos.length > 0 &&
            consultaItem.tratamientos.map((tratam) => {
              const tratamientoLine =
                `${
                  tratam.tratamiento === null ? "" : tratam.tratamiento + " - "
                }` +
                `${tratam.codigoCIE === null ? "" : tratam.codigoCIE + " - "}` +
                invertDateFormat(tratam.fecha_tratamiento);

              return (
                <>
                  <CustomStandardTF
                    key={tratam.id_tratam}
                    multiline
                    value={"\n" + tratamientoLine}
                    helperText="Tratamiento"
                    colorTxt={colorChoose ? "white" : "black"}
                    colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
                    colorBrd={colorChoose ? "white" : "#602A90"}
                  />

                  {tratam.procedimientos.length > 0 && (
                    <CustomStandardTF
                      multiline
                      line_he="30px"
                      propsSX={{ paddingLeft: "40px" }}
                      value={tratam.procedimientos.reduce(
                        (acc, procAct, index) => {
                          if (index === 0) {
                            acc =
                              `${
                                procAct.codigo ? procAct.codigo + " - " : ""
                              }` + `${procAct.procedimiento}`;
                          } else {
                            acc = `${acc}\n ${
                              procAct.codigo ? procAct.codigo + " - " : ""
                            } ${procAct.procedimiento}`;
                          }
                          return acc;
                        },
                        ""
                      )}
                      helperText="Procedimientos"
                      colorTxt={colorChoose ? "white" : "black"}
                      colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
                      colorBrd={colorChoose ? "white" : "#602A90"}
                    />
                  )}
                </>
              );
            })}
          <Grid container spacing={2} paddingTop="10px">
            {consultaItem.fotos.length > 0 &&
              consultaItem.fotos.map((foto, index) => {
                return (
                  <Grid
                    item
                    xs={3}
                    key={index}
                    display="flex"
                    flexDirection="row"
                  >
                    <CardMedia
                      component="img"
                      image={foto.url}
                      alt={foto.url}
                      sx={{
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleOpenFotoView({
                          ...foto,
                        });
                      }}
                    />
                  </Grid>
                );
              })}
          </Grid>
          {consultaItem.fotos.length > 0 && (
            <CustomStandardTF
              value={""}
              helperText="Recursos Fotograficos"
              colorTxt={colorChoose ? "white" : "black"}
              colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
              colorBrd={colorChoose ? "white" : "#602A90"}
            />
          )}
        </Grid>

        <Grid
          item
          gridArea="botones"
          display="flex"
          flexDirection="column"
          rowGap="20px"
          alignItems="center"
          justifyContent="start"
        >
          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort={colorChoose ? "white" : "blueSecondary.main"}
            colorth={colorChoose ? "celesteNeon.main" : "primary.main"}
            flexDir="column-reverse"
            txt_b="Editar"
            fontW="bold"
            onClick={handleOpenFormEditCons}
            iconB={<EditNoteOutlined />}
            propsXS={{ boxShadow: "none !important" }}
          />

          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort={colorChoose ? "white" : "error.main"}
            colorth={colorChoose ? "celesteNeon.main" : "primary.main"}
            flexDir="column-reverse"
            txt_b="Eliminar"
            fontW="bold"
            onClick={handleOpenFormDeleteCons}
            iconB={<DeleteOutlined />}
            propsXS={{ boxShadow: "none !important" }}
          />

          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort={colorChoose ? "white" : "blueSecondary.main"}
            colorth={colorChoose ? "celesteNeon.main" : "primary.main"}
            flexDir="column-reverse"
            txt_b="Abrir"
            fontW="bold"
            onClick={handleOpenCons}
            iconB={<FaRegFolderOpen />}
            propsXS={{ boxShadow: "none !important" }}
          />
        </Grid>
      </Grid>

      <ViewRecursoFoto
        stateDialog={opeViewFoto}
        setStateDialog={setOpeViewFoto}
        dataFoto={stateDataFoto}
      />
    </>
  );
};
