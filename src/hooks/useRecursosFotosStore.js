import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorRegRecurso,
  onChangeRegErrRecurso,
  onDeleteRecurso,
  onLoadRecursoList,
  onSaveRecurso,
  onSetActiveRecurso,
  onUpdateRecurso,
} from "../store";

import { uploadImage } from "../api/uploadImage";

import {
  createFotografia,
  createRecursoFoto,
  deleteFotografia,
  deleteRecursoFoto,
  getRecursosFoto,
  updateRecursoFoto,
} from "../api/consultas.api";

//
//
//

export const useRecursosFotosStore = () => {
  //

  const dispatch = useDispatch();

  const { recursosList, recursoActivo, errorMsgRegRecurso } = useSelector(
    (state) => state.recursosFotos
  );

  const { consultaActiva } = useSelector((state) => state.consultas);

  //
  //
  //

  const changeDataRecuroFoto = (recursoFoto) => {
    dispatch(onSetActiveRecurso(recursoFoto));
  };

  const startLoadRecursosFoto = async () => {
    try {
      const { data } = await getRecursosFoto(consultaActiva.id_consulta);
      dispatch(onLoadRecursoList(data));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);

      dispatch(onLoadRecursoList([]));
    }
  };

  const startSavingRecursoFoto = async (dataRecurso, arrImgUrlDel) => {
    dispatch(clearErrorRegRecurso());

    try {
      //
      //registro de imagen
      //
      //independientemente estar o no registrado en el recurso se puede registrar imagenes
      const arrayPromesasImgs = [];

      for (const file of dataRecurso.arrImgSelect) {
        if (file instanceof File) {
          arrayPromesasImgs.push(uploadImage(file));
        }
      }

      //urls de images registradas
      const idsUrlsFotos = await Promise.all(arrayPromesasImgs);

      if (recursoActivo) {
        //actualizacion

        //eliminacion de imagenes en bd y cloudinary
        const arrRegAndDelImg = [];

        if (arrImgUrlDel.length > 0) {
          for (const fileId of arrImgUrlDel) {
            arrRegAndDelImg.push(deleteFotografia(fileId));
          }
        }

        //registro de imagenes en la bd
        for (const dataImg of idsUrlsFotos) {
          arrRegAndDelImg.push(
            createFotografia(recursoActivo.id_recurso, dataImg)
          );
        }

        //ejecutando promesas para eliminar y registrar imagenes
        await Promise.all(arrRegAndDelImg);

        //actualizar datos en la BD
        const { data } = await updateRecursoFoto(recursoActivo.id_recurso, {
          titulo_recurso: dataRecurso.stateTitle,
          descripcion_recurso: dataRecurso.stateDescription,
        });

        //guardar en el store
        dispatch(onUpdateRecurso(data));
        dispatch(onSetActiveRecurso(data));

        //
      } else {
        //registro

        //registro en la BD
        const { data: dataRecursoBD } = await createRecursoFoto(
          consultaActiva.id_consulta,
          {
            titulo: dataRecurso.stateTitle,
            descripcion: dataRecurso.stateDescription,
          }
        );

        //registro en el store

        //registro de imagenes en la bd
        const arrNewFotos = [];
        for (const dataImg of idsUrlsFotos) {
          arrNewFotos.push(createFotografia(dataRecursoBD.id_recurso, dataImg));
        }
        await Promise.all(arrNewFotos);

        dataRecursoBD.fotos = idsUrlsFotos;
        dispatch(onSaveRecurso(dataRecursoBD));
        dispatch(onSetActiveRecurso(dataRecursoBD));
      }

      //no hay errores
      dispatch(onChangeRegErrRecurso({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error);

      //cargar mensaje de error
      dispatch(
        onChangeRegErrRecurso({
          msg: "Hay errores",
          error: error.response,
          // ? error.response.data.message
          // : error.response,
        })
      );
    }
  };

  const startDeletingRecursoFoto = async () => {
    try {
      //eliminacion de imagenes de Cloudinary
      const arrDelImg = [];
      for (const foto of recursoActivo.fotos) {
        arrDelImg.push(deleteFotografia(foto.id));
      }
      await Promise.all(arrDelImg);

      //eliminacion en la base de datos
      await deleteRecursoFoto(recursoActivo.id_recurso);

      //eliminacion en el store
      dispatch(onDeleteRecurso());
      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  return {
    //* Propiedades
    recursosList,
    recursoActivo,
    errorMsgRegRecurso,

    //* Métodos
    changeDataRecuroFoto,
    startSavingRecursoFoto,
    startLoadRecursosFoto,
    startDeletingRecursoFoto,
  };
};
