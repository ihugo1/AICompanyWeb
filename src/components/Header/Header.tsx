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
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/reclutamiento">Reclutamiento</Link></li>
      </ul>
      
    </header>
  );
};
