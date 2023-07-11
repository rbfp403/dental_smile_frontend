import { useEffect, useMemo, useState } from "react";

//
//
//
//

export const useForm = (initialForm = {}, formValidations = {}) => {
  //hook form

  const [formState, setFormState] = useState(initialForm);
  //hook validaciones
  const [formValidation, setFormValidation] = useState({});

  //la funcion que comprueba la validacion se ejecuta con cada cambio en hook del formulario
  useEffect(() => {
    createValidators();
  }, [formState]);

  //actualizar el hook  del formulario cada vez que la informacion inicial cambia
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  //useMemo boleana que se actualiza con cada cambio en el hook de las validaciones
  const isFormValid = useMemo(() => {
    //nameFieldValid emailValid phoneValid
    for (const formValue of Object.keys(formValidation)) {
      //si es diferente que null es porque contiene un msg error
      if (formValidation[formValue] !== null) return false;
    }

    // si nunca retorna false y llega hasta aca es porque se cumple todas las validaciones
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    //se reemplaza la propiedad que llama el evento en su onChange

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //funcion para validar los campos
  const createValidators = () => {
    const formCheckedValues = {};
    //se extraen las keys del objeto que tiene las validaciones
    for (const formField of Object.keys(formValidations)) {
      // se extrae la funcion y msg de error de cada validacion
      const [fn, errorMessage] = formValidations[formField];
      // se crea una propiedad computada que tendra null si se cumple la validacion en caso contrario tendra el mensaje de error
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    // en el hook de validacion se guardan un objeto { nameFieldValid: null o error msg}
    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,

    ...formValidation,
    formValidation,
    isFormValid,
  };
};
