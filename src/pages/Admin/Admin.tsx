import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase.client";
import type { Candidato, EstadoCandidato } from "../../types/Candidato";
import { ListaCandidatos } from "../../components/ListaCandidatos/ListaCandidatos";
import { ModalCandidato } from "../../components/ModalCandidato/ModalCandidato";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";

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
      navigate("/"); // REDIRECIONAR DESPUES DE LOGEAR
    }
  };

  const handleOpenModal = (candidato: Candidato) => {
    setSelectedCandidato(candidato);
  };

  const handleCloseModal = () => {
    setSelectedCandidato(null);
  };

  /* FUNCION QUE ACTUALIZA ESTADO DE UN CADIDATO */
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
    return <div className={styles.loading}>Cargando...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.admin}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Panel de Administración</h1>
        <button className={styles.botonLogout} onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <h2 className={styles.subtitulo}>Lista de Candidatos</h2>
      <ListaCandidatos
        candidatos={candidatos}
        onOpenModal={handleOpenModal}
        onEstadoChange={handleEstadoChange}
      />
      <ModalCandidato candidato={selectedCandidato} onClose={handleCloseModal} />
    </div>
  );
};
