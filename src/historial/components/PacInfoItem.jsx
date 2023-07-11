import { Box, Grid, Typography } from "@mui/material";

export const PacInfoItem = ({ gridArea, lblItem, dataPac }) => {
  return (
    <Grid
      item
      gridArea={gridArea}
      display="flex"
      flexDirection="row"
      columnGap="10px"
      alignItems="center"
    >
      <Box>
        <img
          type="img/svg"
          width="50px"
          height="50px"
          src={`/assets/icons/pacInfoItem/${gridArea}.svg`}
        />
      </Box>
      <Box>
        <Typography sx={{ fontStyle: "italic", fontWeight: "bold" }}>
          {dataPac}
        </Typography>
        <Typography sx={{ color: "grey", fontWeight: "bold" }}>
          {lblItem}
        </Typography>
      </Box>
    </Grid>
  );
};
