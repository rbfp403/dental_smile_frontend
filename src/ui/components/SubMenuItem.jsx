import { useNavigate } from "react-router-dom";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { AiFillFolderOpen } from "react-icons/ai";
import { TbDental } from "react-icons/tb";
import { useUiStore } from "../../hooks";
import { invertDateFormat } from "../../agenda/helpers/formatedDataCite";

//
//
//

export const SubMenuItem = ({ title, to, arrCons }) => {
  //
  const navigate = useNavigate();

  const { deletePacienteSidebar, deleteConsultaSidebar } = useUiStore();

  const onClickPaciente = () => {
    navigate("pacientes");
    setTimeout(() => {
      navigate("pacientes/" + to + "/historial");
    }, 10);
  };

  const onClickConsulta = (id) => {
    navigate("pacientes");
    setTimeout(() => {
      navigate("pacientes/" + to + "/historial/" + id);
    }, 10);
  };

  const deletePaciente = () => {
    deletePacienteSidebar({ to });
  };

  const deleteConsulta = (id) => {
    deleteConsultaSidebar({ id_pac: to, id_con: id });
  };

  return (
    <>
      <IconButton
        sx={{ color: "#562682", position: "absolute" }}
        onClick={deletePaciente}
      >
        <Close
          sx={{
            fontSize: "17px",
            ":hover": {
              color: "white",
            },
          }}
        />
      </IconButton>

      <SubMenu
        title={title}
        style={{
          marginLeft: "15px",
        }}
        icon={
          <IconButton onClick={onClickPaciente} sx={{ color: "#3a1956" }}>
            <AiFillFolderOpen />
          </IconButton>
        }
      >
        {arrCons.map((cons) => {
          return (
            <div key={cons.id}>
              <IconButton
                key={cons.id}
                sx={{
                  color: "#562682",
                  position: "absolute",
                }}
                onClick={() => {
                  deleteConsulta(cons.id);
                }}
              >
                <Close
                  sx={{
                    fontSize: "17px",
                    ":hover": {
                      color: "white",
                    },
                  }}
                />
              </IconButton>

              <MenuItem
                style={{
                  color: "#562682",
                  fontWeight: "bold",
                  marginLeft: "15px",
                }}
                key={cons.id}
                icon={
                  <IconButton sx={{ color: "#562682" }}>
                    <TbDental />
                  </IconButton>
                }
                onClick={() => {
                  onClickConsulta(cons.id);
                }}
              >
                <Typography sx={{ color: "#562682", fontWeight: "bold" }}>
                  {invertDateFormat(cons.text)}
                </Typography>
                <Typography
                  sx={{
                    color: "#562682",
                    fontWeight: "bold",
                  }}
                >
                  {cons.text2}
                </Typography>
              </MenuItem>
            </div>
          );
        })}
      </SubMenu>
    </>
  );
};
