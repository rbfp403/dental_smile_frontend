import { forwardRef } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { CancelOutlined, Close } from "@mui/icons-material";
import { GiConfirmed } from "react-icons/gi";
import { ButtonCustom } from "./ButtonCustom";

const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="left" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});

export const DeleteConfirm = ({
  message,
  funcionDelete,
  stateOpen,
  setStateOpen,
  bgColor = "white",
}) => {
  //

  const cerrarModalDelete = () => {
    setStateOpen(false);
  };
  //

  const confirmedDelete = () => {
    funcionDelete();
    cerrarModalDelete();
  };
  return (
    <Dialog
      maxWidth="sm"
      open={stateOpen}
      onClose={cerrarModalDelete}
      TransitionComponent={Transition}
      fullWidth
      keepMounted
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: bgColor,
        },
      }}
    >
      <DialogTitle>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "25px",
            fontStyle: "italic",
            textShadow: "0px 1px 1px rgba(0, 0, 0, 0.4)",
          }}
        >
          Confirme la acción
        </Typography>
      </DialogTitle>

      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={cerrarModalDelete}>
          <Close sx={{ color: "primary.main" }} />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography sx={{ fontWeight: "500", fontStyle: "italic" }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <ButtonCustom
          altura={"40px"}
          colorf={"white"}
          colorh={"btnHoverInForm.main"}
          colort={"black"}
          txt_b={"Cancelar"}
          colorth={"white"}
          propsXS={{ border: "1px solid black" }}
          iconB={<CancelOutlined />}
          onClick={cerrarModalDelete}
        />
        <ButtonCustom
          altura={"40px"}
          colorf={"primary.main"}
          colorh={"btnHoverInForm.main"}
          colort={"white"}
          txt_b={"Confirmar"}
          iconB={<GiConfirmed />}
          onClick={confirmedDelete}
        />
      </DialogActions>
    </Dialog>
  );
};
