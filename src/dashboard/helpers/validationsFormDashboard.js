export const formValidationsTipPago = {
  tipo_de_pago: [(value) => value.trim().length > 0, "Campo requerido"],
  precio: [(value) => value.trim().length > 0, "Campo requerido"],
};

export const formValidationsTipCons = {
  tipo_de_consulta: [(value) => value.trim().length > 0, "Campo requerido"],
  precio: [(value) => value.trim().length > 0, "Campo requerido"],
};

export const formValidationsProced = {
  precio: [(value) => value.trim().length > 0, "Campo requerido"],
};
