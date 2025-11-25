import type { Candidato } from "../types/Candidato";
import { supabase } from "../api/supabase.client";

export const validarFormulario = async (
  candidato: Candidato
): Promise<boolean> => {
  // --- Validación de campos obligatorios (síncrona y rápida) ---
  if (!candidato.nombre_completo) {
    alert("El Nombre Completo es obligatorio");
    return false;
  }
  if (!candidato.correo) {
    alert("El Correo electrónico es obligatorio");
    return false;
  }
  if (!candidato.dui) {
    alert("El Número de DUI es obligatorio");
    return false;
  }
  if (candidato.dui.length !== 9) {
    alert("El DUI debe tener 9 dígitos, sin guión");
    return false;
  }
  if (!candidato.telefono) {
    alert("El Teléfono es obligatorio");
    return false;
  }
  if (candidato.telefono.length !== 8) {
    alert("Ingrese un número de teléfono válido");
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

  // --- Validación de duplicados en la base de datos (asíncrona) ---
  try {
    const { data: existing, error } = await supabase
      .from("candidatos") // Usando el nombre de tu tabla/tipo
      .select("correo, dui")
      .or(`correo.eq.${candidato.correo},dui.eq.${candidato.dui}`);

    if (error) {
      console.error("Error al verificar duplicados:", error.message);
      alert(
        "Hubo un error al validar los datos. Por favor, inténtelo de mnuevo."
      );
      return false;
    }

    if (existing && existing.length > 0) {
      if (existing.some((c) => c.dui === candidato.dui)) {
        alert("El número de DUI ingresado ya se encuentra registrado.");
        return false;
      }
      if (existing.some((c) => c.correo === candidato.correo)) {
        alert("El correo electrónico ingresado ya se encuentra registrado.");
        return false;
      }
    }
  } catch (err) {
    console.error("Error inesperado en la validación:", err);
    alert("Ocurrió un error inesperado durante la validación.");
    return false;
  }

  // Si todas las validaciones pasan
  return true;
};
