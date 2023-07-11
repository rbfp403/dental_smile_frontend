import { Delete, Edit } from "@mui/icons-material";
import { IconButton, MenuItem, Popover, Typography } from "@mui/material";

//
//

export const CustomPopover = ({
  stateOpen,
  setStateOpen,
  handleCloseMenu,

  funcionBtnTblDelete,
  openModalEdit,
}) => {
  //

  const handleEdit = () => {
    openModalEdit();
    setStateOpen(!stateOpen);
  };

  const handleDelete = () => {
    funcionBtnTblDelete();
    setStateOpen(!stateOpen);
  };
  //
  return (
    <>
      <Popover
        open={Boolean(stateOpen)}
        anchorEl={stateOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <IconButton sx={{ color: "btnHoverInForm.main" }}>
            <Edit />
          </IconButton>
          <Typography
            variant="h7"
            color="btnHoverInForm.main"
            fontWeight="bold"
          >
            Editar
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <IconButton sx={{ color: "error.main" }}>
            <Delete />
          </IconButton>
          <Typography variant="h7" color="error.main" fontWeight="bold">
            Eliminar
          </Typography>
        </MenuItem>
      </Popover>
    </>
  );
};
