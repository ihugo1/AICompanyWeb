import { useEffect, useState } from "react";
import { FormularioPersonal } from "../../components/FormularioPersonal/FormularioPersonal";
import { Cuestionario } from "../../components/Cuestionario/Cuestionario";
import type { Candidato } from "../../types/Candidato";
import { supabase } from "../../api/supabase.client";
import { SubirCurriculum } from "../../components/SubirCurriculum/SubirCurriculum";

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
    tareas_capaces: [],
    certificado: false,
    equipos_capaces: [],
    capacidad_mantenimiento: "",
    ubicacion_residencia: "",
    porcentaje_efectividad: 0,
    url_curriculo: "",
  });

  /* ESTADO O PASO DEL PROCESO */
  const [paso, setPaso] = useState(1);

  /* DEBUG MOSTRAR LOS CAMBIOS DEL ESTADO CANDIDATO */
  useEffect(() => {
    console.clear();
    console.log(candidato);
  }, [candidato]);

  /* FUNCION QUE SUBE EL CANDIDATO A LA BASE DE DATOS */
  const enviarSolicitud = async (
    candidatoAEnviar: Candidato,
    curriculum?: File
  ) => {
    let candidatoFinal = { ...candidatoAEnviar };

    if (curriculum) {
      const filePath = `${candidatoAEnviar.dui}-${curriculum.name}`;


      console.log("Subiendo curriculo...");
      // Subir el archivo
      const { error: uploadError } = await supabase.storage
        .from("curriculums")
        .upload(filePath, curriculum);

      if (uploadError) {
        console.error(uploadError);
        alert("Hubo un error al subir tu currículo. Inténtalo de nuevo.");
        return;
      }

      // Obtener la URL pública
      const { data } = supabase.storage
        .from("curriculums")
        .getPublicUrl(filePath);

        console.log("Asignando curriculo curriculo...");
      candidatoFinal.url_curriculo = data.publicUrl;
    }

    const { error } = await supabase
      .from("candidatos")
      .insert([candidatoFinal])
      .select();

    if (error) {
      alert(
        "Hubo un error al enviar tu aplicación. Por favor, inténtalo de nuevo."
      );
      return;
    }
    alert("¡Su aplicación ha sido enviada con éxito!");
    // Opcional: Redirigir o limpiar el estado
    setPaso(1);
    setCandidato({
      nombre_completo: "",
      correo: "",
      dui: "",
      telefono: "",
      fecha_nacimiento: "",
      direccion: "",
      experiencia: "",
      tareas_capaces: [],
      certificado: false,
      equipos_capaces: [],
      capacidad_mantenimiento: "",
      ubicacion_residencia: "",
      porcentaje_efectividad: 0,
      url_curriculo: "",
    });
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
          cambiarPaso={() => setPaso(3)}
          candidato={candidato}
          setCandidato={setCandidato}
        />
      )}
      {paso === 3 && (
        <SubirCurriculum
          enviarSolicitud={enviarSolicitud}
          candidato={candidato}
        />
      )}
    </div>
  );
};
