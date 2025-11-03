import React from "react";
import type { Candidato } from "../../types/Candidato";
import { useFormateador } from "../../hooks/useFormateador";

interface FormularioProps {
  cambiarPaso: (paso: number) => void;
  candidato: Candidato;
  setCandidato: (candidato: Candidato) => void;
}

export const FormularioPersonal = ({
  cambiarPaso,
  candidato,
  setCandidato,
}: FormularioProps) => {
  const { formatearDUI, formatearTelefono } = useFormateador();

  const cambiarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let valorProcesado = value;
    if (name === "dui") {
      valorProcesado = formatearDUI(value);
    } else if (name === "telefono") {
      valorProcesado = formatearTelefono(value);
    }
    setCandidato({ ...candidato, [name]: valorProcesado });
  };

  const guardarFormulario = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    if (
      !candidato.nombre_completo ||
      !candidato.correo ||
      !candidato.dui ||
      !candidato.telefono ||
      !candidato.fecha_nacimiento ||
      !candidato.direccion
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!/^\d{8}-\d$/.test(candidato.dui)) {
      alert("DUI debe tener el formato 12345678-9");
      return;
    }

    if (!/^\d{4}-\d{4}$/.test(candidato.telefono)) {
      alert("Teléfono debe tener el formato 1234-5678");
      return;
    }

    alert("Formulario válido");
    cambiarPaso(2);
  };


  return (
    <form onSubmit={guardarFormulario}>
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
    </form>
  );
};
