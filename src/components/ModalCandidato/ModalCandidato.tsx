import type { Candidato } from "../../types/Candidato";
import styles from "./ModalCandidato.module.css";

interface ModalCandidatoProps {
  candidato: Candidato | null;
  onClose: () => void;
}

export const ModalCandidato = ({ candidato, onClose }: ModalCandidatoProps) => {
  if (!candidato) {
    return null;
  }

  const formatearTexto = (texto: string) => {
    return texto.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatearArray = (array: string[]) => {
    return array.map(item => formatearTexto(item)).join(', ');
  };

  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.titulo}>Detalles del Candidato</h2>
          <button className={styles.botonCerrar} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.contenido}>
          <div className={styles.campo}>
            <strong>Nombre:</strong> {candidato.nombre_completo}
          </div>
          <div className={styles.campo}>
            <strong>Correo:</strong> {candidato.correo}
          </div>
          <div className={styles.campo}>
            <strong>DUI:</strong> {candidato.dui}
          </div>
          <div className={styles.campo}>
            <strong>Teléfono:</strong> {candidato.telefono}
          </div>
          <div className={styles.campo}>
            <strong>Edad:</strong> {calcularEdad(candidato.fecha_nacimiento)} años
          </div>
          <div className={styles.campo}>
            <strong>Dirección:</strong> {candidato.direccion}
          </div>
          <hr className={styles.separador} />
          <h4 className={styles.subtitulo}>Cuestionario</h4>
          <div className={styles.campo}>
            <strong>Experiencia:</strong> {candidato.experiencia} años
          </div>
          <div className={styles.campo}>
            <strong>Tareas capaces:</strong>{" "}
            {Array.isArray(candidato.tareas_capaces)
              ? formatearArray(candidato.tareas_capaces)
              : ""}
          </div>
          <div className={styles.campo}>
            <strong>Certificado:</strong> {candidato.certificado ? "Sí" : "No"}
          </div>
          <div className={styles.campo}>
            <strong>Equipos capaces:</strong>{" "}
            {Array.isArray(candidato.equipos_capaces)
              ? formatearArray(candidato.equipos_capaces)
              : ""}
          </div>
          <div className={styles.campo}>
            <strong>Capacidad de mantenimiento:</strong>{" "}
            {formatearTexto(candidato.capacidad_mantenimiento || "")}
          </div>
          <div className={styles.campo}>
            <strong>Ubicación de residencia:</strong>{" "}
            {formatearTexto(candidato.ubicacion_residencia || "")}
          </div>
          <hr className={styles.separador} />
          <h4 className={styles.subtitulo}>Resultados</h4>
          <div className={styles.campo}>
            <strong>Porcentaje de Efectividad:</strong>{" "}
            {candidato.porcentaje_efectividad?.toFixed(2)}%
          </div>
          <div className={styles.campo}>
            <strong>Estado:</strong> {formatearTexto(candidato.estado ?? "en_espera")}
          </div>
          {candidato.url_curriculo && (
            <a className={styles.enlaceCurriculo} href={candidato.url_curriculo} target="_blank" rel="noopener noreferrer">Ver Currículo</a>
          )}
        </div>
      </div>
    </div>
  );
};
