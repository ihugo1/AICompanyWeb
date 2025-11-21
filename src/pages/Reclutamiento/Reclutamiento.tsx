import { useEffect, useState } from "react";
import { FormularioPersonal } from "../../components/FormularioPersonal/FormularioPersonal";
import { Cuestionario } from "../../components/Cuestionario/Cuestionario";
import type { Candidato } from "../../types/Candidato";
import { supabase } from "../../api/supabase.client";

export const Reclutamiento = () => {
  /* ESTADO DEL CANDIDATO DE TIPO CANDIDATO */
  const [candidato, setCandidato] = useState<Candidato>({
    nombre_completo: "",
    correo: "",
    dui: "",
    telefono: "",
    fecha_nacimiento: "",
    direccion: "",
    experiencia: "",
    tareas_capaces:[],
    certificado: false,
    equipos_capaces: [],
    capacidad_mantenimiento:"",
    ubicacion_residencia: "",
    porcentaje_efectividad: 0,
  });

  /* ESTADO O PASO DEL PROCESO */
  const [paso, setPaso] = useState(1);

  /* DEBUG MOSTRAR LOS CAMBIOS DEL ESTADO CANDIDATO */
  useEffect(() => {
    console.clear();
    console.log(candidato);
  }, [candidato]);

  /* FUNCION QUE SUBE EL CANDIDATO A LA BASE DE DATOS */
  const enviarSolicitud = async (candidatoAEnviar: Candidato) => {
    const { error } = await supabase
      .from("candidatos")
      .insert([candidatoAEnviar])
      .select();

    if (error) {
      alert(
        "Hubo un error al enviar tu aplicación. Por favor, inténtalo de nuevo."
      );
      return;
    }
    alert("¡Su aplicación ha sido enviada con éxito!");
  };

  return (
    <div>
      <h2>Proceso de reclutamiento</h2>
      {paso === 1 && (
        <FormularioPersonal
          cambiarPaso={() => setPaso(2)}
          candidato={candidato}
          setCandidato={setCandidato}
        />
      )}
      {paso === 2 && (
        <Cuestionario
          enviarSolicitud={enviarSolicitud}
          candidato={candidato}
          setCandidato={setCandidato}
        />
      )}
    </div>
  );
};
