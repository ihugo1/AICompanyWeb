import type { Candidato, EstadoCandidato } from "../../types/Candidato";

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
  const estadosPosibles: EstadoCandidato[] = [
    "en_espera",
    "entrevista_agendada",
    "contratado",
    "rechazado",
  ];

  if (candidatos.length === 0) {
    return <p>No hay candidatos para mostrar.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Efectividad</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {candidatos.map((candidato) => (
          <tr key={candidato.id}>
            <td>{candidato.nombre_completo}</td>
            <td>{candidato.correo}</td>
            <td>{candidato.telefono}</td>
            <td>
              {candidato.porcentaje_efectividad?.toFixed(2) ?? "N/A"}%
            </td>
            <td>
              <select
                value={candidato.estado ?? "en_espera"}
                onChange={(e) => {
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
                    {estado}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <button onClick={() => onOpenModal(candidato)}>
                Ver Detalles
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
