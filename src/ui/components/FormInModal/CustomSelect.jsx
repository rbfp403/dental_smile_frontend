import { MenuItem, Select, Typography } from "@mui/material";

export const CustomSelect = ({
  lblText = "",
  altura,
  ancho,
  listOptions = [],
  ...props
}) => {
  return (
    <div>
      {lblText !== "" && (
        <Typography fontSize="12px" fontWeight="bold" color="primary.main">
          {lblText}
        </Typography>
      )}
      <Select
        displayEmpty
        {...props}
        sx={{
          margin: "2px",
          width: ancho,
          height: altura,
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",

          fontStyle: "italic",
          fontWeight: "bold",

          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #602A90",
          },

          "& .MuiInputBase-root > .MuiSvgIcon-root": {
            color: "#602A90 !important",
          },
          "&:hover fieldset": {
            borderColor: "#602A90 !important ",
          },
          svg: {
            color: "secondary.main",
          },
        }}
      >
        {listOptions.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
