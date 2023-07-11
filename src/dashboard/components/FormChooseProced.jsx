import { forwardRef, useLayoutEffect, useState, useEffect } from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";

import { CloseOutlined } from "@mui/icons-material";

import { CustomAutocomplete } from "../../ui";

import { useProcedStore } from "../../hooks";

//
//
//
//
//

//
const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});

export const FormChooseProced = ({
  openModalForm = false,
  setOpenModalForm,
  positionModalFather,
  changeNomedProced,
}) => {
  //
  //customs hook store
  const {
    titulosList,
    subtitulosList,
    procedWithCodeList,
    dataProcedTS,
    startLoadSubtitulosList,
    startProcedNomenList,
    startProcedNomenListBusq,
    changeSubtitulosList,
    changeDataProcedTS,
  } = useProcedStore();

  //hooks

  const [stateOpenAutocom, setStateOpenAutocom] = useState(false);
  const [stateTitulos, setStateTitulos] = useState({ id: 0, label: "" });
  const [stateSubTitulos, setStateSubTitulos] = useState({ id: 0, label: "" });
  const [stateProcedList, setStateProcedList] = useState({ id: "", label: "" });

  const cerrarModal = () => {
    setStateTitulos({ id: 0, label: "" });
    setStateSubTitulos({ id: 0, label: "" });
    setStateProcedList({ id: "", label: "" });
    setStateOpenAutocom(false);
    setOpenModalForm(false);
    positionModalFather({ left: null });
  };

  //efecto secundario titulos
  useEffect(() => {
    if (stateTitulos.id !== 0) {
      startLoadSubtitulosList(stateTitulos.id);
      startProcedNomenList("titulos", stateTitulos.id);
    } else {
      //no se muestra subtitulos y se muestran todos los procedimientos
      changeSubtitulosList();
    }
    setStateSubTitulos({ id: 0, label: "" });
    setStateProcedList({ id: "", label: "" });
  }, [stateTitulos]);

  //
  //efectos secundarios subtitulos
  useLayoutEffect(() => {
    if (stateSubTitulos.id !== 0) {
      startProcedNomenList("proced", stateSubTitulos.id);
    } else {
      if (stateTitulos.id !== 0) {
        startProcedNomenList("titulos", stateTitulos.id);
      } else {
        // /todo los procedimientos
        startProcedNomenListBusq();
      }
    }
    setStateProcedList({ id: "", label: "" });
  }, [stateSubTitulos]);

  //
  //efectos secundarios lista procedimientos
  useEffect(() => {
    if (stateProcedList.id !== "") {
      changeDataProcedTS(stateProcedList.id);
    }
  }, [stateProcedList]);

  //
  //efecto secundario dataProcedTS
  useEffect(() => {
    if (dataProcedTS) {
      //
      const { nom_tituloProced, subti_Proce } = dataProcedTS[0];

      changeNomedProced({
        codigo: stateProcedList.id,
        procedimiento:
          nom_tituloProced +
          " - " +
          subti_Proce +
          " - " +
          stateProcedList.label,
      });
    }
  }, [dataProcedTS]);

  //
  return (
    <div>
      <Dialog
        maxWidth="md"
        fullWidth
        open={openModalForm}
        onClose={cerrarModal}
        TransitionComponent={Transition}
        keepMounted
        sx={{
          "& .MuiPaper-root": {
            width: "650px",
            height: "600px",
            position: "absolute",
            right: 10,
          },
        }}
      >
        <DialogTitle
          display="flex"
          padding="16px 10px 16px  20px !important"
          flexDirection="row"
          alignItems="center"
          justifyContent="end"
          columnGap="50px"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              fontStyle: "italic",
              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
              color: "black",
            }}
          >
            Nomenclatura de procedimientos odontológicos
          </Typography>
          <IconButton onClick={cerrarModal}>
            <CloseOutlined style={{ fontSize: "25px", color: "black" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            display="flex"
            paddingTop="5px"
            flexDirection="column"
            rowGap="20px"
          >
            <Box display="flex" flexDirection="row" columnGap="20px">
              <CustomAutocomplete
                fullWidth
                options={titulosList}
                value={stateTitulos}
                onChange={(event, newValue) => {
                  newValue !== null
                    ? setStateTitulos(newValue)
                    : setStateTitulos({ id: 0, label: "" });
                }}
                getOptionLabel={(option) => option.label}
                propsTextField={{
                  label: "Título:",
                  placeholder: "Seleccione un título",
                }}
              />
              <CustomAutocomplete
                fullWidth
                options={subtitulosList}
                value={stateSubTitulos}
                onChange={(event, newValue) => {
                  newValue !== null
                    ? setStateSubTitulos(newValue)
                    : setStateSubTitulos({ id: 0, label: "" });
                }}
                getOptionLabel={(option) => option.label}
                propsTextField={{
                  label: "Subtítulo:",
                  placeholder: "Seleccione un subtítulo",
                }}
              />
            </Box>

            <Box display="flex">
              <CustomAutocomplete
                open={stateOpenAutocom}
                onOpen={() => {
                  setStateOpenAutocom(true);
                }}
                fullWidth
                options={procedWithCodeList}
                value={stateProcedList}
                onChange={(event, newValue) => {
                  newValue !== null
                    ? setStateProcedList(newValue)
                    : setStateProcedList({ id: "", label: "" });
                }}
                getOptionLabel={(option) =>
                  option.id.length > 0 ? option.id + " - " + option.label : ""
                }
                propsTextField={{
                  label: "Nomenclatura de procedimiento odontológico:",
                  placeholder: "Seleccione un procedimiento",
                }}
                heightList="340px"
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
