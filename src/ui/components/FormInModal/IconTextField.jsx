import { InputAdornment, TextField } from "@mui/material";

export const IconTextField = ({
  colorIcon,
  colorHover,
  colorTxt,
  colorLabel,
  iconStart,
  iconEnd,
  InputProps,
  propsXS,
  font_we = "normal",
  font_sty = "normal",
  fontWlbl = "normal",
  colorErr = "error.main",
  align_Txt = "",
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      sx={{
        boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
        // ":hover": {
        //   boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        // },

        "& .MuiInputLabel-root.Mui-disabled ": {
          opacity: "0.3",
        },
        "& .MuiFormHelperText-contained": {
          color: colorHover,
          // margin: "2px 3px",
        },
        "& .Mui-disabled.MuiInputBase-formControl": {
          opacity: "0.3",
        },
        "& .Mui-focused.MuiInputBase-root ": {
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        },

        "& .Mui-focused > .MuiInputAdornment-root > .material-icons": {
          color: colorHover,
        },

        // "& .Mui-focused > .MuiInputAdornment-root > .MuiButtonBase-root": {
        //   color: colorHover,
        // },

        "& .MuiInputBase-root ": {
          "& input": {
            textAlign: align_Txt,
            fontStyle: font_sty,
            fontWeight: font_we,
            color: colorTxt,
          },
          "& textarea": {
            textAlign: align_Txt,
            fontStyle: font_sty,
            fontWeight: font_we,
            color: colorTxt,
          },
        },

        "& .MuiFormLabel-root": {
          color: colorLabel,
          fontWeight: fontWlbl,
        },
        "& .MuiFormLabel-root.Mui-error": {
          color: "none",
        },
        "& .MuiFormLabel-root.Mui-focused": {
          color: colorHover,
        },
        "& .MuiFormLabel-root.Mui-focused.Mui-error": {
          color: colorErr,
        },
        "& .MuiFormHelperText-root.Mui-error": {
          color: colorErr,
        },
        "& .MuiSvgIcon-root": {
          color: colorIcon,
        },
        ...propsXS,
      }}
      {...props}
      //
      InputProps={{
        ...InputProps,

        startAdornment: iconStart ? (
          <InputAdornment sx={{ color: colorIcon }} position="start">
            {iconStart}
          </InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment sx={{ color: colorIcon }} position="end">
            {iconEnd}
          </InputAdornment>
        ) : null,
      }}
    />
  );
};
