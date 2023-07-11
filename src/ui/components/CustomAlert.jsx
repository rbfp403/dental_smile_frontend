import { Alert, AlertTitle, Grow, Snackbar } from "@mui/material";

export const CustomAlert = ({
  stateSnackbar,
  handleCloseSnackbar,
  title,
  message,
  colorbg,
  colortxt,
  iconAlert,
  hideDuration = 3000,
  posVer = "bottom",
  posHor = "right",
}) => {
  return (
    <Snackbar
      open={stateSnackbar}
      anchorOrigin={{ vertical: posVer, horizontal: posHor }}
      onClose={handleCloseSnackbar}
      autoHideDuration={hideDuration}
      TransitionComponent={Grow}
    >
      <Alert
        onClose={handleCloseSnackbar}
        icon={iconAlert}
        sx={{
          //   width: "100%",
          backgroundColor: colorbg,
          color: colortxt,
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};
