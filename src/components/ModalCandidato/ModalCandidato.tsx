import type { Candidato } from "../../types/Candidato";

interface ModalCandidatoProps {
  candidato: Candidato | null;
  onClose: () => void;
}

export const ModalCandidato = ({ candidato, onClose }: ModalCandidatoProps) => {
  if (!candidato) {
    return null;
  }

  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <h2>Detalles del Candidato</h2>
          <button onClick={onClose}>
            &times;
          </button>
        </div>
        <div>
          <p><strong>Nombre:</strong> {candidato.nombre_completo}</p>
          <p><strong>Correo:</strong> {candidato.correo}</p>
          <p><strong>DUI:</strong> {candidato.dui}</p>
          <p><strong>Teléfono:</strong> {candidato.telefono}</p>
          <p><strong>Fecha de Nacimiento:</strong> {candidato.fecha_nacimiento}</p>
          <p><strong>Dirección:</strong> {candidato.direccion}</p>
          <hr />
          <h4>Cuestionario</h4>
          <p><strong>Experiencia:</strong> {candidato.experiencia} años</p>
          <p><strong>Tareas capaces:</strong> {Array.isArray(candidato.tareas_capaces) ? candidato.tareas_capaces.join(", ") : ''}</p>
          <p><strong>Certificado:</strong> {candidato.certificado ? "Sí" : "No"}</p>
          <p><strong>Equipos capaces:</strong> {Array.isArray(candidato.equipos_capaces) ? candidato.equipos_capaces.join(", ") : ''}</p>
          <p><strong>Capacidad de mantenimiento:</strong> {candidato.capacidad_mantenimiento}</p>
          <p><strong>Ubicación de residencia:</strong> {candidato.ubicacion_residencia}</p>
          <hr />
          <h4>Resultados</h4>
          <p><strong>Porcentaje de Efectividad:</strong> {candidato.porcentaje_efectividad?.toFixed(2)}%</p>
          <p><strong>Estado:</strong> {candidato.estado ?? "en_espera"}</p>
        </div>
      </div>
    </div>
  );
};
