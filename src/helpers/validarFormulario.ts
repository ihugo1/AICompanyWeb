import type { Candidato } from "../types/Candidato";

export const validarFormulario = (candidato: Candidato) => {
   if (!candidato.nombre_completo) {
      alert("El Nombre Completo es obligatorio");
      return false;
    }
    if (!candidato.correo) {
      alert("El Correo electronico es obligatorio");
      return false;
    }
    if (!candidato.dui) {
      alert("El Numero de DUI es obligatorio");
      return false;
    }
    if (candidato.dui.length !== 9) {
      alert("El DUI debe tener 9 digitos, sin guión");
      return false;
    }
    if (!candidato.telefono) {
      alert("El Telefono es obligatorio");
      return false;
    }
    if (candidato.telefono.length !== 8) {
      alert("Ingrese un numero de telefono valido");
      return false;
    }
    if (!candidato.fecha_nacimiento) {
      alert("El campo Fecha de Nacimiento es obligatorio");
      return false;
    }
    if (!candidato.direccion) {
      alert("El campo Dirección es obligatorio");
      return false;
    }
    return true;
}