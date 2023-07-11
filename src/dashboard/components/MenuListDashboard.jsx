import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

export const MenuListDashboard = ({ txtLabel, route }) => {
  return (
    <Link
      component={RouterLink}
      to={`${route}`}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        cursor: "pointer",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: "5px",
        height: "100%",
        width: "35%",
        padding: "10px 15px",
        textDecoration: "none",
        transition: "color 0.5s, background-color 0.5s",
        ":hover": {
          backgroundColor: "primary.main",
          color: "white !important",
          transition: "color 0.5s, background-color 0.5s",
        },
      }}
    >
      <Typography variant="h5" fontStyle="italic">
        {txtLabel}
      </Typography>
    </Link>
  );
};
