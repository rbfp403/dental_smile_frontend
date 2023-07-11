import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { RadioGroupCustom } from "../../ui";
import { useSaludBucalStore } from "../../hooks";

//
//
//
//
export const RowSaludBucal = ({ piezasList }) => {
  //

  //store
  const { updateSaludBActual, isUpdatedSB, saludBucalActual } =
    useSaludBucalStore();

  //hook
  const [stateIdPieza, setStateIdPieza] = useState(null);
  const [statePieza, setStatePieza] = useState("");
  const [statePlaca, setStatePlaca] = useState(0);
  const [stateCalculo, setStateCalculo] = useState(0);
  const [stateGingivitis, setStateGingivitis] = useState(0);

  const [blockSelects, setBlockSelects] = useState(false);

  useEffect(() => {
    if (statePieza === "Ausente" || statePieza === "") {
      setStatePlaca(0);
      setStateCalculo(0);
      setStateGingivitis(0);
      setBlockSelects(true);
    } else {
      setBlockSelects(false);
    }
  }, [statePieza]);

  useEffect(() => {
    if (isUpdatedSB) {
      //obtener pieza
      const piezaDental = saludBucalActual.piezas.find(
        (pieza) => pieza.fila === piezasList.fila
      );

      if (piezaDental !== undefined) {
        setStateIdPieza(piezaDental.id);
        setStatePieza(piezaDental.pieza);
        setStatePlaca(piezaDental.placa);
        setStateCalculo(piezaDental.calculo);
        setStateGingivitis(piezaDental.gingivitis);
      }
    } else {
      setStateIdPieza(null);
      setStatePieza("");
      setStatePlaca(0);
      setStateCalculo(0);
      setStateGingivitis(0);
    }
  }, [isUpdatedSB]);

  useEffect(() => {
    updateSaludBActual({
      id: stateIdPieza,
      fila: piezasList.fila,
      pieza: statePieza,
      placa: statePlaca,
      calculo: stateCalculo,
      gingivitis: stateGingivitis,
    });
  }, [statePieza, statePlaca, stateCalculo, stateGingivitis]);

  return (
    <>
      <RadioGroupCustom
        radioOptions={piezasList.piezas}
        hookRadio={statePieza}
        setHookRadio={setStatePieza}
        fontSzlbl="15px"
        colorTxt="black"
        fontw="bold"
        styleRadioGroup={{
          display: "flex",
          flexWrap: "nowrap",

          "& .MuiFormControlLabel-root > .MuiButtonBase-root": {
            padding: "0px 10px",
          },
        }}
      />
      <Select
        disabled={blockSelects}
        value={statePlaca}
        onChange={(event) => {
          setStatePlaca(event.target.value);
        }}
        size="small"
        sx={{
          fontWeight: "bold",
          width: "50px",
          height: "25px",
          padding: "3px !important",
        }}
        inputProps={{ IconComponent: () => null }}
      >
        {[0, 1, 2, 3].map((item) => {
          return (
            <MenuItem
              key={item}
              value={item}
              sx={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {item}
            </MenuItem>
          );
        })}
      </Select>

      <Select
        disabled={blockSelects}
        value={stateCalculo}
        onChange={(event) => {
          setStateCalculo(event.target.value);
        }}
        size="small"
        sx={{
          fontWeight: "bold",
          width: "50px",
          height: "25px",
          padding: "3px !important",
        }}
        inputProps={{ IconComponent: () => null }}
      >
        {[0, 1, 2, 3].map((item) => {
          return (
            <MenuItem
              key={item}
              value={item}
              sx={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {item}
            </MenuItem>
          );
        })}
      </Select>

      <Select
        disabled={blockSelects}
        value={stateGingivitis}
        onChange={(event) => {
          setStateGingivitis(event.target.value);
        }}
        size="small"
        sx={{
          fontWeight: "bold",
          width: "50px",
          height: "25px",
          padding: "3px !important",
        }}
        inputProps={{ IconComponent: () => null }}
      >
        {[0, 1].map((item) => {
          return (
            <MenuItem
              key={item}
              value={item}
              sx={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
