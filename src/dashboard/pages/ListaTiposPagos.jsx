import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { MdPostAdd } from "react-icons/md";
import {
  ButtonCustom,
  CustomAlert,
  CustomSelect,
  CustomTable,
  DeleteConfirm,
} from "../../ui";
import { FormTipPago } from "../components";
import { useDataStore, useTipPagoStore, useUiStore } from "../../hooks";

const TABLE_HEAD = [
  { id: "tipo_de_pago", label: "Tipo de pago", alignLeft: true },
  { id: "precio", label: "Precio", alignLeft: true },
];

/*******************************ListaTiposPagos*************************************** */

export const ListaTiposPagos = () => {
  //customs hooks store

  const { changePage } = useUiStore();
  const {
    tipoPagoActivo,
    tipoPagosList,
    errorMsgRegTipoPago,
    startLoadTipPagoList,
    changeDataTipPago,
    startDeletingTipPago,
  } = useTipPagoStore();

  const { dataActiva } = useDataStore();

  useEffect(() => {
    changePage();
  }, []);

  //hooks
  const [stateTipo, setStateTipo] = useState("Todos");
  const [stateModalTipPago, setStateModalTipPago] = useState(false);
  const [titleFormTiPago, setTitleFormTiPago] = useState("");
  const [msgAlertDel, setMsgAlertDel] = useState("");

  //control de modal registrar y editar
  const openModalTipPagoReg = () => {
    setTitleFormTiPago("Registro de tipo de pago");
    setStateModalTipPago(true);
  };

  const openModalTipPagoEdit = () => {
    setTitleFormTiPago("Editar tipo de pago");
    setStateModalTipPago(true);
  };

  //controlDialog Confirm Delete
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

  //control alert de eliminacion
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //funcion eliminar uno o varias tipos de pagos
  const deleteRegisterTipPago = (selected = []) => {
    startDeletingTipPago(selected);

    if (selected.length <= 1) {
      setMsgAlertDel("Tipo de pago fue eliminado.");
    } else {
      setMsgAlertDel("Los tipos de pago fueron eliminados exitosamente.");
    }
    handleOpenSnackbar();
  };

  //efectos secundarios
  useEffect(() => {
    let tipoConsulta = "";
    switch (stateTipo) {
      case "Todos":
        tipoConsulta = "todos";
        break;
      case "Tipos de pago por procedimientos":
        tipoConsulta = "procedimiento";
        break;
      case "Tipos de pago por tipos de consulta":
        tipoConsulta = "consulta";
        break;
      case "Tipos de pago creado por el usuario":
        tipoConsulta = "usuario";
        break;

      default:
        break;
    }
    startLoadTipPagoList(tipoConsulta);
  }, [stateTipo]);

  //efecto secundario pasar la info del registro de la tabla
  //al tipo de pago activo

  useEffect(() => {
    if (dataActiva[0] === "Tipos de pagos") {
      changeDataTipPago(dataActiva[1]);
    }
  }, [dataActiva]);

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",

        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.3),rgba(250,250,250, 0.3)) , url(/assets/img/fondos/listaTiposPagos.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        // margin="30px"
        padding="20px 20px 20px 60px "
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        <Typography
          variant="h5"
          fontStyle="italic"
          fontWeight="bold"
          color="primary.main"
        >
          Lista de tipos de pagos
        </Typography>

        <Box
          display="flex"
          columnGap="20px"
          flexDirection="row"
          alignItems="end"
        >
          <CustomSelect
            lblText="Filtrar registros:"
            altura="42px"
            ancho="330px"
            listOptions={[
              "Todos",
              "Tipos de pago por procedimientos",
              "Tipos de pago por tipos de consulta",
              "Tipos de pago creado por el usuario",
            ]}
            value={stateTipo}
            onChange={(event) => {
              setStateTipo(event.target.value);
            }}
          />
          <ButtonCustom
            altura={"42px"}
            colorf={"primary.main"}
            colorh={"black"}
            colort={"white"}
            colorth={"celesteNeon.main"}
            txt_b={"Agregar tipo de pago"}
            flexDir="row"
            txt_b_size="17px"
            propsXS={{ boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)" }}
            iconB={<MdPostAdd />}
            onClick={openModalTipPagoReg}
          />
        </Box>
      </Box>
      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        margin="30px 30px 0px 30px"
        padding="10px"
        borderRadius="5px"
        // width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.8)" }}
      >
        {errorMsgRegTipoPago.msg !== "No se encontraron tipos de pago" ? (
          <CustomTable
            TABLE_HEAD={TABLE_HEAD}
            DATALIST={tipoPagosList}
            withToolbar
            withBoxSearch
            withButton={false}
            iconosEnFila={false}
            columnaABuscarPri="tipo_de_pago"
            searchWhat={"Buscar tipo de pago ..."}
            txt_header={"Tipos de pagos"}
            // bgColorPagination="white"
            // dataOmitida={3}
            openModalEdit={openModalTipPagoEdit}
            funcionBtnTblDelete={handleOpenDialogDel}
            funcionDeleteVarious={deleteRegisterTipPago}
          />
        ) : (
          <h3>{errorMsgRegTipoPago.msg}</h3>
        )}
      </Box>
      <FormTipPago
        openModalForm={stateModalTipPago}
        setOpenModalForm={setStateModalTipPago}
        title={titleFormTiPago}
      />

      <DeleteConfirm
        stateOpen={openDialogDelete}
        setStateOpen={setOpenDialogDelete}
        message={
          <>
            <span style={{ color: "black" }}>
              {" "}
              ¿Está segura que desea eliminar
              {tipoPagoActivo !== null && ` ${tipoPagoActivo.tipo_de_pago} ?`}
            </span>
          </>
        }
        funcionDelete={deleteRegisterTipPago}
      />

      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message={msgAlertDel}
        colorbg="blueSecondary.main"
        colortxt="white"
        iconAlert={<DeleteForever sx={{ color: "white" }} />}
      />
    </div>
  );
};
