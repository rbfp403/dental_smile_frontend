const nombresClases = [
  "carie",
  "obturacion",
  "sellante_necesario",
  "sellante_aplicado",
  "extraccion_necesaria",
  "perdida_caries",
  "perdida_otra",
  "endodoncia_necesaria",
  "endodoncia_aplicada",
  "protesis_fija_nece",
  "protesis_fija_apli",
  "protesis_remo_nece",
  "protesis_remo_apli",
  "protesis_total_nece",
  "protesis_total_apli",
  "corona_necesaria",
  "corona_aplicada",
  "borrar_icono",
];

//
//

export const changeSelectedIcon = () => {
  document.querySelector(".contenedorIcons").addEventListener("click", (e) => {
    //

    nombresClases.forEach((clase) => {
      if (document.getElementById(clase).contains(e.target)) {
        document.getElementById(clase).classList.add("icono_seleccionado");
      } else {
        document.getElementById(clase).classList.remove("icono_seleccionado");
      }
    });
  });
};
