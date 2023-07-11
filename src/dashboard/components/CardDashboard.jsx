import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Paper, Typography } from "@mui/material";

export const CardDashboard = ({
  iconName,
  resultado,
  label,

  route,
}) => {
  return (
    <Link
      component={RouterLink}
      to={`${route}`}
      sx={{
        textDecoration: "none",
        display: "flex",
        flexWrap: "wrap",
        cursor: "pointer",

        "& > :not(style)": {
          width: 260,
          height: 180,
        },
      }}
    >
      <Paper
        elevation={5}
        sx={{
          backgroundColor: "rgba(156, 39, 176, 0.3)",
          padding: "20px",
          ":hover": {
            transform: "scale(1.1)",
            boxShadow: "5px 7px 7px rgba(0, 0, 0, 0.5)",
            backgroundColor: "primary.light",
            "&.MuiPaper-root > .MuiBox-root > .MuiTypography-root": {
              color: "white",
            },
          },
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            type="img/svg"
            width="70px"
            height="70px"
            src={`/assets/icons/dashboard/${iconName}.svg`}
          />
          <Typography variant="h3">{resultado}</Typography>
          <Typography variant="h6">{label}</Typography>
        </Box>
      </Paper>
    </Link>
  );
};
