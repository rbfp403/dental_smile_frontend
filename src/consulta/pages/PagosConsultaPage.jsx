import { useEffect, useState } from "react";
import {
  Box,
  Portal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  CheckCircleOutline,
  DeleteForever,
  DeleteOutlined,
  EditNoteOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { ButtonCustom, CustomAlert, DeleteConfirm } from "../../ui";
import { FormModalPago } from "../components";
import { usePagosStore, useTratamientosStore } from "../../hooks";
import { invertDateFormat } from "../../agenda/helpers";

const TABLE_HEAD_PAGO = [
  { id: "pago_por", label: "Pago por" },
  { id: "monto", label: "Monto" },
  { id: "nota", label: "Nota" },
  { id: "fecha_reg", label: "Fecha" },
  { id: "acciones", label: "" },
];

//
//
//
//

export const PagosConsultaPage = () => {
  const {
    startLoadPagos,
    pagosList,
    sumPagos,
    changeDataPago,
    startSavingPago,
    startDeletingPago,
  } = usePagosStore();

  //store
  const { tratamientosList } = useTratamientosStore();

  useEffect(() => {
    startLoadPagos();
  }, [tratamientosList]);

  //hook abrir el formulario
  const [stateModalFormPago, setStateModalFormPago] = useState(false);

  //hook cambiar titulo del formulario
  const [titleFormPago, setTitleFormPago] = useState("");

  //hook controlDialog Eliminar
  const [openDialogDeletePago, setopenDialogDeletePago] = useState(false);

  //hook alert registro
  const [stateSnackbar, setStateSnackbar] = useState(false);

  //hook alert eliminacion
  const [stateSnackbarErr, setStateSnackbarErr] = useState(false);

  //abrir el modal para crear un pago
  const openModalFormPago = () => {
    setStateModalFormPago(true);
    setTitleFormPago("Registrar pago");
    changeDataPago(null);
  };

  //abrir el modal para editar un pago
  const openModalPagoEdit = (dataPago) => {
    changeDataPago(dataPago);
    setStateModalFormPago(true);
    setTitleFormPago("Editar pago");
  };

  //abrir confirm dialog eliminar pago
  const handleOpenDialogDelPago = (dataPago) => {
    changeDataPago(dataPago);
    setopenDialogDeletePago(true);
  };

  //manejadores alerta de registro
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //manejadores alerta de eliminacion
  const handleCloseSnackbarErr = () => {
    setStateSnackbarErr(false);
  };
  const handleOpenSnackbarErr = () => {
    setStateSnackbarErr(true);
  };

  //guardar pago
  const savePago = async (dataPago) => {
    await startSavingPago(dataPago);
    handleOpenSnackbar();
  };

  //eliminar pago
  const deletePago = async () => {
    await startDeletingPago();
    handleOpenSnackbarErr();
  };

  //
  return (
    <div
      className="animate__animated animate__fadeInUp animate__faster"
      style={{
        margin: "0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: "15px",
          backgroundColor: "primary.main",
          color: "white",
          padding: "10px 20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Pagos
        </Typography>
        <ButtonCustom
          altura="45px"
          txt_b_size="14px"
          flexDir="column-reverse"
          colorf="transparent"
          colorh="transparent"
          colort="white"
          colorth="celesteNeon.main"
          txt_b="Agregar"
          fontW="bold"
          iconB={<RiMoneyDollarBoxFill />}
          onClick={openModalFormPago}
          propsXS={{ boxShadow: "none !important" }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          // padding: "10px",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#F4F6F8",
                }}
              >
                {TABLE_HEAD_PAGO.map((tab_hd, index) => (
                  <TableCell
                    key={tab_hd.id}
                    align="left"
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      fontSize: "15px",
                      borderRight:
                        index === TABLE_HEAD_PAGO.length - 1
                          ? "none"
                          : "4px solid white",
                    }}
                  >
                    {tab_hd.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pagosList.map((pago, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      borderBottom:
                        index === pagosList.length - 1
                          ? "none"
                          : "3px  solid #F4F6F8",
                    }}
                  >
                    <TableCell
                      key={`pago_por_${index}`}
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      {pago.pago_por}
                    </TableCell>
                    <TableCell
                      key={`monto_${index}`}
                      align="left"
                      sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                    >
                      {"$ " + pago.monto}
                    </TableCell>
                    <TableCell
                      key={`desc_ingreso_${index}`}
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      {pago.desc_ingreso === undefined ? "" : pago.desc_ingreso}
                    </TableCell>
                    <TableCell
                      key={`fecha_create_${index}`}
                      align="left"
                      sx={{ fontWeight: "bold" }}
                    >
                      {pago.fecha_create === undefined
                        ? ""
                        : invertDateFormat(pago.fecha_create)}
                    </TableCell>

                    {/* botones */}
                    <TableCell align="center">
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                      >
                        {pago.id_ingreso !== undefined ? (
                          <>
                            <ButtonCustom
                              txt_b_size="14px"
                              altura="35px"
                              colorf="transparent"
                              colorh="transparent"
                              colort="blueSecondary.main"
                              colorth="black"
                              flexDir="column-reverse"
                              txt_b="Editar"
                              fontW="bold"
                              onClick={() => {
                                openModalPagoEdit(pago);
                              }}
                              iconB={<EditNoteOutlined />}
                              propsXS={{ boxShadow: "none !important" }}
                            />
                            <ButtonCustom
                              txt_b_size="14px"
                              altura="35px"
                              colorf="transparent"
                              colorh="transparent"
                              colort="error.main"
                              colorth="black"
                              flexDir="column-reverse"
                              txt_b="Eliminar"
                              fontW="bold"
                              onClick={() => {
                                handleOpenDialogDelPago(pago);
                              }}
                              iconB={<DeleteOutlined />}
                              propsXS={{ boxShadow: "none !important" }}
                            />
                          </>
                        ) : (
                          <ButtonCustom
                            txt_b_size="14px"
                            altura="35px"
                            colorf="transparent"
                            colorh="transparent"
                            colort="primary.main"
                            colorth="black"
                            flexDir="column-reverse"
                            txt_b="Guardar"
                            fontW="bold"
                            onClick={() => {
                              savePago(pago);
                            }}
                            iconB={<SaveOutlined />}
                            propsXS={{ boxShadow: "none !important" }}
                          />
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell
                  key={`sum pago`}
                  align="left"
                  sx={{ fontWeight: "bold" }}
                >
                  Total: $ {sumPagos}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <FormModalPago
        openModal={stateModalFormPago}
        setOpenModal={setStateModalFormPago}
        title={titleFormPago}
      />
      <DeleteConfirm
        stateOpen={openDialogDeletePago}
        setStateOpen={setopenDialogDeletePago}
        message={`¿Está segura que desea eliminar el pago?`}
        funcionDelete={deletePago}
      />
      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message="Pago registrado exitosamente 🙂."
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
        />
        <CustomAlert
          stateSnackbar={stateSnackbarErr}
          handleCloseSnackbar={handleCloseSnackbarErr}
          title={"Completado"}
          message="Pago eliminado exitosamente 🙂."
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<DeleteForever sx={{ color: "white" }} />}
        />
      </Portal>
    </div>
  );
};
