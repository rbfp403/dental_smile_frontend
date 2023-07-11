import { useDispatch, useSelector } from "react-redux";
import {
  createAntecedente,
  deleteAntecedente,
  getAntecedentes,
  updateAntecedente,
} from "../api/pacientes.api";
import {
  changeRegisterErrorAnte,
  clearErrorMessageAnte,
  onDeleteAntecedente,
  onLoadAntecActivo,
  onLoadAntecedentes,
  onSaveAntecedente,
  onUpdateAntecedente,
} from "../store";
import {
  comprobarErrorAnteced,
  formatearDataAntecedToTable,
} from "../pacientes/helpers";

//
//
//

export const useAntecedenteStore = () => {
  //

  const dispatch = useDispatch();

  const {
    antecedentes,
    antecedenteActivo,
    errorRegAntecedente,
    pacienteActivo,
  } = useSelector((state) => state.pacientes);

  const changeDataAntecedente = (dataAnt) => {
    dispatch(onLoadAntecActivo(dataAnt));
  };

  const startLoadAntecedentes = async (id_pac) => {
    try {
      const { data: dataP } = await getAntecedentes(id_pac, "personales");
      const { data: dataF } = await getAntecedentes(id_pac, "familiares");

      dispatch(
        onLoadAntecedentes([
          formatearDataAntecedToTable(dataP),
          formatearDataAntecedToTable(dataF),
        ])
      );
    } catch (error) {
      console.log("Error cargando lista de pacientes", error);
      dispatch(onLoadAntecedentes([[], []]));
    }
  };

  const startSavingAntecedente = async (dataAnteced) => {
    dispatch(clearErrorMessageAnte());

    try {
      if (dataAnteced.id_antecedente) {
        //actualizando
        const { data } = await updateAntecedente(
          dataAnteced.id_antecedente,
          dataAnteced
        );
        dispatch(onUpdateAntecedente(formatearDataAntecedToTable([data])[0]));
        dispatch(onLoadAntecActivo(formatearDataAntecedToTable([data])[0]));
      } else {
        //registrando
        const { data } = await createAntecedente(
          pacienteActivo.id,
          dataAnteced
        );

        dispatch(onSaveAntecedente(formatearDataAntecedToTable([data])[0]));
        dispatch(onLoadAntecActivo(formatearDataAntecedToTable([data])[0]));
      }

      dispatch(changeRegisterErrorAnte({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterErrorAnte({
          msg: "Hay errores",
          error: comprobarErrorAnteced(error.response.data.message),
        })
      );
    }
  };

  const startDeletingAntecedente = async () => {
    try {
      await deleteAntecedente(antecedenteActivo.id_antecedente);
      dispatch(onDeleteAntecedente());
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    antecedentes,
    antecedenteActivo,
    errorRegAntecedente,

    //* Métodos
    changeDataAntecedente,
    startLoadAntecedentes,
    startSavingAntecedente,
    startDeletingAntecedente,
  };
};
