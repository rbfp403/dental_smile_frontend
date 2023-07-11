import { useState, useEffect } from "react";

import { Box, Dialog, DialogContent, Icon, Portal } from "@mui/material";

import {
  CancelOutlined,
  CheckCircleOutline,
  SaveOutlined,
  SegmentOutlined,
} from "@mui/icons-material";

import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";

import { useOdontogramaStore } from "../../hooks";

//
//
//

export const FormModalNota = ({ openModal, setOpenModal }) => {
  //store
  const { onChangePiezaActiva, piezaActiva, updateNotaPiezaDental } =
    useOdontogramaStore();

  //hook nota
  const [stateNota, setStateNota] = useState("");
  //cerrarModal
  const cerrarModal = () => {
    setOpenModal(false);
    onChangePiezaActiva(null);
  };

  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  useEffect(() => {
    if (piezaActiva) {
      setStateNota(piezaActiva.nota);
    }
  }, [piezaActiva]);

  //funcion enviar los datos
  const onSubmit = async () => {
    if (stateNota.trim().length === 0) return;

    await updateNotaPiezaDental(stateNota);
    cerrarModal();
    handleOpenSnackbar();
  };

  //
  return (
    <>
      <Dialog
        maxWidth="sm"
        open={openModal}
        onClose={cerrarModal}
        sx={{
          "& .MuiPaper-root": {
            width: "600px",
          },
        }}
      >
        <DialogContent>
          <IconTextField
            fullWidth
            rows={3}
            label="Nota:"
            type="text"
            multiline
            value={stateNota}
            onChange={({ target }) => {
              setStateNota(target.value);
            }}
            colorIcon="primary.main"
            colorHover="btnHoverInForm.main"
            colorTxt="black"
            colorLabel="primary.main"
            iconEnd={
              <Icon>
                <SegmentOutlined />
              </Icon>
            }
          />

          <Box
            display="flex"
            flexDirection="row"
            columnGap="15px"
            marginTop="15px"
            justifyContent="center"
            alignItems="center"
          >
            <ButtonCustom
              altura={"40px"}
              colorf={"white"}
              colorh={"btnHoverInForm.main"}
              colort={"black"}
              txt_b={"Cancelar"}
              colorth={"white"}
              propsXS={{ border: "1px solid black" }}
              iconB={<CancelOutlined />}
              onClick={cerrarModal}
            />

            <ButtonCustom
              tipoBtn="submit"
              altura="40px"
              colorf="primary.main"
              colorh="btnHoverInForm.main"
              colort="white"
              txt_b="Actualizar"
              onClick={onSubmit}
              iconB={<SaveOutlined />}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message="Nota actualizada"
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
        />
      </Portal>
    </>
  );
};
