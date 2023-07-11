import { MenuItem, Select, Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CustomSelectMultiple = ({
  lblText = "",
  altura,
  ancho,
  listOptions = [],
  fnGetStyles,
  ...props
}) => {
  return (
    <div>
      {lblText !== "" && (
        <Typography fontSize="12px" fontWeight="bold" color="white">
          {lblText}
        </Typography>
      )}
      <Select
        displayEmpty
        {...props}
        multiple
        MenuProps={MenuProps}
        sx={{
          color: "white",
          margin: "2px",
          width: ancho,
          height: altura,
          // boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",

          fontStyle: "italic",
          fontWeight: "bold",

          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid white",
          },

          "& .MuiInputBase-root > .MuiSvgIcon-root": {
            color: "white !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
            border: "2px solid white",
          },
          "&:hover fieldset": {
            borderColor: "white !important ",
          },
          svg: {
            color: "white",
          },
        }}
      >
        {listOptions.map((option) => (
          <MenuItem key={option} value={option} style={fnGetStyles(option)}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
