import { useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { MoreVert } from "@mui/icons-material";

import { filter } from "lodash";

import { DataListHead } from "./DataListHead";
import { DataListToolbar } from "./DataListToolbar";
import { Link as RouterLink } from "react-router-dom";
import { CustomPopover } from "./CustomPopover";
import { useDataStore } from "../../../hooks";

//
//
//

//funcion del ordenamiento de registro
function descendingComparator(a, b, orderBy) {
  //columna cuando de la tabla Citas
  const fieldSelect = orderBy === "cuando" ? "fechaHoraCita" : orderBy;

  if (b[fieldSelect] < a[fieldSelect]) {
    return -1;
  }
  if (b[fieldSelect] > a[fieldSelect]) {
    return 1;
  }

  return 0;
}

//funcion del ordenamiento de registro
function getComparator(order, orderBy) {
  return order === "desc"
    ? //estas funciones son las que se ejecutas en applySortFilter
      (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

//aplicar ordenamiento por filtro
function applySortFilter(array, comparator, query, columnaABuscar) {
  // const stabilizedThis = array.map((el, index) => [el, index]);
  const stabilizedThis = array.map((el, index) => {
    // console.log(el.fecha);

    // console.log(new Date(el.fecha));

    // console.log(Date.parse(el.fecha));
    // console.log(new Date(Date.parse(el.fecha)));
    // const fe = new Date(Date.parse(el.fecha));
    // console.log(fe.toLocaleString("sv-SE", { hour12: false }));

    return [el, index];
  });

  //ordeamiento de los datos
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  //cuadro de busqueda recibe texto usamos funcion del lodash
  if (query) {
    const datosBuscados = filter(array, (_user) => {
      const txt_celda = _user[columnaABuscar];

      //si txt_celda existe
      if (txt_celda) {
        //si el tipo de celda es un numero
        if (typeof txt_celda === "number") {
          //lo ingresado el box search es un numero
          if (!isNaN(parseInt(query))) {
            //se muestra resultados mayores o iguales a ese numero
            return txt_celda >= query;
          }
        } else {
          //es texto

          return txt_celda.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        }
      }
    });

    //filtrar datos del resultado de la busqueda
    const datosBuscadosOrd = datosBuscados.map((el, index) => [el, index]);

    datosBuscadosOrd.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return datosBuscadosOrd.map((el) => el[0]);
  }

  //retornar resultados ordenados
  return stabilizedThis.map((el) => el[0]);
}

//
//
//
//
//
//
//COMPONENTE TABLA PERSONALIZADA

export const CustomTable = ({
  TABLE_HEAD,
  DATALIST,
  dataOmitida = 1, // por defecto solo el id
  iconosEnFila = true,
  columnaABuscarPri = "",
  firstOrden = "desc",
  openModalEdit,
  funcionBtnTblDelete,

  /*DataListToolbar */
  withToolbar = true,
  withBoxSearch = true,
  withButton = true,
  withCheckbox = true,
  btnToolbarTable,
  searchWhat = "",
  txt_header,
  bgHeaderColor,
  funcionDeleteVarious,
  bgColorTable = "transparent",
  bgColorPagination = "transparent",
  routePaciente,
  BtnInFila,
}) => {
  //
  //hooks

  //

  const { changeDataActiva } = useDataStore();

  //hook abrir el popOver eliminar y editar
  const [open, setOpen] = useState(null);

  //hook numero de pagina a mostrar
  const [page, setPage] = useState(0);

  //hook  orden de la columna asc or desc
  const [order, setOrder] = useState(firstOrden);

  //hook captura de  la columna seleccionada debe ser una columna con un dato unico
  const [orderBy, setOrderBy] = useState(columnaABuscarPri);

  //hook arreglo de id´s de cada fila selecionada con el checkbox
  const [selected, setSelected] = useState([]);

  //hook text del cuadro de busqueda
  const [filterName, setFilterName] = useState("");

  //hook filas por paginas
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //hooks datos totales
  const [dataTotal, setDataTotal] = useState(DATALIST.length);

  //
  //handlers
  //

  //handler abrir el popover
  const handleOpenMenu = (event) => {
    console.log(event.currentTarget);
    setOpen(event.currentTarget);
  };

  //handler cerrar el popover
  const handleCloseMenu = () => {
    setOpen(null);
  };

  //handler del Filtro por Nombre
  const handleFilterByName = (event) => {
    //setea la pagina a 0
    setPage(0);
    //actualiza el hook con el texto del cuadro de busqueda
    setFilterName(event.target.value);
  };

  //handler cambiar el orden
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(0);
  };

  //handler del checkbox de la fila
  const handleClick = (event, name) => {
    /*

    tener en cuenta que se ejecuta cada vez que se activa el checkbox de la fila, como se puedar un click para seleccionar y deseleccionar se debe controlar aquello

    el name no se encuentra en el array hook selected (-1), es decir es seleccionable

    el name se encuentra en la primera ubicacion del array (0)

    el name se encuentra en la ultima ubicacion del array (selected.length - 1)

    el name se encuentra en cualquier ubicacion del array (> 0)

    */
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];

    //seleccionable
    //concantenamos el array hook selected con el nuevo name
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);

      //se elimina el primer elemento
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));

      //se elimina el ultimo elemento
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));

      //se corta el array antes y despues del indice seleccionado
      //y estas partes se unen
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    //actualizamos el array hook selected
    setSelected(newSelected);
  };

  //handler para actualizar el hook page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //handler para actualizar el hook page y el hook rowsPerPage
  const handleChangeRowsPerPage = (event) => {
    setPage(0);

    setRowsPerPage(parseInt(event.target.value, 10));
  };

  //
  //constantes
  //
  //registros filtrados
  const filteredUsers = applySortFilter(
    DATALIST,
    getComparator(order, orderBy),
    filterName,
    orderBy
  );

  //handle seleccionar todo
  const handleSelectAllClick = (event) => {
    //el checked esta seleccionado
    if (event.target.checked) {
      // const newSelecteds = DATALIST.map((n) => n["id"]);
      const newSelecteds = filteredUsers.map((n) => n["id"]);

      //seleccionamos todos los id
      setSelected(newSelecteds);

      return;
    }
    //se limpia la lista de registros seleccionados si no esta seleccionado el checkbox
    setSelected([]);
  };

  //filas vacias
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - DATALIST.length) : 0;

  //no coincidencias en la busqueda
  const isNotFound = !filteredUsers.length && !!filterName;

  //useEffect para actualizar los registros totales
  useEffect(() => {
    setDataTotal(filteredUsers.length);
  }, [filteredUsers]);

  //
  //
  //
  //

  return (
    <>
      <Box
        sx={{
          bgcolor: bgColorTable,
          width: "100%",
        }}
        //sx={{ padding: 10 }}
      >
        {/* barra toolbar */}

        <DataListToolbar
          numSelected={selected.length}
          selected={selected}
          setSelected={setSelected}
          filterName={filterName}
          onFilterName={handleFilterByName}
          setFilterName={setFilterName}
          orderBy={orderBy}
          /* from PacientesPage */
          withToolbar={withToolbar}
          withBoxSearch={withBoxSearch}
          withButton={withButton}
          BtnToolbarTable={btnToolbarTable}
          searchWhat={searchWhat}
          txt_header={txt_header}
          bgHeaderColor={bgHeaderColor}
          funcionDeleteVarious={funcionDeleteVarious}
        />

        <TableContainer sx={{ overflowX: "initial" }}>
          <Table size="small" stickyHeader>
            {/* Cabecera de las columnas */}

            <DataListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              /* from PacientePage */
              withCheckbox={withCheckbox}
            />

            {/* Cuerpo de Tabla */}

            <TableBody>
              {filteredUsers
                //
                //la razon por la que page inicia con 0
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                //

                .map((row) => {
                  const keys = Object.keys(row);

                  const filaSeleccionada = row["id"];
                  //booleana para saber si el nombre esta en el arreglo de filas seleccionadas
                  //es true si el name esta en el array
                  const selectedUser =
                    selected.indexOf(filaSeleccionada) !== -1;

                  return (
                    /*fila de la tabla*/
                    <TableRow
                      hover
                      sx={{
                        backgroundColor: "white",

                        "&.Mui-selected": {
                          backgroundColor: "#E0DAEB !important",
                        },
                      }}
                      // key={row[keys[0]]}
                      key={row["id"]}
                      tabIndex={-1}
                      role="checkbox"
                      selected={selectedUser}
                      onClick={() => {
                        changeDataActiva([txt_header, row]);
                      }}
                    >
                      {/* celda checkbox */}
                      {withCheckbox && (
                        <TableCell
                          padding="checkbox"
                          sx={{
                            border: "3px solid",
                            borderColor: "colorTable.main",
                          }}
                        >
                          <Checkbox
                            checked={selectedUser}
                            onChange={(event) =>
                              handleClick(event, filaSeleccionada)
                            }
                          />
                        </TableCell>
                      )}
                      {/* celdas de los datos */}

                      {keys.slice(dataOmitida).map((key, index) => {
                        if (key === "paciente" || key === "nombre") {
                          return (
                            <TableCell
                              sx={{
                                border: "3px solid",
                                borderColor: "colorTable.main",
                              }}
                              key={`${row["id"]}${index}`}
                              align="left"
                            >
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
                        } else if (key === "estado") {
                          return (
                            <TableCell
                              sx={{
                                height: "10px",
                                border: "3px solid",
                                borderColor: "colorTable.main",
                              }}
                              key={`${row["id"]}${index}`}
                              align="left"
                            >
                              <Typography
                                sx={{
                                  color:
                                    row[key] === "Perdida"
                                      ? "rgb(183, 33, 54)"
                                      : "rgb(34, 154, 22)",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  padding: "2px",
                                  borderRadius: "3px",
                                  textAlign: "center",
                                  backgroundColor:
                                    row[key] === "Perdida"
                                      ? "rgba(255, 72, 66, 0.16)"
                                      : "rgba(84, 214, 44, 0.16)",
                                }}
                              >
                                {row[key]}
                              </Typography>
                            </TableCell>
                          );
                        } else if (
                          key === "superficies" ||
                          key === "pieza_dental"
                        ) {
                          return (
                            <TableCell
                              sx={{
                                height: "10px",
                                border: "3px solid",
                                borderColor: "colorTable.main",
                              }}
                              key={`${row["id"]}${index}`}
                              align="left"
                            >
                              {row[key].split("%").map((texto, index) => {
                                return (
                                  <Typography
                                    key={index}
                                    sx={{
                                      color:
                                        key === "superficies"
                                          ? texto.includes("redhex")
                                            ? "red"
                                            : "blue"
                                          : "black",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      padding: "2px",
                                      borderRadius: "3px",
                                    }}
                                  >
                                    {texto
                                      .replace("redhex", "")
                                      .replace("bluehex", "")}
                                    {/* {(texto)=>{ let str = texto.replace("redhex", "")}} */}
                                  </Typography>
                                );
                              })}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              sx={{
                                height: "10px",
                                border: "3px solid",
                                borderColor: "colorTable.main",
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
                        <TableCell
                          sx={{
                            border: "3px solid",
                            borderColor: "colorTable.main",
                          }}
                          align="center"
                        >
                          <Box display="flex" flexDirection="row">
                            <BtnInFila infoRow={row} />
                          </Box>
                        </TableCell>
                      ) : (
                        <TableCell
                          sx={{
                            border: "3px solid",
                            borderColor: "colorTable.main",
                          }}
                          align="right"
                        >
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleOpenMenu}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}

              {/* filas vacias */}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  {/* <TableCell> */}
                  <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                    <Box
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Sin resultados
                      </Typography>

                      <Typography variant="body2">
                        No se encontraron resultados para &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                        <br /> Intente verificar errores tipográficos o usar
                        palabras completas.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <TablePagination
          sx={{
            backgroundColor: bgColorPagination,
            fontWeight: "bold",
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataTotal}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <CustomPopover
        stateOpen={open}
        setStateOpen={setOpen}
        handleCloseMenu={handleCloseMenu}
        /** from Paciente Page */
        openModalEdit={openModalEdit}
        funcionBtnTblDelete={funcionBtnTblDelete}
      />
    </>
  );
};
