import React from "react";
import type { Candidato } from "../../types/Candidato";
import { validarFormulario } from "../../helpers/validarFormulario";

interface FormularioProps {
  cambiarPaso: () => void;
  candidato: Candidato;
  setCandidato: (candidato: Candidato) => void;
}

export const FormularioPersonal = ({ cambiarPaso, candidato, setCandidato }: FormularioProps) => {

  const cambiarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCandidato({ ...candidato, [e.target.name]: e.target.value });
  };

  const guardarFormulario = () => {
    if (validarFormulario(candidato)) {
      cambiarPaso();
    }
  };

  return (
    <div>
      <h2>Formulario de aplicación</h2>

      {/* NOMBRE */}
      <div>
        <label>Nombre Completo</label>
        <input
          type="text"
          name="nombre_completo"
          value={candidato.nombre_completo}
          onChange={cambiarInput}
        />
      </div>

      {/* DUI */}
      <div>
        <label>Numero de DUI</label>
        <input
          type="text"
          name="dui"
          value={candidato.dui}
          maxLength={9}
          onChange={cambiarInput}
        />
      </div>

      {/* CORREO */}
      <div>
        <label>Correo electronico</label>
        <input
          type="mail"
          name="correo"
          value={candidato.correo}
          onChange={cambiarInput}
        />
      </div>

      {/* TELEFONO */}
      <div>
        <label>Telefono</label>
        <input
          type="text"
          name="telefono"
          value={candidato.telefono}
          onChange={cambiarInput}
          maxLength={8}
        />
      </div>

      {/* FECHA NACIMIENTO */}
      <div>
        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={candidato.fecha_nacimiento}
          onChange={cambiarInput}
        />
      </div>

      {/* DIRECCION */}
      <div>
        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={candidato.direccion}
          onChange={cambiarInput}
        />
      </div>

      <button onClick={guardarFormulario}>Siguiente</button>
    </div>
  );
};
