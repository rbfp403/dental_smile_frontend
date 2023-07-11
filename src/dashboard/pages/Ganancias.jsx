import { useEffect } from "react";
import { Box, Link, Typography } from "@mui/material";
import { FaRegFolderOpen } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { ButtonCustom, CustomTable } from "../../ui";
import { useDashboardStore, useUiStore } from "../../hooks";

const TABLE_HEAD_COLLAPSED = [
  { id: "ingreso_por", label: "Ingreso por" },
  { id: "monto", label: "Monto" },
  { id: "nota", label: "Nota" },
  { id: "fecha", label: "Fecha" },
  { id: "fecha_upd", label: "Fecha Act." },
];
const TABLE_HEAD_GASTOS = [
  { id: "desc", label: "Gasto por" },
  { id: "monto", label: "Monto" },
  { id: "fecha", label: "Fecha" },
  { id: "fecha_upd", label: "Fecha de actualización" },
];

//
//
//
//
//
//

export const Ganancias = () => {
  const { changePage } = useUiStore();

  const {
    messagePanelGananc,
    startLoadGanancias,
    parametrosBusqueda,
    listIngresoPanel,
    listGastosPanel,
    totallistGastos,
    totallistIngreso,
  } = useDashboardStore();

  const { handleChangeTabsCons } = useUiStore();

  const actualizarListaGan = () => {
    if (JSON.stringify(parametrosBusqueda) === "{}") {
      const filtrosGan = JSON.parse(localStorage.getItem("filtrosGanancias"));
      startLoadGanancias(
        filtrosGan.tipo,
        filtrosGan.param_fechaIni,
        filtrosGan.fechaFin
      );
    } else {
      startLoadGanancias(
        parametrosBusqueda.tipo,
        parametrosBusqueda.param_fechaIni,
        parametrosBusqueda.fechaFin
      );
    }
  };

  useEffect(() => {
    changePage();
    actualizarListaGan();
  }, []);

  const arrGanancias = [
    { title: "Ingresos", data: "$ " + totallistIngreso },
    { title: "", data: "-" },
    { title: "Gastos", data: "$ " + totallistGastos },
    { title: "", data: "=" },
    {
      title: "Ganancias",
      data: `$ ${parseFloat(totallistIngreso - totallistGastos).toFixed(2)}`,
    },
  ];

  const BtnToolbarTable = () => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        columnGap="15px"
      >
        <Typography color="white" fontWeight="bold" textAlign="center">
          Total <p>${totallistIngreso.toFixed(2)}</p>
        </Typography>
      </Box>
    );
  };

  const BtnInFila = ({ infoRow }) => {
    return infoRow.id_paciente ? (
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
          onClick={() => {
            handleChangeTabsCons(8);
          }}
          iconB={<FaRegFolderOpen />}
          propsXS={{ boxShadow: "none !important" }}
        />
      </Link>
    ) : (
      <></>
    );
  };

  const BtnToolbarTableGasto = () => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        columnGap="15px"
      >
        <Typography color="white" fontWeight="bold" textAlign="center">
          Total <p>${totallistGastos.toFixed(2)}</p>
        </Typography>
      </Box>
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
          {messagePanelGananc}
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
        <Box
          className="box-shadow"
          sx={{
            backgroundColor: "white",
            width: "40%",
            height: "100px",
            display: "flex",
            flexDirection: "row",
            columnGap: "15px",
            padding: "20px",
            justifyContent: "space-between",
            alignContent: "space-between",
            borderRadius: "5px",
          }}
        >
          {arrGanancias.map((arrGan, index) => (
            <BoxGanacias key={index} title={arrGan.title} data={arrGan.data} />
          ))}
        </Box>
        <Box
          width="100%"
          className="box-shadow"
          sx={{
            backgroundColor: "rgba(255,255,255,0.9)",
            // padding: "10px",
            borderRadius: "5px",
          }}
        >
          <CustomTable
            TABLE_HEAD={TABLE_HEAD_COLLAPSED}
            DATALIST={listIngresoPanel}
            withToolbar
            withBoxSearch
            withCheckbox={false}
            withButton
            iconosEnFila
            columnaABuscarPri="fecha"
            searchWhat="Buscar..."
            txt_header="Lista de ingresos $"
            btnToolbarTable={BtnToolbarTable}
            dataOmitida={3}
            BtnInFila={BtnInFila}
          />
        </Box>
        <Box
          width="100%"
          className="box-shadow"
          sx={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: "5px",
          }}
        >
          <CustomTable
            TABLE_HEAD={TABLE_HEAD_GASTOS}
            DATALIST={listGastosPanel}
            withToolbar
            withBoxSearch
            withCheckbox={false}
            withButton
            iconosEnFila
            columnaABuscarPri="fecha"
            searchWhat="Buscar..."
            txt_header="Lista de gastos $"
            btnToolbarTable={BtnToolbarTableGasto}
            BtnInFila={BtnInFila}
          />
        </Box>
      </Box>
    </div>
  );
};

const BoxGanacias = ({ title, data }) => {
  return (
    <Box display="flex" flexDirection="column" rowGap="10px">
      <Typography
        color="white"
        fontWeight="bold"
        fontStyle="italic"
        padding="0px 5px"
        sx={{ backgroundColor: "primary.main" }}
      >
        {title}
      </Typography>

      <Typography color="primary.main" fontSize="17px" fontWeight="bold">
        {data}
      </Typography>
    </Box>
  );
};
