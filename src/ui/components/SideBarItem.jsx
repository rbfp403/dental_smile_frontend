import { Link } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";
import { Typography } from "@mui/material";
import { useUiStore } from "../../hooks";

export const SideBarItem = ({ title, to, icon }) => {
  //

  const { pageActive } = useUiStore();

  return (
    <MenuItem
      active={pageActive === title}
      style={{
        color: "black",
      }}
      icon={icon}
    >
      <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
