import { Box, Typography } from "@mui/material";

//
//
//

export const ConsInfoItem = ({ icon_name, lblItem, dataCons }) => {
  return (
    <Box display="flex" flexDirection="row" columnGap="10px">
      <img
        type="img/svg"
        width="40px"
        height="40px"
        src={`/assets/icons/consultaDetalle/${icon_name}.svg`}
      />

      <Box display="flex" flexDirection="column">
        <Box display="flex">
          <Typography
            sx={{
              color: "white",
              fontSize: "15px",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            {dataCons}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography
            sx={{
              padding: "0px 5px",
              fontSize: "15px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {lblItem}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
