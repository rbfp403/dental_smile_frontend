import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";

export const CustomTimePicker = ({
  colorLbl = "primary.main",
  colorHver = "btnHoverInForm.main",
  ...propsTimePicker
}) => {
  return (
    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
      <TimePicker
        {...propsTimePicker}
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
            color: colorHver,
          },
          "& .MuiInputAdornment-root > .MuiButtonBase-root": {
            color: colorLbl,
          },

          "& .Mui-focused > .MuiInputAdornment-root > .MuiButtonBase-root": {
            color: colorHver,
          },

          "& .MuiInputBase-input ": {
            color: "black",
          },
          "& .MuiFormHelperText-contained": {
            color: colorHver,
          },

          "& .Mui-error ~ p": {
            color: "error.main",
          },
        }}
      />
    </LocalizationProvider>
  );
};
