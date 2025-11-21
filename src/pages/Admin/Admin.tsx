import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase.client";
import type { Candidato, EstadoCandidato } from "../../types/Candidato";
import { ListaCandidatos } from "../../components/ListaCandidatos/ListaCandidatos";
import { ModalCandidato } from "../../components/ModalCandidato/ModalCandidato";

export const Admin = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCandidato, setSelectedCandidato] = useState<Candidato | null>(
    null,
  );

  const handleOpenModal = (candidato: Candidato) => {
    setSelectedCandidato(candidato);
  };

  const handleCloseModal = () => {
    setSelectedCandidato(null);
  };

  const handleEstadoChange = async (
    candidatoId: string,
    nuevoEstado: EstadoCandidato,
  ) => {
    try {
      const { error } = await supabase
        .from("candidatos")
        .update({ estado: nuevoEstado })
        .eq("id", candidatoId);

      if (error) {
        throw error;
      }

      setCandidatos((prevCandidatos) =>
        prevCandidatos.map((c) =>
          c.id === candidatoId ? { ...c, estado: nuevoEstado } : c,
        ),
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("candidatos")
          .select("*")
          .order("porcentaje_efectividad", { ascending: false });

        if (error) {
          throw error;
        }

        setCandidatos(data || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidatos();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Panel de Administración</h1>
      <h2>Lista de Candidatos</h2>
      <ListaCandidatos
        candidatos={candidatos}
        onOpenModal={handleOpenModal}
        onEstadoChange={handleEstadoChange}
      />
      <ModalCandidato candidato={selectedCandidato} onClose={handleCloseModal} />
    </div>
  );
};
