import { useEffect, useState } from "react";
import { Box, IconButton, Portal, Typography } from "@mui/material";
import {
  CancelOutlined,
  Login,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";

import { useAuthStore } from "../../hooks";

//
//
//
//

export const LoginPage = () => {
  //store
  const { login, errorMsgAuth } = useAuthStore();

  //texfield password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //control alert error
  const [stateSnackbarError, setStateSnackbarError] = useState(false);
  const handleCloseSnackbarError = () => {
    setStateSnackbarError(false);
  };
  const handleOpenSnackbarError = () => {
    setStateSnackbarError(true);
  };

  //evento login
  const handlerLogin = () => {
    if (password.trim().length > 0) {
      login(password);
    }
  };

  //verificar error de login
  useEffect(() => {
    if (errorMsgAuth.msg === "Hay errores") {
      handleOpenSnackbarError();
    }
  }, [errorMsgAuth]);

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.1),rgba(250,250,250, 0.1)) , url(/assets/img/fondos/fondohistory.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Box
        display="flex"
        height="100%"
        minHeight="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
        // paddingRight="70px"
      >
        <Box
          component="div"
          className="animate__animated animate__fadeIn"
          height="500px"
          width="30%"
          display="flex"
          flexDirection="column"
          rowGap="25px"
          alignItems="center"
          justifyContent="center"
          padding="30px"
          sx={{
            backgroundColor: "#f5f7fa",
            borderRadius: "5px",
            boxShadow: "5px 7px 7px rgba(0, 0, 0, 0.6);",
          }}
        >
          <img
            type="img/svg"
            alt="logo_molar"
            width="130px"
            height="130px"
            src={`/assets/icons/logo/newLogoMolar.svg`}
          />
          <div>
            <Typography
              variant="h5"
              color="#602A90"
              fontWeight="bold"
              fontStyle="italic"
              textAlign="center"
            >
              Consultorio Odontológico
            </Typography>
            <Typography
              variant="h3"
              color="#602A90"
              fontFamily="Brush Script MT"
              fontWeight="semibold"
              className="text-shadow"
              textAlign="center"
            >
              "Dental Smile"
            </Typography>
          </div>
          <Typography
            variant="h7"
            color="#602A90"
            fontWeight="bold"
            textAlign="center"
            fontStyle="italic"
          >
            Od. Xiomara Chávez
          </Typography>

          <IconTextField
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            colorIcon="#602A90"
            colorHover="black"
            colorTxt="black"
            colorLabel="#602A90"
            iconEnd={
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
            propsXS={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid",
                  borderColor: "black",
                },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& fieldset": {
                  border: "2px solid",
                  borderColor: "black",
                },
              },
              "& .MuiOutlinedInput-root.Mui-error": {
                "& fieldset": {
                  border: "2px solid",
                  borderColor: "black",
                },
              },
              "&:hover fieldset": {
                borderColor: "black !important ",
              },
            }}
          />

          <ButtonCustom
            txt_b_size="17px"
            altura="40px"
            colorh="#116482"
            colort="white"
            colorf="#602A90"
            colorth="white"
            flexDir="row"
            txt_b="Ingresar"
            fontW="bold"
            onClick={handlerLogin}
            iconB={<Login />}
            propsXS={{ boxShadow: "none !important" }}
          />
        </Box>
      </Box>
      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbarError}
          handleCloseSnackbar={handleCloseSnackbarError}
          title={""}
          message={errorMsgAuth.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </div>
  );
};
