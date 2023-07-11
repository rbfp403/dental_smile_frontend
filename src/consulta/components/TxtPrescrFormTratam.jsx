import { Box, IconButton, TextField } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

export const TxtPrescrFormTratam = ({ data, fnDelete, fnUpdate }) => {
  return (
    <Box display="flex" flexDirection="row" columnGap="10px">
      <TextField
        size="small"
        variant="filled"
        multiline
        fullWidth
        hiddenLabel
        name="desc_presc"
        value={data.desc_presc}
        onChange={({ target }) => {
          fnUpdate(data.id, { [target.name]: target.value });
        }}
        sx={{
          "& .MuiInputBase-root ": {
            padding: "7px 5px 3px 5px",
            backgroundColor: "myBgColor.main",
          },
        }}
      />
      <TextField
        size="small"
        variant="filled"
        multiline
        fullWidth
        hiddenLabel
        name="dosi_presc"
        value={data.dosi_presc}
        onChange={({ target }) => {
          fnUpdate(data.id, { [target.name]: target.value });
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
          fnDelete(data.id, data.id_presc);
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
