let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export const formValidations = {
  tip_antecedente: [(value) => value.trim().length > 0, "Campo requerido"],
};
