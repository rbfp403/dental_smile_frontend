import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export const ViewRecursoFoto = ({ stateDialog, setStateDialog, dataFoto }) => {
  //

  //
  const cerrarModal = () => {
    setStateDialog(false);
  };

  return (
    <Dialog
      maxWidth="xl"
      open={stateDialog}
      onClose={cerrarModal}
      sx={{
        "& .MuiPaper-root": {
          minHeight: "85%",
          minWidth: "80%",
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "10px",
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: "35px",
          padding: "15px",
          height: "100vh",
        }}
      >
        <img src={dataFoto.url} alt="image" />

        <Box display="flex" flexDirection="column" flexBasis="25%">
          <Box alignSelf="end">
            <IconButton onClick={cerrarModal}>
              <CloseOutlined style={{ fontSize: "25px", color: "#602a90" }} />
            </IconButton>
          </Box>

          <Box display="flex" flexDirection="column" rowGap="30px">
            <div>
              <Typography
                fontWeight="bold"
                fontSize="18px"
                color="primary.main"
              >
                Fecha
              </Typography>
              <Typography fontWeight="bold" fontSize="16px" color="black">
                {dataFoto.fecha}
              </Typography>
            </div>

            <div>
              <Typography
                fontWeight="bold"
                fontSize="18px"
                color="primary.main"
              >
                Título
              </Typography>
              <Typography fontWeight="bold" fontSize="16px" color="black">
                {dataFoto.titulo}
              </Typography>
            </div>

            <div>
              <Typography
                fontWeight="bold"
                fontSize="18px"
                color="primary.main"
              >
                Descripción
              </Typography>
              <Typography fontWeight="bold" fontSize="16px" color="black">
                {dataFoto.descr}
              </Typography>
            </div>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
