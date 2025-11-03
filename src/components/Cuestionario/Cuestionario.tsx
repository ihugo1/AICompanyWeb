import { preguntasPrueba } from "../../constants/preguntasPrueba";
import type { Candidato } from "../../types/Candidato";
import type { Pregunta } from "../../types/Pregunta";

interface CuestionarioProps {
  candidato: Candidato;
  setCandidato: (candidato: Candidato) => void;
  cambiarPaso: (paso: number) => void;
}

export const Cuestionario = ({
  candidato,
  setCandidato,
  cambiarPaso,
}: CuestionarioProps) => {
  const handleRespuestaChange = (
    campo: keyof Candidato,
    valor: string | boolean,
    tipo: string
  ) => {
    if (tipo === "checkbox") {
      const actuales = (candidato[campo] as string[]) || [];
      const nuevos = actuales.includes(valor as string)
        ? actuales.filter((v) => v !== valor)
        : [...actuales, valor as string];
      setCandidato({ ...candidato, [campo]: nuevos });
    } else {
      setCandidato({ ...candidato, [campo]: valor });
    }
  };

  const finalizarCuestionario = () => {
    // Validación
    for (const pregunta of preguntasPrueba) {
      const campo = pregunta.campo;
      const valor = candidato[campo];

      if (pregunta.tipo === "checkbox") {
        if (!valor || (valor as string[]).length === 0) {
          alert(`Por favor, responde la pregunta: "${pregunta.texto}"`);
          return;
        }
      } else if (valor === undefined || valor === null || valor === "") {
        alert(`Por favor, responde la pregunta: "${pregunta.texto}"`);
        return;
      }
    }

    // Cálculo de puntaje
    let puntajeObtenido = 0;
    let puntajeMaximoPosible = 0;

    for (const pregunta of preguntasPrueba) {
      puntajeMaximoPosible += pregunta.max_puntaje;
      const valor = candidato[pregunta.campo];

      switch (pregunta.tipo) {
        case "select": {
          const opcionSeleccionada = pregunta.opciones?.find(
            (op) => op.valor === valor
          );
          if (opcionSeleccionada) {
            puntajeObtenido += opcionSeleccionada.puntaje;
          }
          break;
        }
        case "checkbox": {
          const valoresSeleccionados = valor as string[];
          pregunta.opciones?.forEach((opcion) => {
            if (valoresSeleccionados.includes(opcion.valor)) {
              puntajeObtenido += opcion.puntaje;
            }
          });
          break;
        }
        case "boolean": {
          if (valor === true) {
            puntajeObtenido += pregunta.max_puntaje;
          }
          break;
        }
        default:
          break;
      }
    }

    const porcentaje = (puntajeObtenido / puntajeMaximoPosible) * 100;

    // Guardar el porcentaje en el estado del candidato
    setCandidato({ ...candidato, porcentaje_efectividad: porcentaje });

    const mensajeFinal = [
      "¡Gracias! Cuestionario completado con éxito.",
      `Puntaje Obtenido: ${puntajeObtenido}`,
      `Puntaje Máximo Posible: ${puntajeMaximoPosible}`,
      `Porcentaje de efectividad: ${porcentaje.toFixed(2)}%`
    ].join("\n");

    console.log("Candidato final:", { ...candidato, porcentaje_efectividad: porcentaje });
    console.log("Puntaje:", { puntajeObtenido, puntajeMaximoPosible, porcentaje });
    alert(mensajeFinal);
    
    // cambiarPaso(3);
  };

  return (
    <div>
      {preguntasPrueba.map((pregunta, index) => (
        <div key={pregunta.id}>
          <p>{`${index + 1}) ${pregunta.texto}`}</p>

          {pregunta.tipo === "select" && (
            <select
              value={(candidato[pregunta.campo] as string) || ""}
              onChange={(e) =>
                handleRespuestaChange(pregunta.campo, e.target.value, "select")
              }
            >
              <option value="">Selecciona una opción</option>
              {pregunta.opciones?.map((opcion) => (
                <option key={opcion.valor} value={opcion.valor}>
                  {opcion.texto}
                </option>
              ))}
            </select>
          )}

          {pregunta.tipo === "checkbox" && (
            <div>
              {pregunta.opciones?.map((opcion) => (
                <div key={opcion.valor}>
                  <input
                    type="checkbox"
                    id={`${opcion.valor}-${pregunta.id}`}
                    name={opcion.valor}
                    checked={(
                      (candidato[pregunta.campo] as string[]) || []
                    ).includes(opcion.valor)}
                    onChange={() =>
                      handleRespuestaChange(
                        pregunta.campo,
                        opcion.valor,
                        "checkbox"
                      )
                    }
                  />
                  <label htmlFor={`${opcion.valor}-${pregunta.id}`}>
                    {opcion.texto}
                  </label>
                </div>
              ))}
            </div>
          )}

          {pregunta.tipo === "boolean" && (
            <div>
              <input
                type="radio"
                id={`si-${pregunta.id}`}
                name={`boolean-${pregunta.id}`}
                checked={candidato[pregunta.campo] === true}
                onChange={() =>
                  handleRespuestaChange(pregunta.campo, true, "boolean")
                }
              />
              <label htmlFor={`si-${pregunta.id}`}>Sí</label>
              <input
                type="radio"
                id={`no-${pregunta.id}`}
                name={`boolean-${pregunta.id}`}
                checked={candidato[pregunta.campo] === false}
                onChange={() =>
                  handleRespuestaChange(pregunta.campo, false, "boolean")
                }
              />
              <label htmlFor={`no-${pregunta.id}`}>No</label>
            </div>
          )}

          {pregunta.tipo === "text" && (
            <input
              type="text"
              value={(candidato[pregunta.campo] as string) || ""}
              onChange={(e) =>
                handleRespuestaChange(pregunta.campo, e.target.value, "text")
              }
            />
          )}

          {pregunta.tipo === "number" && (
            <input
              type="number"
              value={(candidato[pregunta.campo] as number) || ""}
              onChange={(e) =>
                handleRespuestaChange(pregunta.campo, e.target.value, "number")
              }
            />
          )}
        </div>
      ))}
      <button onClick={finalizarCuestionario}>Finalizar Cuestionario</button>
    </div>
  );
};
