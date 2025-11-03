export type Candidato = {
  // DATOS PERSONALES
  nombre_completo: string;
  correo: string;
  dui: string;
  telefono: string;
  fecha_nacimiento: string;
  direccion: string;

  // DATOS ACADEMICOS
  nivel_academico?: string;
  experiencia_anios?: number;

  // DATOS DEL CUESTIONARIO
  experiencia?: string;
  tareas_capaces?: String[];
  certificado?: boolean
  equipos_capaces?: String [];
  capacidad_mantenimiento?: string;
  ubicacion_residencia?: string;

  // DATOS DE RESULTADOS
  porcentaje_efectividad?: number;

  // Lo va a generar el back
  id?: string;
  fecha_postulacion?: string;
  ip_origen?: string;
};
