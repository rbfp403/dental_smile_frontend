export const formatearDataSaludBucal = (saludBucal) => {
  return {
    id_saludb: saludBucal.id_saludb,
    id_consulta: saludBucal.id_consulta,
    enfermedad_periodontal: saludBucal.enfermedad_periodontal,
    mal_oclusion: saludBucal.mal_oclusion,
    fluorosis: saludBucal.fluorosis,
    piezas: saludBucal.piezas.map((pieza) => {
      return {
        id: pieza.id_pzaSaludB,
        fila: pieza.fila_pza,
        pieza: pieza.pieza,
        placa: pieza.placa,
        calculo: pieza.calculo,
        gingivitis: pieza.gingivitis,
      };
    }),
  };
};

export const formatearDataPzaSBtoBD = (pieza) => {
  return {
    fila_pza: pieza.fila,
    pieza: pieza.pieza,
    placa: pieza.placa,
    calculo: pieza.calculo,
    gingivitis: pieza.gingivitis,
  };
};

// export const dataSaludBucalEmpty = () => {
//   let piezasEmpty = [];

//   for (let index = 1; index <= 6; index++) {
//     piezasEmpty.push({
//       id: null,
//       fila: index,
//       pieza: "",
//       placa: 0,
//       calculo: 0,
//       gingivitis: 0,
//     });
//   }

//   return piezasEmpty;
// };
