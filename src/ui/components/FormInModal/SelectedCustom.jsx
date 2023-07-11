import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

export const SelectedCustom = ({
  colorH = "btnHoverInForm.main",
  colorLbl = "primary.main",
  colorTxt = "black",
  txt_label = "",
  txt_validation = "",
  opciones = [],
  ...props
}) => {
  return (
    <FormControl
      fullWidth
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
          color: colorH,
        },
        "& .MuiFormHelperText-contained": {
          color: colorH,
        },

        "& .Mui-error ~ p": {
          color: "error.main",
        },
        "& .MuiInputBase-input ": {
          color: colorTxt,
        },
      }}
    >
      <InputLabel id="multiple-tipo-label">{txt_label}</InputLabel>
      <Select
        labelId="multiple-tipo-label"
        {...props}
        input={<OutlinedInput label={txt_label} />}
      >
        {opciones.map((opcion) => (
          <MenuItem key={opcion} value={opcion}>
            {opcion}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{txt_validation}</FormHelperText>
    </FormControl>
  );
};
