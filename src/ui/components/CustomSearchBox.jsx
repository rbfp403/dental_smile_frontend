import { IconButton, OutlinedInput } from "@mui/material";
import { Close } from "@mui/icons-material";

export const CustomSearchBox = ({
  stateTxt,
  setStateTxt,
  altura = 40,
  bgColor = "colorTable.main",
  placeHol_txt = "",
  borderConfig = "",
  colorPlaceH = "grey",
}) => {
  return (
    <OutlinedInput
      fullWidth
      placeholder={placeHol_txt}
      value={stateTxt}
      onChange={(event) => {
        setStateTxt(event.target.value);
      }}
      sx={{
        height: altura,
        backgroundColor: bgColor,
        boxShadow: "1.5px 2.5px 2.5px rgba(0, 0, 0, 0.6)",
        "& fieldset": {
          border: borderConfig,
        },
        input: {
          "&::placeholder": {
            opacity: 1,
            color: colorPlaceH,

            fontStyle: "italic",
          },
          fontWeight: "bold",
          fontStyle: "italic",
        },
        "&.MuiInputBase-root.Mui-focused ": {
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.7)",
        },
      }}
      endAdornment={
        <IconButton
          sx={{
            visibility: stateTxt.length > 0 ? "visible" : "hidden",
          }}
          onClick={() => setStateTxt("")}
        >
          <Close
            sx={{
              color: colorPlaceH,
            }}
          />
        </IconButton>
      }
    ></OutlinedInput>
  );
};
