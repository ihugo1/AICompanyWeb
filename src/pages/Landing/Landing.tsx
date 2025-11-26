import styles from "./Landing.module.css";
import hero from "./../../assets/images/hero.png";
import empleados from "./../../assets/images/empleados.jpg";
import recruitment from "./../../assets/images/recruitment.jpg";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.hero}>
        <img src={hero} alt="" />
        <div className={styles.heroContent}>
          <h2>
            Ofrecemos suministros, instalación y mantenimento de servicios
            electromecanicos en El Salvador
          </h2>
        </div>
      </div>

      <div className={styles.recruitment}>
        <img src={recruitment} />
        <h2>Únete a nuestro equipo</h2>
        <p>
          Aplica para un puesto con nosotros fácil y rapido, no toma más de 5
          minutos
        </p>
        <Link className={styles.button} to="/reclutamiento">Empezar proceso</Link>
      </div>

      <div className={styles.about}>
        <h2>Sobre nosotros</h2>
        <p>
          Somos líderes en soliciones de climatirazión desde hace más de 10
          años. Nuestro compromiso con la cálidad, innovación y servicio nos
          posicione como una de las empresas más combiables del país.
        </p>
        <img src={empleados} />
      </div>
    </div>
  );
};
