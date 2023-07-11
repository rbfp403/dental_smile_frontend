import { useEffect, useState } from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useOdontogramaStore } from "../../hooks";
import { arrUrlIcons } from "../helpers";

//
//
//
//
//

export const PermanentTooth = ({ numberTooth, flexDir }) => {
  //store
  const {
    toolOdontActiva,
    updateOdontoActual,
    odontogramaActual,
    isUpdatedOdon,
  } = useOdontogramaStore();

  //hooks
  const [stateIdPieza, setStateIdPieza] = useState(null);
  const [stateRecesion, setStateRecesion] = useState(" ");
  const [stateMovilidad, setStateMovilidad] = useState(" ");
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

        // if ([1, 2].includes(piezaDental.oclusal)) {
        setColorOclusal(
          piezaDental.oclusal === 1
            ? "red"
            : piezaDental.oclusal === 2
            ? "blue"
            : "myBgColor.main"
        );
        // } else {
        // }

        setIconOclusal(piezaDental.oclusal === null ? 18 : piezaDental.oclusal);

        setStateMovilidad(
          piezaDental.movilidad === null ? " " : piezaDental.movilidad
        );
        setStateRecesion(
          piezaDental.recesion === null ? " " : piezaDental.recesion
        );

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
        setStateRecesion(" ");
        setStateMovilidad(" ");
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
      colorDistal !== "myBgColor.main" ||
      stateMovilidad !== " " ||
      stateRecesion !== " "
    ) {
      updateOdontoActual({
        id: stateIdPieza,
        numberTooth,
        movilidad: stateMovilidad === " " ? null : stateMovilidad,
        recesion: stateRecesion === " " ? null : stateRecesion,
        oclusal: iconOclusal === 18 ? null : iconOclusal,
        vestibular:
          colorVestibular === "red" ? 1 : colorVestibular === "blue" ? 2 : null,
        mesial: colorMesial === "red" ? 1 : colorMesial === "blue" ? 2 : null,
        lingual:
          colorLingual === "red" ? 1 : colorLingual === "blue" ? 2 : null,
        distal: colorDistal === "red" ? 1 : colorDistal === "blue" ? 2 : null,
      });
    }
  }, [
    iconOclusal,
    colorVestibular,
    colorMesial,
    colorLingual,
    colorDistal,
    stateMovilidad,
    stateRecesion,
  ]);

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
    <Box display="flex" flexDirection={flexDir} rowGap="10px" alignItems="row">
      <Select
        value={stateRecesion}
        onChange={(event) => {
          setStateRecesion(event.target.value);
        }}
        size="small"
        sx={{
          width: "50px",
          height: "25px",
          fontWeight: "bold",
          padding: "3px !important",
          border: "1px solid black",
        }}
        inputProps={{ IconComponent: () => null }}
      >
        {[" ", 1, 2, 3, 4].map((recesion) => {
          return (
            <MenuItem
              key={recesion}
              value={recesion}
              sx={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {recesion}
            </MenuItem>
          );
        })}
      </Select>

      <Select
        value={stateMovilidad}
        onChange={(event) => {
          setStateMovilidad(event.target.value);
        }}
        size="small"
        sx={{
          fontWeight: "bold",
          width: "50px",
          height: "25px",
          padding: "3px !important",
          border: "1px solid black",
        }}
        inputProps={{ IconComponent: () => null }}
      >
        {[" ", 1, 2, 3].map((movilidad) => {
          return (
            <MenuItem
              key={movilidad}
              value={movilidad}
              sx={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {movilidad}
            </MenuItem>
          );
        })}
      </Select>

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
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.main",
        }}
      >
        {/* Centro */}

        <Box
          component="button"
          display="flex"
          sx={{
            position: "absolute",
            width: "30px",
            height: "30px",
            backgroundColor: colorOclusal,
            cursor: "pointer",
            border: "2px solid #602A90  !important",
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
            border: "2px solid #602A90  !important",
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
            border: "2px solid #602A90 !important",
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
            border: "2px solid #602A90 !important",

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
            border: "2px solid #602A90 !important",

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
          }}
        />
      </Box>
    </Box>
  );
};
