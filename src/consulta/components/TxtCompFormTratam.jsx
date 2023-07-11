import { Box, IconButton, TextField } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export const TxtCompFormTratam = ({ data, fnDelete, fnUpdate }) => {
  return (
    <Box display="flex" flexDirection="row" columnGap="5px">
      <TextField
        size="small"
        multiline
        fullWidth
        hiddenLabel
        variant="filled"
        value={data.txt_compli}
        onChange={({ target }) => {
          fnUpdate(data.id, target.value);
        }}
        sx={{
          "& .MuiInputBase-root ": {
            padding: "7px 5px 3px 5px",
            backgroundColor: "myBgColor.main",
          },
        }}
      />
      <IconButton
        onClick={() => {
          fnDelete(data.id, data.id_compli);
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
