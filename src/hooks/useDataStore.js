import { useDispatch, useSelector } from "react-redux";
import { onLoadDataActiva } from "../store";

//
//

export const useDataStore = () => {
  //

  const dispatch = useDispatch();

  const { dataActiva } = useSelector((state) => state.dataGlobal);

  const changeDataActiva = (dataRow) => {
    dispatch(onLoadDataActiva(dataRow));
  };
  //
  return {
    //* Propiedades
    dataActiva,

    //* Métodos
    changeDataActiva,
  };
};
