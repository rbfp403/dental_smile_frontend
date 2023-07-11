import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { EditNoteOutlined } from "@mui/icons-material";
import { TbDental } from "react-icons/tb";
import { ButtonCustom, CustomTable } from "../../ui";
import { FormModalNota, FormOdontograma } from "../components";
import { useDataStore, useOdontogramaStore } from "../../hooks";

const TABLE_HEAD_PIEZAS = [
  {
    id: "pieza_dental",
    label: "Pieza dental",
    alignLeft: true,
  },

  { id: "superficies", label: "Superficies", alignLeft: true },
  { id: "movilidad", label: "Movilidad", alignLeft: true },
  { id: "recesion", label: "Recesión", alignLeft: true },
  { id: "nota", label: "Nota", alignLeft: true },
];

//
//
//
//

export const OdontogramaPage = () => {
  //store

  const { dataActiva } = useDataStore();

  const { piezasListOdon, onChangePiezaActiva } = useOdontogramaStore();

  //hook abrir el formulario
  const [stateModalOdonto, setStateModalOdonto] = useState(false);

  //hook abrir pieza
  const [stateModalPieza, setStateModalPieza] = useState(false);

  //efecto secundario carga la data de la tabla a la pieza activa
  useEffect(() => {
    if (dataActiva[0] === "Odontograma") {
      onChangePiezaActiva(dataActiva[1]);
    }
  }, [dataActiva]);

  //abriendo el odontograma
  const openModalFormOdon = () => {
    setStateModalOdonto(true);
  };

  //abrir modal nota
  const opendModalNota = () => {
    setStateModalPieza(true);
  };

  //eliminar pieza dental
  const deletePiezaDental = () => {};

  const BtnToolbarTable = () => {
    return (
      <ButtonCustom
        altura="45px"
        txt_b_size="14px"
        flexDir="column-reverse"
        colorf="transparent"
        colorh="transparent"
        colort="white"
        colorth="celesteNeon.main"
        txt_b="Abrir Odontograma"
        fontW="bold"
        iconB={<TbDental />}
        propsXS={{ boxShadow: "none !important" }}
        onClick={openModalFormOdon}
      />
    );
  };

  const BtnInFila = ({ infoRow }) => {
    return (
      <ButtonCustom
        txt_b_size="13px"
        altura="35px"
        colorf="transparent"
        colorh="transparent"
        colort="blueSecondary.main"
        colorth="primary.main"
        flexDir="column-reverse"
        txt_b="Editar Nota"
        fontW="bold"
        onClick={opendModalNota}
        iconB={<EditNoteOutlined />}
        propsXS={{ boxShadow: "none !important" }}
      />
    );
  };
  return (
    <>
      <Box
        component="div"
        className="animate__animated animate__fadeInUp animate__faster"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <CustomTable
          txt_header="Odontograma"
          TABLE_HEAD={TABLE_HEAD_PIEZAS}
          DATALIST={piezasListOdon}
          withToolbar
          withCheckbox={false}
          iconosEnFila
          columnaABuscarPri="pieza_dental"
          firstOrden="asc"
          bgColorPagination="white"
          bgColorTable="rgba(255,255,255,0.8)"
          btnToolbarTable={BtnToolbarTable}
          BtnInFila={BtnInFila}
        />
      </Box>
      <FormOdontograma
        openModal={stateModalOdonto}
        setOpenModal={setStateModalOdonto}
      />

      <FormModalNota
        openModal={stateModalPieza}
        setOpenModal={setStateModalPieza}
      />
      {/* <DeleteConfirm
          stateOpen={openConfirmDelOdon}
          setStateOpen={setOpenConfirmDelOdon}
          message={`¿Está segura que desea la pieza dental`}
          funcionDelete={deletePiezaDental}
        /> */}
    </>
  );
};
