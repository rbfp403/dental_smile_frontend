import { Box, IconButton, TextField } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export const TxtProcedFormTratam = ({ data, fnDelete }) => {
  return (
    <Box display="flex" flexDirection="row" columnGap="5px">
      <TextField
        size="small"
        multiline
        fullWidth
        hiddenLabel
        variant="filled"
        InputProps={{
          readOnly: true,
        }}
        value={
          data.cod_proced
            ? data.cod_proced + " - " + data.nom_proced
            : data.nom_proced
        }
        sx={{
          "& .MuiInputBase-root ": {
            padding: "7px 5px 3px 5px",
            backgroundColor: "myBgColor.main",
            ":hover": {
              backgroundColor: "myBgColor.main",
            },
          },
        }}
      />
      <IconButton
        onClick={() => {
          fnDelete(data.id, data.id_tratam_proced);
        }}
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <CloseOutlined style={{ fontSize: "20px", color: "#d32f2f" }} />
      </IconButton>
    </Box>
  );
};
