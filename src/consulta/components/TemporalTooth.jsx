import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useOdontogramaStore } from "../../hooks";
import { arrUrlIcons } from "../helpers";

//
//
//
//

export const TemporalTooth = ({ numberTooth, flexDir }) => {
  //store
  const {
    toolOdontActiva,
    updateOdontoActual,
    odontogramaActual,
    isUpdatedOdon,
  } = useOdontogramaStore();

  //hooks
  const [stateIdPieza, setStateIdPieza] = useState(null);
  const [iconOclusal, setIconOclusal] = useState(null);
  const [colorOclusal, setColorOclusal] = useState("myBgColor.main");
  const [colorVestibular, setColorVestibular] = useState("myBgColor.main");
  const [colorMesial, setColorMesial] = useState("myBgColor.main");
  const [colorLingual, setColorLingual] = useState("myBgColor.main");
  const [colorDistal, setColorDistal] = useState("myBgColor.main");

  useEffect(() => {
    if (isUpdatedOdon) {
      //obtener pieza
      const piezaDental = odontogramaActual.piezas.find(
        (pieza) => pieza.numberTooth === numberTooth
      );

      if (piezaDental !== undefined) {
        setStateIdPieza(piezaDental.id);

        setColorOclusal(
          piezaDental.oclusal === 1
            ? "red"
            : piezaDental.oclusal === 2
            ? "blue"
            : "myBgColor.main"
        );

        setIconOclusal(piezaDental.oclusal === null ? 18 : piezaDental.oclusal);

        setColorVestibular(
          piezaDental.vestibular === null
            ? "myBgColor.main"
            : piezaDental.vestibular === 1
            ? "red"
            : "blue"
        );

        setColorMesial(
          piezaDental.mesial === null
            ? "myBgColor.main"
            : piezaDental.mesial === 1
            ? "red"
            : "blue"
        );

        setColorLingual(
          piezaDental.lingual === null
            ? "myBgColor.main"
            : piezaDental.lingual === 1
            ? "red"
            : "blue"
        );

        setColorDistal(
          piezaDental.distal === null
            ? "myBgColor.main"
            : piezaDental.distal === 1
            ? "red"
            : "blue"
        );
      } else {
        setStateIdPieza(null);
        setColorOclusal("myBgColor.main");
        setIconOclusal(null);
        setColorVestibular("myBgColor.main");
        setColorMesial("myBgColor.main");
        setColorLingual("myBgColor.main");
        setColorDistal("myBgColor.main");
      }
    }
  }, [isUpdatedOdon]);

  useEffect(() => {
    if (
      iconOclusal !== null ||
      colorVestibular !== "myBgColor.main" ||
      colorMesial !== "myBgColor.main" ||
      colorLingual !== "myBgColor.main" ||
      colorDistal !== "myBgColor.main"
    ) {
      updateOdontoActual({
        id: stateIdPieza,
        numberTooth,
        movilidad: null,
        recesion: null,
        oclusal: iconOclusal === 18 ? null : iconOclusal,
        vestibular:
          colorVestibular === "red" ? 1 : colorVestibular === "blue" ? 2 : null,
        mesial: colorMesial === "red" ? 1 : colorMesial === "blue" ? 2 : null,
        lingual:
          colorLingual === "red" ? 1 : colorLingual === "blue" ? 2 : null,
        distal: colorDistal === "red" ? 1 : colorDistal === "blue" ? 2 : null,
      });
    }
  }, [iconOclusal, colorVestibular, colorMesial, colorLingual, colorDistal]);

  const changeColorOclusal = () => {
    if (toolOdontActiva === 1) {
      setColorOclusal("red");
    } else if (toolOdontActiva === 2) {
      setColorOclusal("blue");
    } else {
      setColorOclusal("myBgColor.main");
    }
    setIconOclusal(toolOdontActiva);

    //pieza perdida se eliminan las otras caras
    if (toolOdontActiva === 6 || toolOdontActiva === 7) {
      setColorVestibular("myBgColor.main");
      setColorMesial("myBgColor.main");
      setColorLingual("myBgColor.main");
      setColorDistal("myBgColor.main");
    }
  };

  const changeColorVestibular = () => {
    if (iconOclusal !== 6 && iconOclusal !== 7) {
      if (toolOdontActiva === 1) {
        setColorVestibular("red");
      } else if (toolOdontActiva === 2) {
        setColorVestibular("blue");
      } else {
        setColorVestibular("myBgColor.main");
      }
    }
  };

  const changeColorMesial = () => {
    if (iconOclusal !== 6 && iconOclusal !== 7) {
      if (toolOdontActiva === 1) {
        setColorMesial("red");
      } else if (toolOdontActiva === 2) {
        setColorMesial("blue");
      } else {
        setColorMesial("myBgColor.main");
      }
    }
  };

  const changeColorLingual = () => {
    if (iconOclusal !== 6 && iconOclusal !== 7) {
      if (toolOdontActiva === 1) {
        setColorLingual("red");
      } else if (toolOdontActiva === 2) {
        setColorLingual("blue");
      } else {
        setColorLingual("myBgColor.main");
      }
    }
  };

  const changeColorDistal = () => {
    if (iconOclusal !== 6 && iconOclusal !== 7) {
      if (toolOdontActiva === 1) {
        setColorDistal("red");
      } else if (toolOdontActiva === 2) {
        setColorDistal("blue");
      } else {
        setColorDistal("myBgColor.main");
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={flexDir}
      rowGap="3px"
      alignItems="row"
      sx={{}}
    >
      <Typography
        sx={{
          fontStyle: "italic",
          fontWeight: "bold",
          textAlign: "center",
          color: "primary.main",
        }}
      >
        {numberTooth}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "54px",
          height: "54px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.main",
          borderRadius: "50%",
          clipPath: "circle(50% at 50% 50%)",
          border: "2px solid #602A90 !important",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "50%",
            clipPath: "circle(50% at 50% 50%)",
          }}
        >
          {/* Centro */}
          <Box
            component="button"
            sx={{
              position: "absolute",
              width: "30px",
              height: "30px",
              backgroundColor: colorOclusal,
              border: "2px solid #602A90 !important",
              borderRadius: "50%",
              clipPath: "circle(50% at 50% 50%)",
              cursor: "pointer",
              ":hover": {
                backgroundColor:
                  colorOclusal === "myBgColor.main" &&
                  (toolOdontActiva === 1 || toolOdontActiva === 2)
                    ? "rgba(255,255,255,0.3)"
                    : "",
              },
              zIndex: 1,
              alignItems: "center",
            }}
            onClick={({}) => {
              changeColorOclusal();
              console.log("Oclusal/Incisal");
            }}
          >
            {![null, 1, 2, 18].includes(iconOclusal) ? (
              <img
                type="img/svg"
                width="25px"
                height="25px"
                src={`/assets/icons/iconosOdontograma/${arrUrlIcons[iconOclusal]}.svg`}
              />
            ) : (
              <></>
            )}
          </Box>

          {/* Cara frontal */}

          <Box
            component="button"
            sx={{
              position: "absolute",
              width: "100%",
              height: "50px",
              top: 0,
              clipPath: "polygon(75% 25%, 25% 25%, 0 0, 100% 0)",
              backgroundColor: colorVestibular,

              border: "none !important",
              cursor: "pointer",
              ":hover": {
                backgroundColor:
                  colorVestibular === "myBgColor.main" &&
                  (toolOdontActiva === 1 || toolOdontActiva === 2)
                    ? "rgba(255,255,255,0.3)"
                    : "",
              },
            }}
            onClick={() => {
              changeColorVestibular();
              console.log("Vestibular");
            }}
          />

          {/* Cara derecha desde la vista del odont. */}

          <Box
            component="button"
            sx={{
              position: "absolute",
              width: "50px",
              height: "100%",
              right: 0,
              clipPath: "polygon(75% 71%, 75% 29%, 100% 4%, 100% 96%)",
              backgroundColor: colorMesial,
              // border: "2px solid #602A90 !important",
              border: "none !important",
              cursor: "pointer",
              ":hover": {
                backgroundColor:
                  colorMesial === "myBgColor.main" &&
                  (toolOdontActiva === 1 || toolOdontActiva === 2)
                    ? "rgba(255,255,255,0.3)"
                    : "",
              },
            }}
            onClick={() => {
              changeColorMesial();
              console.log("Mesial");
            }}
          />

          {/* Cara posterior */}

          <Box
            component="button"
            sx={{
              position: "absolute",
              height: "50px",
              width: "100%",
              bottom: 0,
              clipPath: "polygon(25% 75%, 75% 75%, 100% 100%, 0% 100%)",
              backgroundColor: colorLingual,
              // border: "2px solid #602A90 !important",
              border: "none !important",
              cursor: "pointer",
              ":hover": {
                backgroundColor:
                  colorLingual === "myBgColor.main" &&
                  (toolOdontActiva === 1 || toolOdontActiva === 2)
                    ? "rgba(255,255,255,0.3)"
                    : "",
              },
            }}
            onClick={() => {
              changeColorLingual();
              console.log("Palatina/Lingual");
            }}
          />
          {/*   Cara izquierda desde la vista del odont. */}

          <Box
            component="button"
            sx={{
              position: "absolute",
              width: "50px",
              height: "100%",
              left: 0,
              clipPath: "polygon(25% 29%, 25% 71%, 0 96%, 0 4%)",
              backgroundColor: colorDistal,

              // border: "2px solid #602A90 !important",
              border: "none !important",
              cursor: "pointer",

              ":hover": {
                backgroundColor:
                  colorDistal === "myBgColor.main" &&
                  (toolOdontActiva === 1 || toolOdontActiva === 2)
                    ? "rgba(255,255,255,0.3)"
                    : "",
              },
            }}
            onClick={() => {
              changeColorDistal();
              console.log("Distal");
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
