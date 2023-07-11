import { createTheme } from "@mui/material";
import { esES } from "@mui/material/locale";

export const purpleTheme = createTheme(
  {
    palette: {
      mode: "light",
      primary: {
        main: "#602A90",
      },
      secondary: {
        main: "#9c27b0",
      },
      error: {
        main: "#d32f2f",
      },
      warning: {
        main: "#ed6c02",
      },
      info: {
        main: "#0288d1",
      },
      success: {
        main: "#2e7d32",
      },

      backgroundSidebar: {
        main: "#F2F0F0",
      },

      colorIconMolar: {
        main: "#3a1d64",
      },

      myBgColor: {
        main: "#f5f7fa",
      },

      colorTable: {
        main: "#f4f6f8",
      },

      btnHoverInForm: {
        main: "#116482",
      },

      blueSecondary: {
        main: "#116482",
      },

      celesteNeon: {
        main: "#02ECEE",
      },
    },
  },
  esES
);
