import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div>
      <h2>AI Company</h2>
      <div>
        <h3>Reclutamiento</h3>
        <p>
          Inicio de proceso de reclutamiento, este proceso tomara poco tiempo y
          necesitaras de completar un cuestionario y un formulario con sus datos
          personales
        </p>
        <Link to="/reclutamiento">
          <button>Iniciar</button>
        </Link>
      </div>
    </div>
  );
};
