import { Box, Typography } from "@mui/material";

export const SimbologiaOdontograma = ({
  title,
  content,
  Icono,
  fnSimbOdon,
  idTool,
}) => {
  const fnClick = () => {
    fnSimbOdon();
  };
  return (
    <>
      <Box
        component="div"
        id={idTool}
        display="flex"
        flexDirection="row"
        onClick={fnClick}
        alignItems="center"
        sx={{
          cursor: "pointer",
          padding: "5px 15px 5px 5px",
        }}
        columnGap="5px"
      >
        <Icono />
        <Box display="flex" flexDirection="column">
          <Typography color="black" fontWeight="bold">
            {title}
          </Typography>
          <Typography color="grey" fontWeight="bold">
            {content}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
