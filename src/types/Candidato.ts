// POSIBLES ESTADOS DE UN CANDIDATO
export type EstadoCandidato =
  | "en_espera"
  | "entrevista_agendada"
  | "contratado"
  | "rechazado";

export type Candidato = {
  // DATOS PERSONALES
  nombre_completo: string;
  correo: string;
  dui: string;
  telefono: string;
  fecha_nacimiento: string;
  direccion: string;

  // DATOS DEL CUESTIONARIO
  experiencia: string;
  tareas_capaces: string[]; 
  certificado: boolean;
  equipos_capaces: string[]; 
  capacidad_mantenimiento: string;
  ubicacion_residencia: string;

  // EXTRAS:
  url_curriculo?: string;

  // RESULTADO DEL CUESTIONARIO
  porcentaje_efectividad?: number;

  // Lo va a generar el back
  id?: string;
  estado?: EstadoCandidato; 
};
