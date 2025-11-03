import type { Candidato } from "./Candidato";

export type Pregunta = {
  id: number;
  texto: string;
  valor_minimo?: number;
  valor_maximo?: number;
  max_puntaje: number;
  opciones?: Opcion[];
  tipo: "boolean" | "text" | "number" | "select" | "checkbox";
  campo: keyof Candidato;
};

export type Opcion = {
  valor: string;
  texto: string;
  puntaje: number;
};
