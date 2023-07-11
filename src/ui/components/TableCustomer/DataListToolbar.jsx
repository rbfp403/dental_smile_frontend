import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  IconButton,
  Typography,
  OutlinedInput,
  Box,
} from "@mui/material";

import { Close, DeleteSharp } from "@mui/icons-material";

import { DeleteConfirm } from "../FormInModal/DeleteConfirm";

// component

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 70,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

/** cuadro de busqueda */
const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  height: 40,
  width: 320,
  backgroundColor: "colorTable.main",
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),

  "&.Mui-focused": {
    width: 340,
    boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

export const DataListToolbar = ({
  numSelected,
  selected,
  setSelected,
  filterName,
  onFilterName,
  setFilterName,
  orderBy,
  withToolbar,
  withBoxSearch,
  withButton,
  BtnToolbarTable,
  searchWhat,
  txt_header,
  bgHeaderColor = "primary.main",
  funcionDeleteVarious,
}) => {
  const [showBusqText, setShowBusqText] = useState(false);

  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

  const deleteVarious = () => {
    funcionDeleteVarious(selected);
    setSelected([]);
  };

  return (
    withToolbar && (
      <>
        <StyledRoot
          sx={{
            backgroundColor: bgHeaderColor,

            ...(numSelected > 0 && {
              color: bgHeaderColor === "primary.main" ? "white" : "black",
            }),
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography
              className="text-shadow"
              variant="h6"
              sx={{
                color: bgHeaderColor === "primary.main" ? "white" : "black",
              }}
            >
              {txt_header}
            </Typography>
            <Typography
              visibility={!showBusqText && "hidden"}
              variant="p"
              fontSize="12px"
              sx={{
                color:
                  bgHeaderColor === "primary.main"
                    ? "colorTable.main"
                    : "black",
              }}
            >
              Buscando por
              <span style={{ textTransform: "capitalize" }}>
                {" " + orderBy}
              </span>
            </Typography>
          </Box>

          {numSelected > 0 ? (
            <Box display="flex" gap="15px" alignItems="center">
              <Typography component="div" variant="subtitle1">
                {numSelected}{" "}
                {numSelected > 1 ? "seleccionados" : "seleccionado"}
              </Typography>
              <IconButton onClick={handleOpenDialogDel}>
                <DeleteSharp
                  sx={{
                    color: bgHeaderColor === "primary.main" ? "white" : "black",
                  }}
                  fontSize="medium"
                />
              </IconButton>

              <DeleteConfirm
                message={
                  <>
                    ¿Está segura que desea eliminar
                    {numSelected > 1
                      ? ` los ${numSelected} registros seleccionados?`
                      : ` el registro seleccionado?`}
                  </>
                }
                stateOpen={openDialogDelete}
                setStateOpen={setOpenDialogDelete}
                funcionDelete={deleteVarious}
              />
            </Box>
          ) : (
            <>
              <Box display="flex" gap="30px" alignItems="center">
                {withBoxSearch && (
                  <Box display="flex" flexDirection="column" gap="3px">
                    <StyledSearch
                      sx={{
                        backgroundColor:
                          bgHeaderColor === "primary.main"
                            ? "colorTable.main"
                            : "primary.main",
                        // ":hover": {
                        //   width: 380,
                        //   backgroundColor:
                        //     bgHeaderColor === "primary.main"
                        //       ? "white"
                        //       : "secondary.main",
                        //   boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                        // },
                        input: {
                          color:
                            bgHeaderColor === "primary.main"
                              ? "black"
                              : "white",
                          "&::placeholder": { opacity: 1 },
                        },
                      }}
                      onClick={() => {
                        setShowBusqText(true);
                      }}
                      onBlur={() => {
                        setShowBusqText(false);
                      }}
                      value={filterName}
                      onChange={onFilterName}
                      placeholder={searchWhat}
                      endAdornment={
                        <IconButton
                          sx={{
                            visibility:
                              filterName.length > 0 ? "visible" : "hidden",
                          }}
                          onClick={() => setFilterName("")}
                        >
                          <Close
                            sx={{
                              color:
                                bgHeaderColor === "primary.main"
                                  ? "black"
                                  : "white",
                            }}
                          />
                        </IconButton>
                      }
                    />
                  </Box>
                )}

                {withButton && <BtnToolbarTable />}
              </Box>
            </>
          )}
        </StyledRoot>
      </>
    )
  );
};
