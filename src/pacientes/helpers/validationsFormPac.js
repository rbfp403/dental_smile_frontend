let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export const formValidations = {
  cedula: [
    (value) => value.length === 10,
    "Campo requerido. Debe tener 10 dígitos",
  ],

  edad: [(value) => value.toString().length > 0, "Campo requerido"],

  erNombre: [(value) => value.trim().length > 0, "Campo requerido"],

  erApellido: [(value) => value.trim().length > 0, "Campo requerido"],

  telefono: [
    (value) => value.length === 10 || value.length === 0,
    "Opcional. El número debe tener 10 dígitos",
  ],
  email: [
    (value) => regex.test(value) || value.length === 0,
    "Opcional. Escriba un correo válido",
  ],
};
