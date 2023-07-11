import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { ButtonCustom } from "./FormInModal/ButtonCustom";
import { DeleteConfirm } from "./FormInModal/DeleteConfirm";
import { useAuthStore, useUiStore } from "../../hooks";

export const Topbar = () => {
  //

  const { isSidebarOpen, pageActive } = useUiStore();

  const [openDialogLogout, setOpenDialogLogout] = useState(false);

  const { logout } = useAuthStore();

  const handleOpenLogout = () => {
    setOpenDialogLogout(true);
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        p="20px"
        alignItems="center"
      >
        <Box
          display={!isSidebarOpen ? "none" : "flex"}
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
        >
          <img
            type="img/svg"
            alt="logo_molar"
            width="45px"
            height="45px"
            src={`assets/icons/logo/newLogoMolar.svg`}
            style={{ borderRadius: "20%" }}
          />
          <Typography
            variant="h3"
            color="primary.main"
            fontFamily="Brush Script MT"
            fontWeight="semibold"
            fontSize="40px"
            className=""
          >
            Dental Smile
          </Typography>
        </Box>

        <Typography
          paddingRight="180px"
          variant="h3"
          color="secondary.main"
          fontWeight="bold"
          fontSize="25px"
          fontStyle="italic"
          sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.20)  !important" }}
        >
          {pageActive}
        </Typography>

        <Box display="flex" gap="20px">
          <ButtonCustom
            txt_b_size="15px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort="secondary.main"
            colorth="error.main"
            flexDir="column-reverse"
            txt_b="Salir"
            fontW="bold"
            onClick={handleOpenLogout}
            iconB={<ExitToApp />}
            propsXS={{ boxShadow: "none !important" }}
          />
        </Box>
      </Box>
      <DeleteConfirm
        stateOpen={openDialogLogout}
        setStateOpen={setOpenDialogLogout}
        message={<>¿Desea salir de la aplicación?</>}
        funcionDelete={logout}
      />
    </>
  );
};
