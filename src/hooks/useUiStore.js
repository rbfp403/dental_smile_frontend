import { useDispatch, useSelector } from "react-redux";
import {
  onChangePage,
  onChangeSidebar,
  onChangeHookTabs,
  onChangeHookTabsCons,
  onSavePacienteSidebar,
  onDeletePacienteSidebar,
  onSaveConsultaSidebar,
  onDeleteConsultaSidebar,
} from "../store";

//
//
//

export const useUiStore = () => {
  const dispatch = useDispatch();

  const {
    isSidebarOpen,
    pageActive,
    hookTabs,
    hookTabsCons,
    listaPacienteSidebar,
  } = useSelector((state) => state.ui);

  const changeSidebar = (flag) => {
    dispatch(onChangeSidebar(flag));
  };

  const changePage = () => {
    const { pathname } = window.location;

    if (pathname !== "/auth/login") {
      localStorage.setItem("lastRoute", pathname);
    }
    const pathnameCut = pathname.substring(0, 17);
    let pageActive = "";
    if (pathnameCut.includes("agenda")) {
      pageActive = "Agenda";
    } else if (pathnameCut.includes("pacientes")) {
      pageActive = "Pacientes";
    } else {
      pageActive = "Administración";
    }
    dispatch(onChangePage(pageActive));
  };

  const handleChangeTabs = (newValue) => {
    dispatch(onChangeHookTabs(newValue));
    localStorage.setItem("lastTabPaciente", newValue);
  };

  const handleChangeTabsCons = (newValue) => {
    dispatch(onChangeHookTabsCons(newValue));
    localStorage.setItem("lastTabPacienteCons", newValue);
  };

  const savePacienteSidebar = (paciente) => {
    dispatch(onSavePacienteSidebar(paciente));
  };

  const deletePacienteSidebar = (paciente) => {
    dispatch(onDeletePacienteSidebar(paciente));
  };

  const saveConsultaSidebar = (consulta) => {
    dispatch(onSaveConsultaSidebar(consulta));
  };

  const deleteConsultaSidebar = (consulta) => {
    dispatch(onDeleteConsultaSidebar(consulta));
  };
  //
  return {
    //* Propiedades
    isSidebarOpen,
    pageActive,
    hookTabs,
    hookTabsCons,
    listaPacienteSidebar,

    //* Métodos
    changeSidebar,
    changePage,
    handleChangeTabs,
    handleChangeTabsCons,
    savePacienteSidebar,
    deletePacienteSidebar,
    saveConsultaSidebar,
    deleteConsultaSidebar,
  };
};
