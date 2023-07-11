import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";

export const CustomDatePicker = ({
  colorlbl = "primary.main",
  colorhver = "btnHoverInForm.main",
  propsXS,
  altura = "",
  ...propsDataPicker
}) => {
  return (
    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
      <DatePicker
        {...propsDataPicker}
        // slotProps={{
        //   textField:{
        //     onKeyDown:(e)=>{e.preventDefault();}
        //   }
        // }}

        sx={{
          boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
          ":hover": {
            boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
          },
          "& .MuiInputBase-root": {
            height: altura,
          },
          "& .Mui-focused.MuiInputBase-root ": {
            boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
          },
          "& .MuiFormLabel-root": {
            color: colorlbl,
          },
          "& .MuiFormLabel-root.Mui-focused": {
            color: colorhver,
          },
          "& .MuiInputAdornment-root > .MuiButtonBase-root": {
            color: colorlbl,
          },

          "& .Mui-focused > .MuiInputAdornment-root > .MuiButtonBase-root": {
            color: colorhver,
          },

          "& .MuiInputBase-input ": {
            color: "black",
            textTransform: "capitalize",
          },
          "& .MuiFormHelperText-contained": {
            color: colorhver,
          },

          "& .Mui-error ~ p": {
            color: "error.main",
          },

          ...propsXS,
        }}
      />
    </LocalizationProvider>
  );
};
