import { preguntasPrueba } from "../../constants/preguntasPrueba";
import { validarCuestionario } from "../../helpers/validarCuestionario";
import type { Candidato } from "../../types/Candidato";
import styles from "./Cuestionario.module.css";

interface CuestionarioProps {
  candidato: Candidato;
  setCandidato: (candidato: Candidato) => void;
  cambiarPaso: () => void;
  volverPaso: () => void;
}

export const Cuestionario = ({
  candidato,
  setCandidato,
  cambiarPaso,
  volverPaso,
}: CuestionarioProps) => {

  /* FUCION QUE ACTUALIZA EL CANDIDATO CUANDO SE RESPONDE EL CUESTIONARIO */
  const cambiarRespuesta = (
    campo: keyof Candidato,
    valor: string | boolean,
    tipo: string
  ) => {
    if (tipo === "checkbox") {
      const valorStr = valor as string;
      const actuales = (candidato[campo] as string[]) || [];

      if (valorStr === "ninguna") {
        const nuevos = actuales.includes("ninguna") ? [] : ["ninguna"];
        setCandidato({ ...candidato, [campo]: nuevos });
      } else {
        let nuevos = actuales.filter((v) => v !== "ninguna");
        if (nuevos.includes(valorStr)) {
          nuevos = nuevos.filter((v) => v !== valorStr);
        } else {
          nuevos.push(valorStr);
        }
        setCandidato({ ...candidato, [campo]: nuevos });
      }
    } else {
      setCandidato({ ...candidato, [campo]: valor });
    }
  };

  /* VALIDAR QUE EL CUESTIONARIO SE RESPONDIO ENTERO ANTES DE CAMBIAR DE PASO */
  const finalizarCuestionario = async () => {
    if (validarCuestionario(candidato)) {
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
      const candidatoActualizado = {
        ...candidato,
        porcentaje_efectividad: porcentaje,
      };
      setCandidato(candidatoActualizado);

      cambiarPaso();
    }
  };

  return (
    <div className={styles.cuestionario}>
      {preguntasPrueba.map((pregunta, index) => (
        <div key={pregunta.id} className={styles.pregunta}>
          <p className={styles.textoPregunta}>{`${index + 1}) ${pregunta.texto}`}</p>

          {/* PREGUNTAS TIPO SELECT*/}
          {pregunta.tipo === "select" && (
            <select
              className={styles.select}
              value={(candidato[pregunta.campo] as string) || ""}
              onChange={(e) =>
                cambiarRespuesta(pregunta.campo, e.target.value, "select")
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

          {/* PREGUNTAS TIPO CHECKBOX*/}
          {pregunta.tipo === "checkbox" && (
            <div className={styles.opcionesContainer}>
              {pregunta.opciones?.map((opcion) => (
                <div key={opcion.valor} className={styles.opcion}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    id={`${opcion.valor}-${pregunta.id}`}
                    name={opcion.valor}
                    checked={(
                      (candidato[pregunta.campo] as string[]) || []
                    ).includes(opcion.valor)}
                    onChange={() =>
                      cambiarRespuesta(pregunta.campo, opcion.valor, "checkbox")
                    }
                  />
                  <label className={styles.label} htmlFor={`${opcion.valor}-${pregunta.id}`}>
                    {opcion.texto}
                  </label>
                </div>
              ))}
              {/* OPCION NINGUNA */}
              <div className={styles.opcion}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={`ninguna-${pregunta.id}`}
                  name="ninguna"
                  checked={(
                    (candidato[pregunta.campo] as string[]) || []
                  ).includes("ninguna")}
                  onChange={() =>
                    cambiarRespuesta(pregunta.campo, "ninguna", "checkbox")
                  }
                />
                <label className={styles.label} htmlFor={`ninguna-${pregunta.id}`}>Ninguna</label>
              </div>
            </div>
          )}

          {/* PREGUNTAS TIPO BOOLEAN*/}
          {pregunta.tipo === "boolean" && (
            <div className={styles.opcionesContainer}>
              <div className={styles.opcion}>
                <input
                  className={styles.radio}
                  type="radio"
                  id={`si-${pregunta.id}`}
                  name={`boolean-${pregunta.id}`}
                  checked={candidato[pregunta.campo] === true}
                  onChange={() =>
                    cambiarRespuesta(pregunta.campo, true, "boolean")
                  }
                />
                <label className={styles.label} htmlFor={`si-${pregunta.id}`}>Sí</label>
              </div>
              <div className={styles.opcion}>
                <input
                  className={styles.radio}
                  type="radio"
                  id={`no-${pregunta.id}`}
                  name={`boolean-${pregunta.id}`}
                  checked={candidato[pregunta.campo] === false}
                  onChange={() =>
                    cambiarRespuesta(pregunta.campo, false, "boolean")
                  }
                />
                <label className={styles.label} htmlFor={`no-${pregunta.id}`}>No</label>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className={styles.botones}>
        <button className={styles.botonSecundario} onClick={volverPaso}>Volver</button>
        <button className={styles.boton} onClick={finalizarCuestionario}>Siguiente</button>
      </div>
    </div>
  );
};
