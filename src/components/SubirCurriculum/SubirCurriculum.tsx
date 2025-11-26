import type { Candidato } from "../../types/Candidato";
import styles from "./SubirCurriculum.module.css";

interface Props {
  candidato: Candidato;
  enviarSolicitud: (candidatoAEnviar: Candidato, curriculum?: File) => void;
  volverPaso: () => void;
}

export const SubirCurriculum = ({ candidato, enviarSolicitud, volverPaso }: Props) => {
  let curriculum: File | undefined = undefined;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      curriculum = e.target.files[0];
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.titulo}>Paso 3: Subir Currículo (Opcional)</h3>
      <p className={styles.descripcion}>
        Si tienes un currículo, puedes subirlo aquí. De lo contrario, puedes
        omitir este paso.
      </p>
      <input 
        className={styles.fileInput}
        type="file" 
        accept=".pdf,.doc,.docx" 
        onChange={handleFileChange} 
      />

      <div className={styles.botones}>
        <button className={styles.botonSecundario} onClick={volverPaso}>
          Volver
        </button>
        <button 
          className={styles.boton}
          onClick={() => enviarSolicitud(candidato, curriculum)}
        >
          Finalizar y enviar solicitud
        </button>
      </div>
    </div>
  );
};
