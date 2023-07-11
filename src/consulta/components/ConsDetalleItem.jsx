import { Box, Typography } from "@mui/material";

//
//
//

export const ConsDetalleItem = ({ icon_name, lblItem, dataCons }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      columnGap="10px"
      padding="10px"
      sx={{
        backgroundColor: "myBgColor.main",
        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.5)",
      }}
    >
      <img
        type="img/svg"
        width="50px"
        height="50px"
        src={`/assets/icons/consultaDetalle/${icon_name}.svg`}
      />

      <Box display="flex" flexDirection="column">
        <Box display="flex">
          <Typography
            sx={{
              color: "grey",
              fontSize: "16px",

              fontWeight: "bold",
            }}
          >
            {lblItem}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography
            sx={{
              fontSize: "16px",

              color: "black",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            {dataCons}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
