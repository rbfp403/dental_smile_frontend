import { TextField } from "@mui/material";

export const CustomStandardTF = ({
  colorTxt,
  colorHelp,
  colorBrd,
  colorBrdHov = colorBrd,
  propsSX,

  ...props
}) => {
  return (
    <TextField
      variant="standard"
      InputProps={{ readOnly: true }}
      {...props}
      sx={{
        "& .MuiInput-root": {
          color: colorTxt,
          fontWeight: "bold",
          fontStyle: "italic",
          borderBottom: `2px solid ${colorBrd}  !important`,
          transition: "border-bottom 0.2s ease-out",
          "&:before": {
            display: "none",
          },
          "&:after": {
            display: "none",
          },
        },

        "& .MuiInput-root.Mui-focused": {
          transition: "border-bottom 0.2s ease-out",

          borderBottom: `2px solid ${colorBrdHov} !important`,
        },
        "& .MuiFormHelperText-root": {
          color: colorHelp,

          fontWeight: "bold",
          fontSize: "15px",
        },

        ...propsSX,
      }}
    />
  );
};
