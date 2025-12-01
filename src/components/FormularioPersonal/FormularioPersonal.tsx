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

  /* CAMBIA LOS INPUTS DE TEXTO */
  const cambiarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidato({ ...candidato, [e.target.name]: e.target.value });
  };

  /* CAMBIA LOS INPUTS DE NUMEROS */
  const cambiarNumero = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/\D/g, "");
    setCandidato({ ...candidato, [name]: sanitizedValue });
  };

  /* VALIDA Y CAMBIA DE PASO */
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
          minLength={3}
          maxLength={100}
        />
      </div>

      {/* DUI */}
      <div className={styles.campo}>
        <label className={styles.label}>Numero de DUI (Sin guión)</label>
        <input
          className={styles.input}
          type="text"
          name="dui"
          value={candidato.dui}
          maxLength={9}
          onChange={cambiarNumero}
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
          onChange={cambiarNumero}
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
          minLength={3}
          maxLength={100}
        />
      </div>

      <button className={styles.boton} onClick={guardarFormulario}>
        Siguiente
      </button>
    </div>
  );
};
