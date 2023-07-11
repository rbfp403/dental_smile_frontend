import { useEffect } from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import { CloseOutlined } from "@mui/icons-material";

import { CustomAutocomplete } from "../../ui";

import { useProcedStore } from "../../hooks";

//
//

export const FormModalProcedTratam = ({
  openModal,
  setOpenModal,
  fnAddProced,
}) => {
  //store

  const { procedList, startLoadProcedList } = useProcedStore();

  //cerrarModal
  const cerrarModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    startLoadProcedList();
  }, []);

  return (
    <>
      <Dialog
        maxWidth="md"
        open={openModal}
        onClose={cerrarModal}
        sx={{
          "& .MuiPaper-root": {
            width: "700px",
            height: "500px",
          },
        }}
      >
        <DialogTitle
          padding="16px 10px 16px  20px !important"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              fontStyle: "italic",
              textShadow: "0px 1px 1px rgba(0, 0, 0, 0.4)",
            }}
          >
            Seleccionar procedimiento odontológico
          </Typography>

          <IconButton onClick={cerrarModal}>
            <CloseOutlined style={{ fontSize: "25px", color: "#602a90" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box display="flex" paddingTop="10px">
            <CustomAutocomplete
              open={true}
              fullWidth
              options={procedList}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  fnAddProced(
                    newValue.codigo,
                    newValue.procedimiento,
                    newValue.id
                  );
                }
                cerrarModal();
              }}
              getOptionLabel={(option) => {
                return option.codigo.length > 0
                  ? option.codigo + " - " + option.procedimiento
                  : option.procedimiento;
              }}
              propsTextField={{
                label: "Procedimientos:",
                placeholder: "Seleccione un procedimiento",
              }}
              heightList="340px"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
