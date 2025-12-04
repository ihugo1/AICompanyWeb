import { useState } from "react";
import type { Candidato, EstadoCandidato } from "../../types/Candidato";
import styles from "./ListaCandidatos.module.css";

interface ListaCandidatosProps {
  candidatos: Candidato[];
  onOpenModal: (candidato: Candidato) => void;
  onEstadoChange: (candidatoId: string, nuevoEstado: EstadoCandidato) => void;
}

export const ListaCandidatos = ({
  candidatos,
  onOpenModal,
  onEstadoChange,
}: ListaCandidatosProps) => {
  const [filtroEstado, setFiltroEstado] = useState<string>("en_espera");
  
  const estadosPosibles: EstadoCandidato[] = [
    "en_espera",
    "entrevista_agendada",
    "contratado",
    "rechazado",
  ];

  // FORMATEADOR DE TEXTO
  const formatearTexto = (texto: string) => {
    return texto.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const candidatosFiltrados = filtroEstado === "todos" 
    ? candidatos 
    : candidatos.filter(candidato => (candidato.estado ?? "en_espera") === filtroEstado);

  const getEstadoClass = (estado: string) => {
    switch (estado) {
      case "en_espera": return styles.estadoEspera;
      case "entrevista_agendada": return styles.estadoEntrevista;
      case "contratado": return styles.estadoContratado;
      case "rechazado": return styles.estadoRechazado;
      default: return styles.estadoEspera;
    }
  };

  if (candidatosFiltrados.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.filtros}>
          <label className={styles.labelFiltro}>Filtrar por estado:</label>
          <select 
            className={styles.selectFiltro}
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos</option>
            {estadosPosibles.map((estado) => (
              <option key={estado} value={estado}>
                {formatearTexto(estado)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.sinCandidatos}>No hay candidatos para mostrar con este filtro.</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.filtros}>
        <label className={styles.labelFiltro}>Filtrar por estado:</label>
        <select 
          className={styles.selectFiltro}
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="todos">Todos</option>
          {estadosPosibles.map((estado) => (
            <option key={estado} value={estado}>
              {formatearTexto(estado)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.tablaWrapper}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Efectividad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {candidatosFiltrados.map((candidato) => (
              <tr key={candidato.id}>
                <td data-label="Nombre">{candidato.nombre_completo}</td>
                <td data-label="Efectividad" className={styles.efectividad}>
                  {candidato.porcentaje_efectividad?.toFixed(2) ?? "N/A"}%
                </td>
                <td data-label="Estado">
                  <select
                    className={`${styles.select} ${getEstadoClass(candidato.estado ?? "en_espera")}`}
                    value={candidato.estado ?? "en_espera"}
                    onChange={(e) => {
                      {/* ACTUALIZAR CANDIDATO */}
                      if (candidato.id) {
                        onEstadoChange(
                          candidato.id,
                          e.target.value as EstadoCandidato,
                        );
                      }
                    }}
                  >
                    {estadosPosibles.map((estado) => (
                      <option key={estado} value={estado}>
                        {formatearTexto(estado)}
                      </option>
                    ))}
                  </select>
                </td>
                <td data-label="Acciones">
                  <button className={styles.botonDetalles} onClick={() => onOpenModal(candidato)}>
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
