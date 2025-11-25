import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase.client";
import type { Candidato, EstadoCandidato } from "../../types/Candidato";
import { ListaCandidatos } from "../../components/ListaCandidatos/ListaCandidatos";
import { ModalCandidato } from "../../components/ModalCandidato/ModalCandidato";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCandidato, setSelectedCandidato] = useState<Candidato | null>(
    null,
  );
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      navigate("/"); // Redirect to home page after logout
    }
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Panel de Administración</h1>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
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
