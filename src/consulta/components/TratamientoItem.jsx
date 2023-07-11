import { useState } from "react";
import { Box } from "@mui/material";
import { DeleteOutlined, EditNoteOutlined } from "@mui/icons-material";
import { ButtonCustom, CustomBasicTable, DeleteConfirm } from "../../ui";
import { useTratamientosStore } from "../../hooks";
import {
  formatearDataCompliToTable,
  formatearDataPrescToTable,
  formatearDataProcedTratamToTable,
  formatearDataTratamToTable,
} from "../helpers";

const TABLE_HEAD_TRATAM = [
  { id: "tratamiento", label: "Tratamiento" },
  { id: "codigo_CIE", label: "Código CIE" },
  { id: "enfermedad", label: "Enfermedad" },
  { id: "fecha", label: "Fecha" },
];
const TABLE_HEAD_COMPLI = [{ id: "complicaciones", label: "Complicaciones" }];
const TABLE_HEAD_PROCED = [
  { id: "codigo_proced", label: "Código" },

  { id: "procedimiento", label: "Procedimientos" },
];
const TABLE_HEAD_PRESC = [
  { id: "prescripcion", label: "Prescripciones" },
  { id: "dosis", label: "Dosis" },
];

//
//
//

export const TratamientoItem = ({ dataTratam, fnOpenFormEdit }) => {
  //

  const [openDialogDeleteTratam, setOpenDialogDeleteTratam] = useState(false);

  const { changeDataTratam, startDeletingTratamiento } = useTratamientosStore();

  const handleOpenFormTratam = () => {
    changeDataTratam(dataTratam);
    fnOpenFormEdit();
  };

  const handleOpenFormDeleteTratam = () => {
    changeDataTratam(dataTratam);
    setOpenDialogDeleteTratam(true);
  };

  const deleteTratam = () => {
    //eliminar tratamiento
    startDeletingTratamiento();
  };
  //
  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap="20px"
      padding="10px"
      sx={{
        backgroundColor: "white",
      }}
    >
      <Box display="flex" flexDirection="row">
        <Box width="80%">
          <CustomBasicTable
            table_head={TABLE_HEAD_TRATAM}
            table_data={formatearDataTratamToTable([dataTratam])}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          padding="10px"
          justifyContent="end"
          width="20%"
        >
          <ButtonCustom
            txt_b_size="14px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort="blueSecondary.main"
            colorth="primary.main"
            flexDir="column-reverse"
            txt_b="Editar"
            fontW="bold"
            onClick={handleOpenFormTratam}
            iconB={<EditNoteOutlined />}
            propsXS={{ boxShadow: "none !important" }}
          />
          <ButtonCustom
            txt_b_size="14px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort="error.main"
            colorth="primary.main"
            flexDir="column-reverse"
            txt_b="Eliminar"
            fontW="bold"
            onClick={handleOpenFormDeleteTratam}
            iconB={<DeleteOutlined />}
            propsXS={{ boxShadow: "none !important" }}
          />
        </Box>
      </Box>

      {dataTratam.complicaciones.length > 0 && (
        <CustomBasicTable
          table_head={TABLE_HEAD_COMPLI}
          table_data={formatearDataCompliToTable(dataTratam.complicaciones)}
        />
      )}

      {dataTratam.procedimientos.length > 0 && (
        <CustomBasicTable
          table_head={TABLE_HEAD_PROCED}
          table_data={formatearDataProcedTratamToTable(
            dataTratam.procedimientos
          )}
        />
      )}

      {dataTratam.prescripciones.length > 0 && (
        <CustomBasicTable
          table_head={TABLE_HEAD_PRESC}
          table_data={formatearDataPrescToTable(dataTratam.prescripciones)}
        />
      )}
      <DeleteConfirm
        stateOpen={openDialogDeleteTratam}
        setStateOpen={setOpenDialogDeleteTratam}
        message={`¿Está segura que desea eliminar el tratamiento?`}
        funcionDelete={deleteTratam}
      />
    </Box>
  );
};
