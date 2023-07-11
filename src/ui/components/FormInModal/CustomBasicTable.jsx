import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const CustomBasicTable = ({ table_head, table_data }) => {
  return (
    // <Box sx={{ backgroundColor: "white" }}>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {table_head.map((tab_hd) => (
              <TableCell
                key={tab_hd.id}
                align="left"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                {tab_hd.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {table_data.map((row) => {
            const keys = Object.keys(row);
            return (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {keys.slice(1).map((key, index) => (
                  <TableCell
                    key={`${row["id"]}${index}`}
                    align="left"
                    sx={{ fontWeight: "bold" }}
                  >
                    {row[key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    // </Box>
  );
};
