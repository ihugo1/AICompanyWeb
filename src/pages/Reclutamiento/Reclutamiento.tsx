import { useEffect, useState } from "react";
import { FormularioPersonal } from "../../components/FormularioPersonal/FormularioPersonal";
import { Cuestionario } from "../../components/Cuestionario/Cuestionario";
import type { Candidato } from "../../types/Candidato";

export const Reclutamiento = () => {
  const [candidato, setCandidato] = useState<Candidato>({
    nombre_completo: "",
    correo: "",
    dui: "",
    telefono: "",
    fecha_nacimiento: "",
    direccion: "",
  });
  const [paso, setPaso] = useState(1);

  useEffect(() => {
    console.clear();
    console.log(candidato);
  }, [candidato]);

  return (
    <div>
      <h2>Proceso de reclutamiento</h2>
      {paso === 1 && (
        <FormularioPersonal
          cambiarPaso={setPaso}
          candidato={candidato}
          setCandidato={setCandidato}
        />
      )}
      {paso === 2 && (
        <Cuestionario
          cambiarPaso={setPaso}
          candidato={candidato}
          setCandidato={setCandidato}
        />
      )}
    </div>
  );
};
