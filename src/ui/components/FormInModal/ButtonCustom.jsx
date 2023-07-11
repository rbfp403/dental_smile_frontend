import { useState } from "react";
import { Box, Icon, Typography } from "@mui/material";

export const ButtonCustom = ({
  altura = "45px",
  colorf,
  colorh,
  colort,
  colorth = colort,
  txt_b = "",
  iconB,
  onClick,
  fontW = "normal",
  tipoBtn = "button",
  flexDir = "row",
  txt_b_size = "16px",
  desactived = false,
  propsXS,
}) => {
  const [colorTextBtn, setColorTextBtn] = useState(colort);

  return (
    <Box
      disabled={desactived}
      component="button"
      type={tipoBtn}
      onClick={onClick}
      onMouseEnter={() => {
        setColorTextBtn(colorth);
      }}
      onMouseLeave={() => {
        setColorTextBtn(colort);
      }}
      sx={{
        cursor: "pointer",
        paddingRight: "0px",
        height: altura,
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "10px",
        backgroundColor: colorf,
        boxShadow: "none",
        border: "none",
        ":hover": {
          border: "none",
          backgroundColor: colorh,
          transition: "background-color 200ms linear",

          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        },
        ...propsXS,
      }}
    >
      <Box
        display="flex"
        flexDirection={flexDir}
        alignItems="center"
        sx={{
          paddingLeft: flexDir === "row" ? "10px" : "7px",
          paddingRight: "7px",
        }}
        columnGap="10px"
      >
        <Typography
          sx={{
            color: colorTextBtn,
            fontSize: txt_b_size,
            fontStyle: "italic",
            fontWeight: fontW,
          }}
        >
          {txt_b}
        </Typography>
        <Icon
          sx={{
            color: colorTextBtn,
          }}
        >
          {iconB}
        </Icon>
      </Box>
    </Box>
  );
};
