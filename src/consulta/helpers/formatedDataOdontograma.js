export const verifyPiezaDentalEmpty = (dataPieza) => {
  let dataEmpty = true;

  for (const value of Object.values(dataPieza).slice(2)) {
    if (value !== null) {
      dataEmpty = false;
      break;
    }
  }

  return dataEmpty;
};

export const formatearDataOdontograma = (odontograma) => {
  return {
    id_odontograma: odontograma.id_odontograma,
    id_consulta: odontograma.id_consulta,
    fecha_odontograma: odontograma.fecha_odontograma,
    piezas: odontograma.piezas.map((pieza) => {
      return {
        id: pieza.id_dent,
        numberTooth: pieza.num_dent,
        nota: pieza.nota_dent,
        movilidad: pieza.mov_dent,
        recesion: pieza.rec_dent,
        oclusal: pieza.oclusal_dent,
        vestibular: pieza.vestibular_dent,
        mesial: pieza.mesial_dent,
        lingual: pieza.lingual_dent,
        distal: pieza.distal_dent,
      };
    }),
  };
};

export const formatearDataPiezaDentalToBD = (pieza) => {
  return {
    num_dent: pieza.numberTooth,
    mov_dent: pieza.movilidad,
    rec_dent: pieza.recesion,
    oclusal_dent: pieza.oclusal,
    vestibular_dent: pieza.vestibular,
    mesial_dent: pieza.mesial,
    lingual_dent: pieza.lingual,
    distal_dent: pieza.distal,
  };
};

export const arrUrlIcons = [
  "",
  "",
  "",
  "sellante_red",
  "sellante_blue",
  "extraccion_necesaria",
  "perdida_carie",
  "perdida_otra_causa",
  "endodoncia_red",
  "endodoncia_blue",
  "protesis_fija_red",
  "protesis_fija_blue",
  "protesis_removible_red",
  "protesis_removible_blue",
  "protesis_total_red",
  "protesis_total_blue",
  "corona_red",
  "corona_blue",
  "",
];

const listPiezasDentales = [
  { num: 11, label: "Incisivo Central Superior Derecho" },
  { num: 12, label: "Incisivo Lateral Superior Derecho" },
  { num: 13, label: "Canino Superior Derecho" },
  { num: 14, label: "Primer Premolar Superior Derecho" },
  { num: 15, label: "Segundo Premolar Superior Derecho" },
  { num: 16, label: "Primer Molar Superior Derecho" },
  { num: 17, label: "Segundo Molar Superior Derecho" },
  { num: 18, label: "Tercer Molar Superior Derecho" },
  //
  { num: 21, label: "Incisivo Central Superior Izquierdo" },
  { num: 22, label: "Incisivo Lateral Superior Izquierdo" },
  { num: 23, label: "Canino Superior Izquierdo" },
  { num: 24, label: "Primer Premolar Superior Izquierdo" },
  { num: 25, label: "Segundo Premolar Superior Izquierdo" },
  { num: 26, label: "Primer Molar Superior Izquierdo" },
  { num: 27, label: "Segundo Molar Superior Izquierdo" },
  { num: 28, label: "Tercer Molar Superior Izquierdo" },
  //
  { num: 31, label: "Incisivo Central Inferior Izquierdo" },
  { num: 32, label: "Incisivo Lateral Inferior Izquierdo" },
  { num: 33, label: "Canino Inferior Izquierdo" },
  { num: 34, label: "Primer Premolar Inferior Izquierdo" },
  { num: 35, label: "Segundo Premolar Inferior Izquierdo" },
  { num: 36, label: "Primer Molar Inferior Izquierdo" },
  { num: 37, label: "Segundo Molar Inferior Izquierdo" },
  { num: 38, label: "Tercer Molar Inferior Izquierdo" },
  //
  { num: 41, label: "Incisivo Central Inferior Derecho" },
  { num: 42, label: "Incisivo Lateral Inferior Derecho" },
  { num: 43, label: "Canino Inferior Derecho" },
  { num: 44, label: "Primer Premolar Inferior Derecho" },
  { num: 45, label: "Segundo Premolar Inferior Derecho" },
  { num: 46, label: "Primer Molar Inferior Derecho" },
  { num: 47, label: "Segundo Molar Inferior Derecho" },
  { num: 48, label: "Tercer Molar Inferior Derecho" },
  //
  { num: 51, label: "Incisivo Central Superior Derecho" },
  { num: 52, label: "Incisivo Lateral Superior Derecho" },
  { num: 53, label: "Canino Superior Derecho" },
  { num: 54, label: "Primer Molar Superior Derecho" },
  { num: 55, label: "Segundo Molar Superior Derecho" },
  //
  { num: 61, label: "Incisivo Central Superior Izquierdo" },
  { num: 62, label: "Incisivo Lateral Superior Izquierdo" },
  { num: 63, label: "Canino Superior Izquierdo" },
  { num: 64, label: "Primer Molar Superior Izquierdo" },
  { num: 65, label: "Segundo Molar Superior Izquierdo" },
  //
  { num: 71, label: "Incisivo Central Inferior Izquierdo" },
  { num: 72, label: "Incisivo Lateral Inferior Izquierdo" },
  { num: 73, label: "Canino Inferior Izquierdo" },
  { num: 74, label: "Primer Molar Inferior Izquierdo" },
  { num: 75, label: "Segundo Molar Inferior Izquierdo" },
  //
  { num: 81, label: "Incisivo Central Inferior Derecho" },
  { num: 82, label: "Incisivo Lateral Inferior Derecho" },
  { num: 83, label: "Canino Inferior Derecho" },
  { num: 84, label: "Primer Molar Inferior Derecho" },
  { num: 85, label: "Segundo Molar Inferior Derecho" },
];

const simbologia = [
  "",
  "Carie redhex%",
  "Obturado bluehex%",
  "Sellante Necesario redhex%",
  "Sellante Aplicado bluehex%",
  "Extracción Necesaria redhex%",
  "Pérdida por caries bluehex%",
  "Pérdida por otra causa bluehex%",
  "Endodoncia Necesaria redhex%",
  "Endodoncia Aplicada bluehex%",
  "Prótesis fija Necesaria redhex%",
  "Prótesis fija Aplicada bluehex%",
  "Prótesis removible Necesaria redhex%",
  "Prótesis removible Aplicada bluehex%",
  "Prótesis total Necesaria redhex%",
  "Prótesis total Aplicada bluehex%",
  "Corona Necesaria redhex%",
  "Corona Aplicada bluehex%",
];

const carasDentales = (pieza) => {
  let cadena = "";
  if (pieza.oclusal_dent) {
    if ([1, 2].includes(pieza.oclusal_dent)) {
      cadena += `Cara oclusal - ${simbologia[pieza.oclusal_dent]}%`;
    } else {
      cadena += `${simbologia[pieza.oclusal_dent]}%`;
    }
  }
  if (pieza.vestibular_dent) {
    cadena += `Cara Vestibular - ${simbologia[pieza.vestibular_dent]}%`;
  }
  if (pieza.mesial_dent) {
    cadena += `Cara Mesial - ${simbologia[pieza.mesial_dent]}%`;
  }
  if (pieza.lingual_dent) {
    cadena += `Cara Lingual - ${simbologia[pieza.lingual_dent]}%`;
  }
  if (pieza.distal_dent) {
    cadena += `Cara Distal - ${simbologia[pieza.distal_dent]}%`;
  }
  return cadena;
};

export const convertOdonListPiezas = (odontogramaListPzaDent) => {
  return odontogramaListPzaDent.map((pieza) => {
    //
    const labelPieza = listPiezasDentales.find(
      (objeto) => objeto.num === pieza.num_dent
    );

    return {
      id: pieza.id_dent,
      pieza_dental: pieza.num_dent + ".%" + labelPieza.label,
      // denticion: "ddd",
      superficies: carasDentales(pieza),
      movilidad: pieza.mov_dent,
      recesion: pieza.rec_dent,
      nota: !pieza.nota_dent ? "" : pieza.nota_dent,
    };
  });
};
