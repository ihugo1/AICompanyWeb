import React from "react";
import type { Candidato } from "../../types/Candidato";
import { validarFormulario } from "../../helpers/validarFormulario";
import styles from "./FormularioPersonal.module.css";

interface FormularioProps {
  cambiarPaso: () => void;
  candidato: Candidato;
  setCandidato: (candidato: Candidato) => void;
}

export const FormularioPersonal = ({
  cambiarPaso,
  candidato,
  setCandidato,
}: FormularioProps) => {
  const cambiarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidato({ ...candidato, [e.target.name]: e.target.value });
  };

  const guardarFormulario = async () => {
    const esValido = await validarFormulario(candidato);
    if (esValido) {
      cambiarPaso();
    }
  };

  return (
    <div className={styles.formulario}>
      <h3 className={styles.titulo}>Formulario Personal</h3>

      {/* NOMBRE */}
      <div className={styles.campo}>
        <label className={styles.label}>Nombre Completo</label>
        <input
          className={styles.input}
          type="text"
          name="nombre_completo"
          value={candidato.nombre_completo}
          onChange={cambiarInput}
        />
      </div>

      {/* DUI */}
      <div className={styles.campo}>
        <label className={styles.label}>Numero de DUI</label>
        <input
          className={styles.input}
          type="text"
          name="dui"
          value={candidato.dui}
          maxLength={9}
          onChange={cambiarInput}
        />
      </div>

      {/* CORREO */}
      <div className={styles.campo}>
        <label className={styles.label}>Correo electronico</label>
        <input
          className={styles.input}
          type="email"
          name="correo"
          value={candidato.correo}
          onChange={cambiarInput}
        />
      </div>

      {/* TELEFONO */}
      <div className={styles.campo}>
        <label className={styles.label}>Telefono</label>
        <input
          className={styles.input}
          type="text"
          name="telefono"
          value={candidato.telefono}
          onChange={cambiarInput}
          maxLength={8}
        />
      </div>

      {/* FECHA NACIMIENTO */}
      <div className={styles.campo}>
        <label className={styles.label}>Fecha de Nacimiento</label>
        <input
          className={styles.input}
          type="date"
          name="fecha_nacimiento"
          value={candidato.fecha_nacimiento}
          onChange={cambiarInput}
        />
      </div>

      {/* DIRECCION */}
      <div className={styles.campo}>
        <label className={styles.label}>Dirección</label>
        <input
          className={styles.input}
          type="text"
          name="direccion"
          value={candidato.direccion}
          onChange={cambiarInput}
        />
      </div>

      <button className={styles.boton} onClick={guardarFormulario}>Siguiente</button>
    </div>
  );
};
