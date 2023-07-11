import { Autocomplete, InputAdornment, TextField } from "@mui/material";

export const CustomAutocomplete = ({
  propsTextField,
  colorLbl = "primary.main",
  colorHover = "btnHoverInForm.main",
  colorTxt = "black",
  colorIcon = "primary.main",
  iconAutocomplete,
  heightList,
  ...propsAutocomplete
}) => {
  return (
    <Autocomplete
      {...propsAutocomplete}
      renderInput={(params) => (
        <TextField
          multiline
          {...params}
          {...propsTextField}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment sx={{ color: colorIcon }} position="start">
                {iconAutocomplete}
              </InputAdornment>
            ),
          }}
        />
      )}
      sx={{
        boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
        ":hover": {
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        },

        "& .Mui-focused.MuiInputBase-root ": {
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        },
        "& .MuiFormLabel-root": {
          color: colorLbl,
        },
        "& .MuiFormLabel-root.Mui-focused": {
          color: colorHover,
        },
        "& .Mui-focused > .MuiInputAdornment-root > .MuiSvgIcon-root": {
          color: colorHover,
        },

        "& .MuiInputBase-input ": {
          color: colorTxt,
        },
        "& .MuiFormHelperText-contained": {
          color: colorHover,
        },

        "& .Mui-error ~ p": {
          color: "error.main",
        },
      }}
      ListboxProps={{
        style: {
          maxHeight: heightList,
        },
      }}
    />
  );
};
