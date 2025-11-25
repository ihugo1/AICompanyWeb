import type { Candidato } from "../../types/Candidato";

interface Props {
  candidato: Candidato;
  enviarSolicitud: (candidatoAEnviar: Candidato, curriculum?: File) => void;
}

export const SubirCurriculum = ({ candidato, enviarSolicitud }: Props) => {
  let curriculum: File | undefined = undefined;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      curriculum = e.target.files[0];
    }
  };

  return (
    <div>
      <h3>Paso 3: Subir Currículo (Opcional)</h3>
      <p>
        Si tienes un currículo, puedes subirlo aquí. De lo contrario, puedes
        omitir este paso.
      </p>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

      <button onClick={() => enviarSolicitud(candidato, curriculum)}>
        Finalizar y enviar solicitud
      </button>
    </div>
  );
};
