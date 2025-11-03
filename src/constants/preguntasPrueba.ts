import type { Pregunta } from "../types/Pregunta";

export const preguntasPrueba: Pregunta[] = [
  //////////////*PREGUNTA 1*//////////////
  {
    id: 1,
    texto:
      "¿Cuántos años de experiencia manejando equipos de AC/Refrigeración posee?",
    tipo: "select",
    max_puntaje: 40,
    campo: "experiencia",
    opciones: [
      { valor: "0", texto: "1 año o menos", puntaje: 10 },
      { valor: "2", texto: "2 años", puntaje: 20 },
      { valor: "3", texto: "3 años", puntaje: 30 },
      { valor: "4+", texto: "4 años o más", puntaje: 40 },
    ],
  },

  //////////////*PREGUNTA 2*//////////////
  {
    id: 2,
    texto:
      "Marque las tareas que puede realizar con equipos de AC/Refrigeración",
    tipo: "checkbox",
    max_puntaje: 20,
    campo: "tareas_capaces",
    opciones: [
      { valor: "instalar", texto: "Instalar", puntaje: 5 },
      { valor: "diagnosticar", texto: "Diagnosticar", puntaje: 5 },
      { valor: "reparar", texto: "Reparar", puntaje: 5 },
      { valor: "mantenimiento", texto: "Dar mantenimiento", puntaje: 5 },
    ],
  },

  //////////////*PREGUNTA 3*//////////////
  {
    id: 3,
    texto: "¿Posee certificados/diplomas afines al área de AC/Refrigeración?",
    tipo: "boolean",
    max_puntaje: 15,
    campo: "certificado",
  },

  //////////////*PREGUNTA 4*//////////////
  {
    id: 4,
    texto: "Seleccione los equipos con los que posee experiencia",
    tipo: "checkbox",
    max_puntaje: 15,
    campo: "equipos_capaces",
    opciones: [
      { valor: "splits-minisplits", texto: "Splits y minisplits", puntaje: 5 },
      {
        valor: "sistemas-centrales",
        texto: "Sistemas Centrales (Chillers, manejadoras)",
        puntaje: 5,
      },
      { valor: "paquetes", texto: "Paquetes", puntaje: 5 },
    ],
  },

  //////////////*PREGUNTA 5*//////////////
  {
    id: 5,
    texto:
      "Evalúe su capacidad para ejecutar mantenimiento preventivo mayor (limpieza, calibración) en unidades centrales.",
    tipo: "select",
    max_puntaje: 10,
    campo: "capacidad_mantenimiento",
    opciones: [
      { valor: "sin-supervision", texto: "Capaz de ejecutarlo sin supervisión", puntaje: 10 },
      { valor: "con-supervision", texto: "Capaz de asistir o siendo supervisado", puntaje: 5 },
      { valor: "sin-experiencia", texto: "Sin experiencia hasta el momento", puntaje: 0 },
    ],
  },

  //////////////*PREGUNTA 6*//////////////
  {
    id: 6,
    texto:
      "Seleccione su ubicación de residencia",
    tipo: "select",
    max_puntaje: 8,
    campo: "ubicacion_residencia",
    opciones: [
      { valor: "antiguo", texto: "Antiguo Cuscatlán", puntaje: 8 },
      { valor: "san-salvador", texto: "San Salvador", puntaje: 8 },
      { valor: "santa-tecla", texto: "Santa Tecla", puntaje: 8 },
      { valor: "otra", texto: "Cualquier otra ubicación del pais", puntaje: 0 },
    ],
  },
];
