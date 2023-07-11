import {
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  Grid,
} from "@mui/material";

// ----------------------------------------------------------------------

export const DataListHead = ({
  order,
  orderBy,
  headLabel,
  onRequestSort,
  onSelectAllClick,
  withCollapse = false,
  withCheckbox = true,
}) => {
  // funcion que retorna funcion
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/**checkbox */}
        {withCheckbox && (
          <TableCell
            sx={{
              borderRight: "3px solid white",
              bgcolor: "colorTable.main",
            }}
            padding="checkbox"
          >
            <Checkbox onChange={onSelectAllClick} />
          </TableCell>
        )}
        {withCollapse && (
          <TableCell
            sx={{
              borderRight: "3px solid white",
              bgcolor: "colorTable.main",
            }}
          ></TableCell>
        )}
        {/** headers */}

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              padding: "0",
              margin: "0",
              bgcolor: "colorTable.main",
              color: "primary.light",
              borderLeft: "3px solid white",
              borderRight: "3px solid white",
            }}
          >
            <Grid
              display="grid"
              padding="5px"
              container
              flexDirection="column"
              justifyItems={headCell.alignLeft ? "start" : "center"}
            >
              <Grid item sx={{ width: "80%" }}>
                <TableSortLabel
                  hideSortIcon
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              </Grid>
              <Grid item sx={{ width: "20%" }}>
                <span
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    color: "black",
                  }}
                >
                  {orderBy === headCell.id ? (
                    order
                  ) : (
                    <span style={{ visibility: "hidden" }}>""</span>
                  )}
                </span>
              </Grid>
            </Grid>
          </TableCell>
        ))}

        <TableCell
          align="right"
          sx={{
            height: "10px",
            bgcolor: "colorTable.main",
            borderLeft: "3px solid white",
          }}
        ></TableCell>
      </TableRow>
    </TableHead>
  );
};
