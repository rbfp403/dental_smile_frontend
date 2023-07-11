import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { FaTooth } from "react-icons/fa";
import { ButtonCustom } from "../../ui";
import { FormModalTratam, TratamientoItem } from "../components";
import { useTratamientosStore } from "../../hooks";

//
//
//
export const TratamientoConsultaPage = () => {
  //store

  const { tratamientosList } = useTratamientosStore();

  //hook abrir el formulario

  const [stateModalFormTratam, setStateModalFormTratam] = useState(false);

  //hook cambiar titulo del formulario

  const [titleFormTratam, setTitleFormTratam] = useState("");

  //abrir el modal para crear un diagnostico

  const openModalFormTratam = () => {
    setStateModalFormTratam(true);
    setTitleFormTratam("Registrar tratamiento");
    // changeDataDiag(null);
  };

  //abrir el modal para editar un diagnostico

  const openModalTratamEdit = () => {
    setStateModalFormTratam(true);
    setTitleFormTratam("Editar tratamiento");
  };

  //
  return (
    <Box
      component="div"
      className="animate__animated animate__fadeInUp animate__faster"
      sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
    >
      {/* Tratamientos */}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "15px",
            backgroundColor: "primary.main",
            color: "white",
            padding: "10px 20px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Tratamientos
          </Typography>
          <ButtonCustom
            altura="40px"
            txt_b_size="14px"
            flexDir="column-reverse"
            colorf="transparent"
            colorh="transparent"
            colort="white"
            colorth="celesteNeon.main"
            txt_b="Agregar"
            fontW="bold"
            iconB={<FaTooth />}
            propsXS={{ boxShadow: "none !important" }}
            onClick={openModalFormTratam}
          />
        </Box>
        <Box display="flex" flexDirection="column" rowGap="20px">
          {tratamientosList.length === 0 ? (
            <Typography variant="h6" padding="10px">
              Sin tratamientos
            </Typography>
          ) : (
            tratamientosList.map((tratam) => (
              <TratamientoItem
                key={tratam.id_tratam}
                dataTratam={tratam}
                fnOpenFormEdit={openModalTratamEdit}
              />
            ))
          )}
        </Box>
      </Box>

      <FormModalTratam
        openModal={stateModalFormTratam}
        setOpenModal={setStateModalFormTratam}
        title={titleFormTratam}
      />
    </Box>
  );
};
