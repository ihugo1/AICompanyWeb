import type { Candidato } from "../types/Candidato";

export const validarCuestionario = (candidato: Candidato) => {
  // Validación
  if (
    !candidato.experiencia ||
    !candidato.tareas_capaces ||
    !candidato.equipos_capaces ||
    !candidato.capacidad_mantenimiento ||
    !candidato.ubicacion_residencia
  ) {
    alert("Por favor responda todos los campos");
    return false;
  }
  return true;
};
