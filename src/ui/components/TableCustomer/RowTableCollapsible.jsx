import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Link,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreVert,
} from "@mui/icons-material";
import { CustomBasicTable } from "../FormInModal/CustomBasicTable";
import { useDataStore } from "../../../hooks";

//
//
//
//

export const RowTableCollapsible = ({
  txt_header,
  row,
  indexRTC,
  selectedUser,
  withCheckbox,
  handleClick,
  filaSeleccionada,
  keys,
  dataOmitida,
  routePaciente,
  iconosEnFila,
  BtnInFila,
  handleOpenMenu,
  titleTablaCollapsed,
  TABLE_HEAD_COLLAPSED,
  propertyCollapsed,
}) => {
  //

  const { changeDataActiva } = useDataStore();

  const [open, setOpen] = useState(true);

  //
  return (
    <>
      {/* fila de la tabla */}
      <TableRow
        hover
        sx={{
          "& > *": {
            // border:"none !important",
            borderTop: indexRTC === 0 ? "" : "2px solid !important",
            borderTopColor: indexRTC === 0 ? "" : "grey !important",
          },
          "&.Mui-selected": {
            backgroundColor: "#E0DAEB !important",
          },
        }}
        tabIndex={-1}
        role="checkbox"
        selected={selectedUser}
        onClick={() => {
          changeDataActiva([txt_header, row]);
        }}
      >
        {withCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={selectedUser}
              onChange={(event) => handleClick(event, filaSeleccionada)}
            />
          </TableCell>
        )}

        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? (
              <KeyboardArrowUp sx={{ color: "primary.main" }} />
            ) : (
              <KeyboardArrowDown sx={{ color: "primary.main" }} />
            )}
          </IconButton>
        </TableCell>

        {/* celdas de los datos */}

        {keys.slice(dataOmitida).map((key, index) => {
          if (key === "paciente" || key === "nombre") {
            return (
              <TableCell key={`${row["id"]}${index}`} align="left">
                <Link
                  component={RouterLink}
                  to={routePaciente(row)}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      cursor: "pointer",
                      color: "secondary.main",
                      fontSize: "15px",
                      fontWeight: "bold",
                      borderRadius: "5px",
                    }}
                  >
                    {row[key]}
                  </Typography>
                </Link>
              </TableCell>
            );
          } else {
            return (
              <TableCell
                sx={{
                  height: "10px",

                  color: "black",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
                key={`${row["id"]}${index}`}
                align="left"
              >
                {row[key]}
              </TableCell>
            );
          }
        })}

        {iconosEnFila ? (
          <TableCell align="center">
            <Box display="flex" flexDirection="row" justifyContent="center">
              <BtnInFila infoRow={row} />
            </Box>
          </TableCell>
        ) : (
          <TableCell align="right">
            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      {/* fila collapsed */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                fontSize="16px"
                fontStyle="italic"
                fontWeight="bold"
                color="blueSecondary.main"
                gutterBottom
                component="div"
              >
                {titleTablaCollapsed}
              </Typography>
              <CustomBasicTable
                table_head={TABLE_HEAD_COLLAPSED}
                table_data={row[propertyCollapsed]}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
