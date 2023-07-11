import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

//
//
//

export const RadioGroupCustom = ({
  title = "",
  colorRadio,
  colorTxt = "black",
  colorLbl = "#602a90",
  fontw = "normal",
  fontSztxt = "14px",
  fontwlbl = "normal",
  fontSzlbl = "13px",
  radioOptions,
  hookRadio,
  setHookRadio,
  styleRadioGroup = {},
}) => {
  function handleClick(event) {
    if (event.target.value === hookRadio) {
      setHookRadio("");
    } else {
      setHookRadio(event.target.value);
    }
  }

  return (
    <Box display="flex" flexDirection="column">
      <p
        style={{
          fontSize: fontSzlbl,
          padding: "5px 0px 0px 0px",
          color: colorLbl,
          fontWeight: fontwlbl,
        }}
      >
        {title}
      </p>
      <RadioGroup
        row
        name="row-radio-buttons-group"
        value={hookRadio}
        sx={{ ...styleRadioGroup }}
      >
        {radioOptions.map((radio) => {
          return (
            <FormControlLabel
              key={radio}
              value={radio}
              control={
                <Radio
                  sx={{
                    "&, &.Mui-checked": {
                      color: colorRadio,
                    },
                  }}
                  onClick={handleClick}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: fontSztxt,
                    color: colorTxt,
                    fontWeight: fontw,
                  }}
                >
                  {radio}
                </Typography>
              }
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};
