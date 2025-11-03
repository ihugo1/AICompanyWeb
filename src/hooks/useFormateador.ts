export const useFormateador = () => {
  const formatearDUI = (valor: string): string => {
    const numeros = valor.replace(/\D/g, "");
    if (numeros.length <= 8) return numeros;
    return `${numeros.slice(0, 8)}-${numeros.slice(8, 9)}`;
  };

  const formatearTelefono = (valor: string): string => {
    const numeros = valor.replace(/\D/g, "");
    if (numeros.length <= 4) return numeros;
    return `${numeros.slice(0, 4)}-${numeros.slice(4, 8)}`;
  };

  return {
    formatearDUI,
    formatearTelefono,
  };
};
