import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormularioPersonal } from "../../components/FormularioPersonal/FormularioPersonal";
import { Cuestionario } from "../../components/Cuestionario/Cuestionario";
import type { Candidato } from "../../types/Candidato";
import { supabase } from "../../api/supabase.client";
import { SubirCurriculum } from "../../components/SubirCurriculum/SubirCurriculum";
import styles from "./Reclutamiento.module.css"

export const Reclutamiento = () => {
  const navigate = useNavigate();
  
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

  /* SCROLL AL TOPE CUANDO CAMBIA EL PASO */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [paso]);

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
        toast.error("Hubo un error al subir tu currículo. Inténtalo de nuevo.");
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
      toast.error(
        "Hubo un error al enviar tu aplicación. Por favor, inténtalo de nuevo."
      );
      return;
    }
    toast.success(
      (t) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>¡Solicitud enviada con éxito!</strong>
          </div>
          <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
            Revisaremos tu perfil y nos comunicaremos contigo por correo electrónico o teléfono en los próximos días en caso de ser escogido para una entrevista.
          </div>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              navigate("/");
            }}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            OK
          </button>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  return (
    <div className={styles.reclutamiento}>
      <h2>Proceso de reclutamiento</h2>
      <div className={styles.contenedorReclutamiento}>
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
          volverPaso={() => setPaso(1)}
          candidato={candidato}
          setCandidato={setCandidato}
        />
      )}
      {paso === 3 && (
        <SubirCurriculum
          enviarSolicitud={enviarSolicitud}
          volverPaso={() => setPaso(2)}
          candidato={candidato}
        />
      )}
      </div>
    </div>
  );
};
