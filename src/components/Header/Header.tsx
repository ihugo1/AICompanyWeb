import styles from "./Header.module.css";
import icon from "./../../assets/icon/icono.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.iconContainer}>
        <Link to="/">
          <img src={icon} className={styles.logo}/>
        </Link>
      </div>


      <ul className={styles.links}>
        <li><a href="/">Inicio</a></li>
        <li><a href="/reclutamiento">Reclutamiento</a></li>
      </ul>
      
    </header>
  );
};
