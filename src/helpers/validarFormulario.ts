import toast from "react-hot-toast";
import type { Candidato } from "../types/Candidato";
import { supabase } from "../api/supabase.client";

export const validarFormulario = async (
  candidato: Candidato
): Promise<boolean> => {
  // --- Validación de campos obligatorios (síncrona y rápida) ---
  if (!candidato.nombre_completo) {
    toast.error("El Nombre Completo es obligatorio");
    return false;
  }
  if (!candidato.correo) {
    toast.error("El Correo electrónico es obligatorio");
    return false;
  }
  if (!candidato.dui) {
    toast.error("El Número de DUI es obligatorio");
    return false;
  }
  if (candidato.dui.length !== 9) {
    toast.error("El DUI debe tener 9 dígitos, sin guión");
    return false;
  }
  if (!candidato.telefono) {
    toast.error("El Teléfono es obligatorio");
    return false;
  }
  if (candidato.telefono.length !== 8) {
    toast.error("Ingrese un número de teléfono válido");
    return false;
  }
  if (!candidato.fecha_nacimiento) {
    toast.error("El campo Fecha de Nacimiento es obligatorio");
    return false;
  }
  if (!candidato.direccion) {
    toast.error("El campo Dirección es obligatorio");
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
      toast.error(
        "Hubo un error al validar los datos. Por favor, inténtelo de nuevo."
      );
      return false;
    }

    if (existing && existing.length > 0) {
      if (existing.some((c) => c.dui === candidato.dui)) {
        toast.error("El número de DUI ingresado ya se encuentra registrado.");
        return false;
      }
      if (existing.some((c) => c.correo === candidato.correo)) {
        toast.error("El correo electrónico ingresado ya se encuentra registrado.");
        return false;
      }
    }
  } catch (err) {
    console.error("Error inesperado en la validación:", err);
    toast.error("Ocurrió un error inesperado durante la validación.");
    return false;
  }

  // Si todas las validaciones pasan
  return true;
};
