import { ToggleButton } from "@mui/material";

export const MyButtonInGroup = ({ text, fncOnClick, ...props }) => {
  return (
    <ToggleButton
      sx={{
        textTransform: "capitalize",

        color: "black",
        border: "1px solid black",
        "&.MuiToggleButton-root.Mui-selected": {
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
      {...props}
      onClick={fncOnClick}
    >
      {text}
    </ToggleButton>
  );
};
