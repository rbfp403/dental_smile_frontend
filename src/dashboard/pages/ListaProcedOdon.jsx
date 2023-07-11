import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { MdPostAdd } from "react-icons/md";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
} from "../../ui";
import { FormProced } from "../components";
import { useDataStore, useProcedStore, useUiStore } from "../../hooks";

const TABLE_HEAD = [
  { id: "codigo", label: "Código", alignLeft: true },
  { id: "procedimiento", label: "Procedimiento", alignLeft: true },
  { id: "precio", label: "Precio", alignLeft: true },
  { id: "descripcion", label: "Descripción", alignLeft: true },
];

/*******************************ListaTiposConsultas*************************************** */

export const ListaProcedOdon = () => {
  //customs hooks store

  const { changePage } = useUiStore();

  const {
    procedList,
    procedActivo,
    errorMsgRegProced,
    changeDataProced,
    startLoadProcedList,
    startDeletingProced,
    startLoadTitulosList,
  } = useProcedStore();

  const { dataActiva } = useDataStore();

  //hooks

  const [stateModalProced, setStateModalProced] = useState(false);
  const [titleFormProced, setTitleFormProced] = useState("");

  //control de modal registrar y editar
  const openModalProcedReg = () => {
    setTitleFormProced("Registro de procedimiento odontológico");
    setStateModalProced(true);
  };

  const openModalProcedEdit = () => {
    setTitleFormProced("Editar procedimiento odontológico");
    setStateModalProced(true);
  };

  //controlDialog Confirm Delete
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

  //control alert de eliminacion
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const [colorBgSnackbar, setColorBgSnackbar] = useState("");
  const [msgAlertDel, setMsgAlertDel] = useState("");

  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //funcion eliminar uno o varias tipos de consultas
  const deleteRegisterProced = async (selected = []) => {
    if (selected.length <= 1) {
      setMsgAlertDel("Procedimiento fue eliminado.");
    } else {
      setMsgAlertDel("Los procedimientos fueron eliminados exitosamente.");
    }

    await startDeletingProced(selected);
  };

  //efectos secundarios
  useEffect(() => {
    changePage();
    startLoadProcedList();
    startLoadTitulosList();
  }, []);

  //efecto secundario pasar la info del registro de la tabla
  //al tipo de consulta activo
  useEffect(() => {
    if (dataActiva[0] === "Procedimientos odontológicos") {
      changeDataProced(dataActiva[1]);
    }
  }, [dataActiva]);

  //
  useEffect(() => {
    if (errorMsgRegProced.msg === "Sin errores en la eliminacion") {
      setColorBgSnackbar("blueSecondary.main");
      handleOpenSnackbar();
    }
    if (errorMsgRegProced.msg === "Hay errores en la eliminacion") {
      setMsgAlertDel(errorMsgRegProced.error);
      setColorBgSnackbar("error.main");
      handleOpenSnackbar();
    }
  }, [errorMsgRegProced]);

  //
  const BtnToolbarTable = () => {
    return (
      <ButtonCustom
        altura={"42px"}
        colorf={"myBgColor.main"}
        colorh={"black"}
        colort={"black"}
        colorth={"celesteNeon.main"}
        txt_b={"Agregar procedimiento"}
        flexDir="row"
        txt_b_size="17px"
        fontW="bold"
        propsXS={{ boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)" }}
        iconB={<MdPostAdd />}
        onClick={openModalProcedReg}
      />
    );
  };
  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",

        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.3),rgba(250,250,250, 0.3)) , url(/assets/img/fondos/listaProcedOdon.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        objectPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        // margin="30px"
        padding="30px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.7)" }}
      >
        <Typography
          variant="h5"
          fontStyle="italic"
          fontWeight="bold"
          color="primary.main"
        >
          Lista de procedimientos odontológicos
        </Typography>
      </Box>
      <Box
        className="box-shadow animate__animated animate__fadeInUp animate__faster"
        margin="50px 30px 0px 30px"
        padding="10px"
        borderRadius="5px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.7)" }}
      >
        <CustomTable
          TABLE_HEAD={TABLE_HEAD}
          DATALIST={procedList}
          withToolbar
          withBoxSearch
          withButton
          btnToolbarTable={BtnToolbarTable}
          iconosEnFila={false}
          columnaABuscarPri="procedimiento"
          searchWhat={"Buscar procedimientos"}
          txt_header={"Procedimientos odontológicos"}
          openModalEdit={openModalProcedEdit}
          funcionBtnTblDelete={handleOpenDialogDel}
          funcionDeleteVarious={deleteRegisterProced}
        />
      </Box>
      <FormProced
        openModalForm={stateModalProced}
        setOpenModalForm={setStateModalProced}
        title={titleFormProced}
      />

      <DeleteConfirm
        stateOpen={openDialogDelete}
        setStateOpen={setOpenDialogDelete}
        message={
          <>
            <span style={{ color: "black" }}>
              {" "}
              ¿Está segura que desea eliminar
              {procedActivo !== null && ` ${procedActivo.procedimiento} ?`}
            </span>
          </>
        }
        funcionDelete={deleteRegisterProced}
      />

      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={""}
        message={msgAlertDel}
        colorbg={colorBgSnackbar}
        colortxt="white"
        iconAlert={<DeleteForever sx={{ color: "white" }} />}
      />
    </div>
  );
};
